set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Variablen (anpassen falls nötig)
FRONTEND_DIR="$PROJECT_ROOT/frontend"
BACKEND_DIR="$PROJECT_ROOT/backend"
K8S_DIR="$PROJECT_ROOT/k8s"
FRONTEND_IMAGE="activity-blog-frontend"
BACKEND_IMAGE="activity-blog-backend"

if ! minikube status >/dev/null 2>&1; then
  echo "Minikube is not running. Please start it first with:"
  echo "minikube start"
  exit 1
fi

eval $(minikube docker-env)

echo "Building frontend image..."
docker build -t $FRONTEND_IMAGE $FRONTEND_DIR

echo "Building backend image..."
docker build -t $BACKEND_IMAGE $BACKEND_DIR

echo "Applying Kubernetes manifests..."
kubectl apply -f $K8S_DIR

echo "All Images are built and Kubernetes ressources are applied."

minikube addons enable ingress || true

echo "Deployment applied. Use 'minikube tunnel' to access the services."
echo "Then use 'minikube service activity-blog-frontend' to start the application in the browser."