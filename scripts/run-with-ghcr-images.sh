#!/bin/bash
set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

K8S_DIR="$PROJECT_ROOT/k8s"
OWNER="serae91"
FRONTEND_IMAGE="ghcr.io/$OWNER/activity-blog-frontend:latest"
BACKEND_IMAGE="ghcr.io/$OWNER/activity-blog-backend:latest"

if ! minikube status >/dev/null 2>&1; then
  echo "Minikube is not running. Please start it first with:"
  echo " minikube start"
  exit 1
fi

eval $(minikube docker-env)


docker pull $FRONTEND_IMAGE
docker pull $BACKEND_IMAGE
docker tag $FRONTEND_IMAGE activity-blog-frontend:latest
docker tag $BACKEND_IMAGE activity-blog-backend:latest

kubectl apply -f $K8S_DIR

minikube addons enable ingress || true

echo "Deployment applied."
echo "Run 'minikube tunnel' in another terminal to access services."
echo "Or run 'minikube service activity-blog-frontend' to open frontend in browser."
