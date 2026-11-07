#!/bin/sh
# Restores a dump into the database, replacing what's there. With no argument, the newest one.
#   list:    docker exec <container> sh -c '. /etc/backup.env && restore.sh --list'
#   restore: docker exec <container> sh -c '. /etc/backup.env && restore.sh [file]'
# Stop the app stack first, so nothing writes while it runs.
set -eu -o pipefail

target="s3:${S3_BUCKET}/${BACKUP_PREFIX:-postgres}"

if [ "${1:-}" = "--list" ]; then
    rclone lsl "$target"
    exit 0
fi

file="${1:-$(rclone lsf "$target" | sort | tail -n 1)}"
if [ -z "$file" ]; then
    echo "No backups in ${target}" >&2
    exit 1
fi

echo "$(date -u) restoring ${target}/${file} into ${POSTGRES_DB}"
# --clean drops what the dump recreates; on an empty database it's a no-op
case "$file" in
    *.enc)
        rclone cat "${target}/${file}" \
            | openssl enc -d -aes-256-cbc -pbkdf2 -pass env:BACKUP_PASSPHRASE \
            | pg_restore --clean --if-exists --no-owner -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB"
        ;;
    *)
        rclone cat "${target}/${file}" \
            | pg_restore --clean --if-exists --no-owner -h "$POSTGRES_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB"
        ;;
esac
echo "$(date -u) done"
