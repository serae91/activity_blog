# Activity Blog

Dieses Projekt habe ich als Demo für Bewerbungen entwickelt. Es zeigt, wie ich eine kleine Fullstack-Anwendung mit **Frontend, Backend und Infrastruktur** aufbaue und bereitstelle.  
Mein Fokus lag dabei auf **sauberer Struktur**, **Containerisierung** und **Deployment mit Kubernetes**.

## Ziel des Projekts

Ich wollte ein Beispiel schaffen, das meine Arbeitsweise widerspiegelt:
- Entwicklung einer Webanwendung mit Frontend und Backend
- Nutzung von Docker für eine einfache lokale Entwicklung
- Deployment in Kubernetes mit eigenen Bash-Skripten
- Dokumentation und Automatisierung, wie sie auch in echten Projekten gebraucht werden


## Projektbeschreibung
In diesem Projekt können unterschiedliche Nutzer ihre Aktivitäten und Erlebnisse bloggen. Sie können dabei Personen anlegen, mit denen sie etwas unternommen haben und Locations, an denen sie waren, und diese in ihren Aktivitäten verknüpfen.

Das Projekt ist kein fertiges Produkt, sondern ein **Lern- und Showcase-Projekt** für Bewerbungen. Ich habe daher keine 100 % Testabdeckung,
sondern nur beispielhaft Tests im Backend unter:

### Tests
- Backend:  *src/test/java/activity*
- Frontend: *src/app/pages/activity-list/activity-list.component.spec.ts*

## Installation & Start

### Entwicklungsmodus

Man kann das Projekt auf 2 verschiedene Arten starten, entweder im Entwicklungsmodus oder im Kubernetes Deployment in Minikube.
Beide Arten sind sehr bequem per Skript zu starten.

#### Starten im Entwicklungsmodus:
Bevor Sie das Skript ausführen, stellen Sie sicher, dass es ausführbar ist:

```bash
chmod +x ./scripts/start-in-dev-mode.sh
```
Beim **erstem Mal** starten in der Entwicklungsumgebung:

```bash
./scripts/start-in-dev-mode.sh --setup
```

ab dem **zweiten Mal** einfach
```bash
./scripts/start-in-dev-mode.sh
```
Das Skript öffnet automatisch das Frontend im Browser, aber man kann es auch manuell öffnen:

Frontend unter http://localhost:4200

Backend API unter http://localhost:8080/api

### Starten im Kubernetes Deployment
Bevor Sie das Skript ausführen, stellen Sie sicher, dass es ausführbar ist:

```bash
chmod +x ./scripts/kubernetes.sh
```
Nun kann das Deployment Skript ausgeführt werden, das Skript setzt die Kubernetes-Manifeste aus dem Verzeichnis k8s/ auf:
```bash
./scripts/k8-deployment.sh
```

Um sicherzustellen, dass alle Services vom Host erreichbar sind, muss man in einem anderen Terminal einen Tunnel öffnen:
```bash
minikube tunnel
```
und bei Nachfrage sein Passwort eingeben.

Damit die Anwendung im Browser geöffnet wird:
```bash 
minikube service activity-blog-frontend
```

Technologien

Frontend: [Angular]

Backend: [Quarkus]

Datenbank: [PostgreSQL]

Docker & Docker Compose

Kubernetes

CI/CD-Pipeline

Erweiterte Features im Frontend

👤 Autor: [Dein Name]
📧 [Deine Kontaktadresse]
🔗 [LinkedIn/GitHub Profil]
