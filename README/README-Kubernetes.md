
# __Cluster__

-Worker-Nodes (Server, die die eigentliche Arbeit machen) so viele wie man braucht

-Control-Plane(Server, die die Cluster überwachen und aufgaben verteilen)min: 2 wen möglich ungerade(3 oder 5)

# __Wie kann ich ein Cluster erstellen?__
-von Hand (lehrreich)

-Tool gestützt(kops)

-managtcluster(verwenndung von bereitgestellten cluster)

# __Installieren von kubectl__
Herunterladen der Datei:
```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
mv kubectl /usr/local/bin
```

# __Einrichten eines Clusters__
-config.yaml
```yaml
# two node (one workers) cluster config
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
```
In der YAML Datei habe ich mein Cluster definiert und z. B. angegeben wie viele worker oder control-planes ich haben will.
Mit folgenden Befehl kann ich mit der YAML Datei ein Cluster erstellen.
```bash
kind create cluster --config=config.yaml
```

Um sich den Status seiner Cluster anzeigen zu lassen, kann man folgenden Befehl nutzen:
```bash
sudo kubectl get nodes
```

Um sich die Docker anzeigen zu lassen, verwende diesen Befehl:
```bash
docker ps
```

Um per sh dem Docker beizutreten, verwende diesen Befehl:
```bash
docker exec -it <"CONTAINER ID"> sh
```

Wichtige Dateien befinden sich unter __/etc/kubernetes__

Mit dem folgenden Befehl kannst du dir die Informationen deines scheduler Komponenten anzeigen lassen:
```bash
cat /etc/kubernetes/scheduler.conf
```

Jetzt erstelle ich einen bod mit folgendem Befehl:
```bash
sudo kubectl create deployment nginx-deployment --image=nginx --replicas=2
```




# __Mehr Informationen__
so kann ich mir die pods anzeigen lassen:
```bash
sudo kubectl get pods
```
Wenn du mehr Informationen willst, kannst du die so einen pod genauer anschauen:
```bash
sudo kubectl get pods <"POD-ID"> -oyaml
```
Die nodes kannst du dir so anzeigen lassen:

```bash
sudo kubectl get nodes
```
Wenn du z. B. die IP brauchst, kannst du dies benutzen:
```bash
sudo kubectl describe pods <"POD-NAME">
```
oder auch
```bash
sudo kubectl get pods -owide
```

# __nginx__
Jetzt wollen wir einen nginx Webserver zum Laufen bringen.
Dazu erstellen wir ein neues Cluster:
```bash
sudo kubectl expose deployment nginx-deployment --type=NodePort --name=nginx-service --port 80
```

Nun wollen wir uns genauere Darten zu den Pods und den Services anschauen.
``` bash
sudo kubectl get pods
sudo kubectl get svc
```

Mit dem folgenden Befehl lassen wir uns die nodes unserer kinds anzeigen.
```bash
sudo kubectl get nodes -o wide
```
Hier speichern wir uns die IP von unserem worker Kind

Jetzt brauchen wir noch mehr Informationen über unseren nginx-service.
```bash
sudo kubectl describe svc nginx-service
```
Dort kopieren wir uns den nodePort

Um nginx zu erreichen tagen wir dies ein:
__<"WORKER-KIND-IP:WORKER-KIND-PORT">__

# __Links__
https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/

https://kind.sigs.k8s.io/docs/user/quick-start/

https://www.youtube.com/watch?v=kmTqXJW09tM
