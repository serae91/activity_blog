set -e

echo "Start Developer Environment..."

setup() {
  echo "Install Frontend-Dependencies..."
  ( cd frontend && npm install )

  echo "Build Backend (Quarkus)..."
  ( cd backend && ./mvnw compile )
}

start_dev() {
  echo "Start Postgres via Docker Compose..."
  ( cd backend/setup/database && docker-compose up -d postgres )

  echo "Wait for Postgres to be ready..."
  sleep 5

  echo "Start Quarkus Backend in Dev-Mode..."
  ( cd backend && ./mvnw quarkus:dev & )

  echo "Start Frontend in Dev-Mode..."
  ( cd frontend && npm start & )

  echo "✅ Entwicklungsumgebung läuft!
  - Postgres: localhost:5430
  - Backend:  http://localhost:8080
  - Frontend: http://localhost:4200
  "

  sleep 3

    # Open Frontend in Browser (Mac/Linux/Windows)
    if command -v xdg-open >/dev/null; then
      xdg-open http://localhost:4200
    elif command -v open >/dev/null; then
      open http://localhost:4200
    elif command -v start >/dev/null; then
      start http://localhost:4200
    fi

  # prevent the script from stopping immediately
  wait
}

if [[ "$1" == "--setup" ]]; then
  setup
fi
  start_dev