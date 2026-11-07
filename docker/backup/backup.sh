#!/bin/sh
# Dumps the database to the bucket, encrypted if BACKUP_PASSPHRASE is set, then deletes dumps older than
# BACKUP_KEEP_DAYS. Run by cron, or by hand: docker exec <container> sh -c '. /etc/backup.env && backup.sh'
set -eu -o pipefail

name="$(date -u +%Y-%m-%dT%H-%M-%SZ).dump"
target="s3:${S3_BUCKET}/${BACKUP_PREFIX:-postgres}"

echo "$(date -u) dumping ${POSTGRES_DB} to ${target}/${name}"
# the custom format is compressed and lets pg_restore pick what to restore
if [ -n "${BACKUP_PASSPHRASE:-}" ]; then
    pg_dump --format=custom -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" \
        | openssl enc -aes-256-cbc -pbkdf2 -salt -pass env:BACKUP_PASSPHRASE \
        | rclone rcat "${target}/${name}.enc"
else
    pg_dump --format=custom -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" \
        | rclone rcat "${target}/${name}"
fi

rclone delete --min-age "${BACKUP_KEEP_DAYS:-30}d" "$target"

# a push monitor in Uptime Kuma alerts when this stops arriving
if [ -n "${BACKUP_HEARTBEAT_URL:-}" ]; then
    wget -q -O /dev/null "$BACKUP_HEARTBEAT_URL" || echo "heartbeat failed"
fi
echo "$(date -u) done"
