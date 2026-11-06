#!/usr/bin/env bash
# Sets up a fresh Ubuntu or Debian VPS: updates, Docker, a firewall, key-only SSH, the shared network, then WireGuard
# and Portainer (deploy/base). Run as root from a clone of the repository, after filling in deploy/base/.env:
#   sudo ./deploy/bootstrap.sh
# Safe to run again.
set -euo pipefail

cd "$(dirname "$0")"

if [ "$(id -u)" -ne 0 ]; then
    echo "Run as root: sudo $0" >&2
    exit 1
fi
if [ ! -f base/.env ]; then
    echo "Fill in deploy/base/.env first: cp deploy/base/.env.example deploy/base/.env" >&2
    exit 1
fi

echo "==> Updates, and installing them on their own from now on"
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get upgrade -y
apt-get install -y ca-certificates curl git ufw unattended-upgrades
dpkg-reconfigure -f noninteractive unattended-upgrades

echo "==> Docker"
if ! command -v docker >/dev/null; then
    curl -fsSL https://get.docker.com | sh
fi
systemctl enable --now docker

echo "==> Firewall: SSH, WireGuard and the web in, nothing else"
# ports Docker publishes skip ufw anyway (WireGuard's, and the web's from the edge stack); listed here so the rules
# say what's meant to be open
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow 51820/udp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo "==> SSH: keys only"
if compgen -G "/root/.ssh/authorized_keys" >/dev/null || compgen -G "/home/*/.ssh/authorized_keys" >/dev/null; then
    cat > /etc/ssh/sshd_config.d/10-keys-only.conf <<'EOF'
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin prohibit-password
EOF
    systemctl reload ssh 2>/dev/null || systemctl reload sshd
else
    echo "    no authorized_keys found, leaving password login on; add a key and run this again"
fi

echo "==> The network every stack shares"
# fixed addresses for the admin tools below .128, the rest handed out above it
if ! docker network inspect vest >/dev/null 2>&1; then
    docker network create vest --subnet 172.30.0.0/24 --ip-range 172.30.0.128/25
fi

echo "==> WireGuard and Portainer"
docker compose -f base/compose.yml --env-file base/.env up -d

cat <<'EOF'

Done. Next (deploy/README.md has the details):
  1. From your computer: ssh -L 51821:127.0.0.1:51821 <vps>, open http://localhost:51821 and add a WireGuard client
  2. Connect with it, then open Portainer at https://172.30.0.3:9443 (user "admin")
  3. Add the stacks from the repository: db, app, edge, ops
EOF
