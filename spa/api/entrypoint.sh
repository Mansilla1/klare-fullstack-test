#!/usr/bin/env sh

set -o errexit
set -o nounset

postgres_ready () {
  # Check that postgres is up and running on port `5432`:
  sh "/wait-for-command.sh" -t 30 -s 0 52 -c "curl db:5432"
}

until postgres_ready; do
  >&2 echo "Postgres is unavailable - sleeping"
done

# It is also possible to wait for other services as well: redis, elastic, etcd
>&2 echo "Postgres is up - continuing..."
>&2 echo "Files in workdir:"
ls -la

# Evaluating passed command:
exec "$@"
