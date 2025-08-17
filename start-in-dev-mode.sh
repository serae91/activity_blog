set -e

echo "Start Developer Environment..."

setup() {
  echo "Install Frontend-Dependencies..."
  ( cd frontend && npm install )

  echo "Build Backend (Quarkus)..."
  ( cd backend && ./mvnw compile )
}

start_dev() {

  cleanup() {
      echo "Stopping servers..."
      kill $PID1 $PID2 2>/dev/null || true
      wait $PID1 $PID2 2>/dev/null || true
      exit 0
  }

  trap cleanup SIGINT EXIT

  echo "Start Postgres via Docker Compose..."
  cd backend/setup/database
  docker-compose up -d postgres
  cd - >/dev/null

  echo "Wait for Postgres to be ready..."
  sleep 5

  echo "Start Quarkus Backend in Dev-Mode..."
  (cd backend && ./mvnw quarkus:dev) &
  PID1=$!

  timeout=60
  count=0
  until curl -s http://localhost:8080 > /dev/null; do
      sleep 1
      count=$((count+1))
      if [ $count -ge $timeout ]; then
          echo "Backend did not start in time!"
          cleanup
      fi
  done

  echo "Start Frontend in Dev-Mode..."
  (cd frontend && npm start) &
  PID2=$!

  until curl -s http://localhost:4200 > /dev/null; do
        sleep 1
    done

  # Open Frontend in Browser (Mac/Linux/Windows)
  if command -v xdg-open >/dev/null; then
    xdg-open http://localhost:4200
  elif command -v open >/dev/null; then
    open http://localhost:4200
  elif command -v start >/dev/null; then
    start http://localhost:4200
  fi

  echo "Development Environment is running!
  - Postgres: localhost:5430
  - Backend:  http://localhost:8080
  - Frontend: http://localhost:4200
  "

  wait $PID1 $PID2
}

if [[ "$1" == "--setup" ]]; then
  setup
fi
  start_dev