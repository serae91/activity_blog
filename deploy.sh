set -e

# Variablen (anpassen falls nötig)
FRONTEND_DIR="./frontend"
BACKEND_DIR="./backend"
K8S_DIR="./k8s"
FRONTEND_IMAGE="activity-blog-frontend"
BACKEND_IMAGE="activity-blog-backend"

minikube start

eval $(minikube docker-env)

echo "Building frontend image..."
docker build -t $FRONTEND_IMAGE $FRONTEND_DIR

echo "Building backend image..."
docker build -t $BACKEND_IMAGE $BACKEND_DIR

echo "Applying Kubernetes manifests..."
kubectl apply -f $K8S_DIR

echo "Alle Images gebaut und Kubernetes Ressourcen angewendet."

minikube addons enable ingress