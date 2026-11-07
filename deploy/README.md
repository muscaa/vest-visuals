# Deploying

One VPS runs everything with Docker, and almost nothing on it is irreplaceable: the compose files are in this folder,
the images in GitHub's registry, the files in R2, the secrets in the password manager, and the database is backed up
to R2 every night. Rebuilding is: run `bootstrap.sh`, add the stacks in Portainer, restore the latest dump, set up the
proxy hosts, point DNS at the new VPS.

```
                Cloudflare (DNS, proxy, Turnstile, R2)
                        │  https, ports 80/443
┌─────────────── VPS ───┼───────────────────────────────────────────────┐
│  edge   nginx proxy manager                                            │
│  app    vest-visuals (ghcr.io image) ← migrate (runs first, then exits)│
│  db     postgres ← backup (nightly dump → R2)                          │
│  ops    whodb · uptime-kuma · dozzle          ┐ only over WireGuard    │
│  base   wg-easy · portainer (bootstrap.sh)    ┘                        │
└────────────────────────────────────────────────────────────────────────┘
```

| Folder | What | Deployed by |
| --- | --- | --- |
| `base/` | WireGuard (wg-easy) and Portainer | `bootstrap.sh`, with `docker compose` |
| `stacks/db/` | Postgres 18, nightly backups to R2 | Portainer |
| `stacks/app/` | the app, its migrations before it | Portainer |
| `stacks/edge/` | Nginx Proxy Manager, the sites' HTTPS | Portainer |
| `stacks/ops/` | WhoDB, Uptime Kuma, Dozzle | Portainer |

The images the stacks pull aren't built here: the app's from the `Dockerfile` at the repository's root, the backup's
from `docker/backup/`, both by `.github/workflows/images.yml`.

Every stack is on the `vest` network (`172.30.0.0/24`), so they reach each other by service name (`postgres`,
`vest-visuals`). The admin tools have fixed addresses, reachable once connected to WireGuard:

| What | Address |
| --- | --- |
| wg-easy | http://172.30.0.2:51821 |
| Portainer | https://172.30.0.3:9443 (user `admin`) |
| WhoDB | http://172.30.0.4:8080 (server `postgres`) |
| Uptime Kuma | http://172.30.0.5:3001 |
| Dozzle | http://172.30.0.6:8080 |
| Nginx Proxy Manager | http://172.30.0.7:81 |
| Postgres | 172.30.0.10:5432, for a local client |

## Before the first deploy

Once, outside the VPS:

1. **GitHub.** Push to `main` and check the `images` workflow built `vest-visuals` and `vest-visuals-backup` (Packages,
   on your profile).
2. **R2.** Buckets: `assets`, `avatars`, `portfolio`, `albums` (public, each on its own domain, e.g.
   `assets.vestvisuals.ro`; `avatars` must not allow listing), `uploads` (private, with the CORS rule the uploads
   need) and `vest-visuals-backups` (private). Two API tokens: one for the app's buckets, one for the backups' only.
3. **Cloudflare.**
   - SSL/TLS mode **Full (strict)**: Cloudflare to the VPS over HTTPS, with a real certificate (NPM gets one below).
   - An API token for the certificates: My Profile → API Tokens → "Edit zone DNS" template, zone `vestvisuals.ro`.
     NPM uses it to prove it owns the domain, through DNS, which works behind Cloudflare's proxy.
4. **Email.** In Resend, verify `vestvisuals.ro` and add the SPF, DKIM and DMARC records it shows.
5. **Secrets.** Fill in each `stack.env.example` and `base/.env.example` into a note per stack in the password
   manager, with the Cloudflare token. Generate `BETTER_AUTH_SECRET` with `openssl rand -base64 48`.

## Building the VPS (about an hour)

A netcup VPS running Ubuntu 24.04 or Debian 12, Generation 12 or newer so it has the SCP firewall, logged into as
root with the password from netcup's welcome email.

1. **Firewall.** In netcup's Server Control Panel, the server → Firewall → Configure, then allow inbound `22/tcp`,
   `51820/udp` (WireGuard), `80/tcp` and `443/tcp`, and nothing else. This is the only firewall: there's none on the
   VPS, which is the better arrangement anyway, because the SCP's rules sit in front of the host and so also cover
   the ports Docker publishes — a firewall on the VPS doesn't. While `22/tcp` is open to everything and root logs in
   with a password, narrow that one rule to your own address if you can; step 9 closes it for good.
2. **Bootstrap.** The clone takes only `deploy/`, and only the file contents it needs: see "The VPS's clone" below.
   ```sh
   ssh root@<vps>
   git clone --filter=blob:none --no-checkout --single-branch --branch main \
       https://github.com/<owner>/vest-visuals /opt/vest-visuals
   cd /opt/vest-visuals
   git sparse-checkout set --no-cone '/deploy/'
   git checkout main
   cp deploy/base/.env.example deploy/base/.env && nano deploy/base/.env  # from the password manager
   ./deploy/bootstrap.sh
   ```
3. **WireGuard.** From your computer, `ssh -L 51821:127.0.0.1:51821 root@<vps>`, open http://localhost:51821, sign in
   as `admin`, add a client and import it in the WireGuard app. Connected, the addresses above work.
4. **Portainer**, https://172.30.0.3:9443.
5. **Stacks**, in this order: Stacks → Add stack → Repository, this repository, branch `main`, compose path
   `deploy/stacks/<name>/compose.yml`, then the stack's variables from the password manager (Advanced mode lets you
   paste them all at once). Turn on GitOps updates if you want a push to `main` to redeploy them.
   1. `db`, then restore the database, if there's one to restore (below).
   2. `app`, with `APP_VERSION` set to the commit to run (its full sha, as tagged by the `images` workflow).
   3. `edge`, then set it up (next step).
   4. `ops`, then in Uptime Kuma: monitors for `http://vest-visuals:3000/api/health` and each public host, a "Push"
      monitor for the backups (its url is the db stack's `BACKUP_HEARTBEAT_URL`), and Discord as notification.
6. **Nginx Proxy Manager**, http://172.30.0.7:81. On the first visit it asks for an admin account (older versions
   start with `admin@example.com` / `changeme` instead: change it).
   - SSL Certificates → Add → Let's Encrypt: domains `vestvisuals.ro` and `*.vestvisuals.ro`, "Use a DNS Challenge",
     provider Cloudflare, with the token. One certificate for every site, renewed by NPM.
   - Hosts → Proxy Hosts → Add, one per site: `vestvisuals.ro`, `a.vestvisuals.ro`, `media.vestvisuals.ro`,
     `software.vestvisuals.ro`, `admin.vestvisuals.ro`. Each: scheme `http`, host `vest-visuals`, port `3000`;
     SSL tab: that certificate, "Force SSL" and "HTTP/2" on.
7. **DNS.** In Cloudflare, `A` records for the five names to the VPS's IP, proxied (orange cloud).
8. **Check.** The sites open, signing in works, Uptime Kuma is green.
9. **Close SSH.** Connected to WireGuard, check `ssh root@172.30.0.1` works, then delete the `22/tcp` rule in the
   SCP firewall. Root's password login is now reachable only through the tunnel. Re-add the rule in the SCP, or use
   netcup's VNC console, if you ever need the way back in.

## Releasing

Push to `main`, wait for the `images` workflow, then in Portainer set the app stack's `APP_VERSION` to the new commit's
full sha and update the stack with "Re-pull image". `migrate` applies the new migrations, then the app restarts.
Rolling back is setting the previous sha, as long as no migration in between removed something it needs.

Schema changes, in development:

```sh
# change src/lib/server/db/schema, then
npm run drizzle:generate   # writes drizzle/NNNN_*.sql; read it, commit it with the change
npm run drizzle:migrate    # applies it to your development database
```

`drizzle:push` stays for quick experiments only; anything going to production needs a generated migration.

## Backups

The `backup` container dumps the database every night at `BACKUP_SCHEDULE` (UTC) to
`s3://<S3_BUCKET>/postgres/<date>.dump(.enc)`, deletes dumps older than `BACKUP_KEEP_DAYS`, and pings
`BACKUP_HEARTBEAT_URL`. In Portainer, the container's Console (or `docker exec` over SSH):

```sh
# a backup now
sh -c '. /etc/backup.env && backup.sh'
# the backups there are
sh -c '. /etc/backup.env && restore.sh --list'
# restore the newest, or a given one; stop the app stack first, start it again after
sh -c '. /etc/backup.env && restore.sh'
sh -c '. /etc/backup.env && restore.sh 2026-11-05T02-00-00Z.dump.enc'
```

Restore one every few months, into a new VPS or a scratch database, to know it works. The dumps hold everything:
the app's tables, the accounts, the workflow engine's runs and the migrations' bookkeeping.

Nginx Proxy Manager's settings aren't backed up: they're the certificate and five proxy hosts above, a few minutes
to set up again.

## Good to know

- **One app container.** The nightly task, the live updates and the workflow worker expect a single instance; don't
  scale the app service.
- **Ports.** The firewall is netcup's, in the SCP: `22/tcp`, `51820/udp`, `80/tcp`, `443/tcp`. Nothing on the VPS
  filters anything, so a rule you forget there is a port genuinely open to the internet. Only wg-easy and Nginx
  Proxy Manager publish ports at all; Portainer, Postgres, the backup container and the ops tools publish none, so
  they're reachable only from the `vest` network and over WireGuard no matter what the firewall says — including
  Nginx Proxy Manager's own admin UI on 81.
- **SSH.** Root logs in with a password and `bootstrap.sh` doesn't touch sshd, so once WireGuard works, delete the
  `22/tcp` rule in the SCP firewall: SSH then answers only at 172.30.0.1 (the host, from the VPN), which takes
  password login off the internet entirely and is the main thing keeping it sane. Connect over WireGuard and check
  `ssh root@172.30.0.1` works *before* deleting the rule. If the tunnel ever breaks you re-add the rule in the SCP,
  or use netcup's VNC console — losing WireGuard is not a lockout.
- **The VPS's clone.** `/opt/vest-visuals` is a blobless, single-branch, sparse clone: the working tree holds
  `deploy/` and nothing else, and no other file's contents are ever downloaded (a couple of megabytes instead of
  eighty). `git pull` keeps it that way — sparse-checkout is saved in the clone, so every other path stays out of
  the working tree, newly added ones included. It's only what `bootstrap.sh` runs from; Portainer clones the
  repository itself for the stacks.
- **A new VPS has a new IP.** Update the five `A` records in Cloudflare, and `WG_HOST` if it was the IP.
- **Updates.** `bootstrap.sh` turns on Ubuntu's automatic security updates. Images: `postgres:18-alpine` gets patch
  releases on re-pull; bump the major version deliberately, with a dump and restore.
