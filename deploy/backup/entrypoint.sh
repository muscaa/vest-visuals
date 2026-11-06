#!/bin/sh
# Turns the container's variables into rclone's remote "s3" and runs backup.sh on BACKUP_SCHEDULE with crond.
# Cron doesn't pass the environment on, so it's saved to a file each job reads first.
set -eu

: "${POSTGRES_HOST:?}" "${POSTGRES_USER:?}" "${POSTGRES_PASSWORD:?}" "${POSTGRES_DB:?}"
: "${S3_ENDPOINT:?}" "${S3_BUCKET:?}" "${S3_ACCESS_KEY:?}" "${S3_SECRET_KEY:?}"

export RCLONE_CONFIG_S3_TYPE=s3
export RCLONE_CONFIG_S3_PROVIDER="${S3_PROVIDER:-Cloudflare}"
export RCLONE_CONFIG_S3_ENDPOINT="$S3_ENDPOINT"
export RCLONE_CONFIG_S3_ACCESS_KEY_ID="$S3_ACCESS_KEY"
export RCLONE_CONFIG_S3_SECRET_ACCESS_KEY="$S3_SECRET_KEY"
# tokens scoped to one bucket can't list or create buckets
export RCLONE_CONFIG_S3_NO_CHECK_BUCKET=true
export PGPASSWORD="$POSTGRES_PASSWORD"

export -p > /etc/backup.env
echo "${BACKUP_SCHEDULE:-0 2 * * *} . /etc/backup.env && backup.sh" > /etc/crontabs/root

echo "Backing up ${POSTGRES_DB} on \"${BACKUP_SCHEDULE:-0 2 * * *}\" (UTC) to s3:${S3_BUCKET}"
exec crond -f -l 8
