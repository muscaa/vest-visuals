#!/usr/bin/env bash
# Sets up a fresh Ubuntu or Debian VPS: updates, Docker, the shared network, then WireGuard and Portainer
# (deploy/base). It deliberately leaves the firewall and sshd alone: filtering is netcup's, in the Server Control
# Panel (see deploy/README.md), which also covers the ports Docker publishes, and root logs in with a password.
# Run as root from a clone of the repository, after filling in deploy/base/.env:
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
apt-get install -y ca-certificates curl git unattended-upgrades
dpkg-reconfigure -f noninteractive unattended-upgrades

echo "==> Docker"
if ! command -v docker >/dev/null; then
    curl -fsSL https://get.docker.com | sh
fi
systemctl enable --now docker

# No firewall and no sshd changes here on purpose: netcup's firewall (SCP -> the server -> Firewall) allows
# 22/tcp, 51820/udp, 80/tcp and 443/tcp, and root keeps password login. Nothing on the VPS filters anything, so
# a rule missing in the SCP is a port genuinely open to the internet.

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
  4. Once the tunnel works: drop the 22/tcp rule in netcup's firewall and SSH over WireGuard to 172.30.0.1
     instead, so root's password login isn't reachable from the internet
EOF
