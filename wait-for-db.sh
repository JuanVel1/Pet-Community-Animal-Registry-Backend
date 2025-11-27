#!/bin/sh
set -e

echo "Esperando a MySQL en $DB_HOST:$DB_PORT..."

until nc -z $DB_HOST $DB_PORT; do
  sleep 1
done

echo "MySQL está listo. Iniciando API..."
exec "$@"
