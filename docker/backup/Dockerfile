# Nightly dumps of the database to R2 (or any S3), and restoring them; see backup.sh and restore.sh.
# The same major version as the database, so pg_dump and pg_restore match it.
FROM postgres:18-alpine

RUN apk add --no-cache rclone openssl

COPY entrypoint.sh backup.sh restore.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh /usr/local/bin/backup.sh /usr/local/bin/restore.sh

ENTRYPOINT ["entrypoint.sh"]
