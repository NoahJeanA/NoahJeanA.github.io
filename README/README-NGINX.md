# __Was ist NGINX?__
-high performender Webserver

-Verwaltet anfragen z. B. Weiterleitungen oder einfache antworten

-Reverse Proxy leitet die Anfragen z. B. zu einer Authentifizierungswebseite weiter oder sogar zu einem anderen backend

# __Reverse Proxy__
-Erhöhte Sicherheit, da die Dienste von innen von EGINX verwaltet werden

-Einfach zu konfigurieren (nginx.conf)

-Dockerfile(FROM EGINX )

Das Skalieren von Deployments kannst du mit folgendem Befehl machen:

```bash 
 sudo kubectl scale deployment nginx-deployment --replicas 1 
 ```

# __Installieren von WordPress über Kubernetes__

Um WordPress zu installieren, müssen wir zuerst folgende Dateien installieren:

https://kubernetes.io/examples/application/wordpress/mysql-deployment.yaml

```bash
apiVersion: v1
kind: Service
metadata:
  name: wordpress-mysql
  labels:
    app: wordpress
spec:
  ports:
    - port: 3306
  selector:
    app: wordpress
    tier: mysql
  clusterIP: None
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-pv-claim
  labels:
    app: wordpress
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wordpress-mysql
  labels:
    app: wordpress
spec:
  selector:
    matchLabels:
      app: wordpress
      tier: mysql
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: wordpress
        tier: mysql
    spec:
      containers:
      - image: mysql:5.6
        name: mysql
        env:
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-pass
              key: password
        ports:
        - containerPort: 3306
          name: mysql
        volumeMounts:
        - name: mysql-persistent-storage
          mountPath: /var/lib/mysql
      volumes:
      - name: mysql-persistent-storage
        persistentVolumeClaim:
          claimName: mysql-pv-claim

```

https://kubernetes.io/examples/application/wordpress/wordpress-deployment.yaml

```bash
apiVersion: v1
kind: Service
metadata:
  name: wordpress
  labels:
    app: wordpress #WordPress lable
spec:
  ports:
    - port: 80
  selector:
    app: wordpress
    tier: frontend
  type: LoadBalancer
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: wp-pv-claim
  labels:
    app: wordpress
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wordpress
  labels:
    app: wordpress
spec:
  selector:
    matchLabels:
      app: wordpress
      tier: frontend
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: wordpress
        tier: frontend
    spec:
      containers:
      - image: wordpress:4.8-apache
        name: wordpress
        env:
        - name: WORDPRESS_DB_HOST
          value: wordpress-mysql
        - name: WORDPRESS_DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-pass
              key: password
        ports:
        - containerPort: 80 #Container-Port 80
          name: wordpress
        volumeMounts:
        - name: wordpress-persistent-storage
          mountPath: /var/www/html
      volumes:
      - name: wordpress-persistent-storage
        persistentVolumeClaim:
          claimName: wp-pv-claim

```

Jetzt müssen wir ein secret anlegen, wo wir ein Passwort festlegen.
Das machen wir mit folgendem Befehl:

```bash
kubectl apply -f - <<EOF                   
apiVersion: v1
data:
  password: $(echo password|base64)
kind: Secret
metadata:
  name: mysql-pass
type: Opaque
EOF

```
Um das secret zu erstellen, musst du folgenden Befehl ausführen:
```bash 
kubectl get secrets #zeigt die secrets an 
kubectl get pvc #persistent volume claim
kubectl get pods  #zeigt dir pods an 
kubectl get services wordpress #zeigt dir den WordPress service an 
```
Wir speichern uns die Cluster IP

Jetzt können wir das Deployment bauen.

```bash  
kubectl apply -f mysql-deployment.yaml
kubectl apply -f wordpress-deployment.yaml
```

Um den Port von außen zu erreichen, musst du noch folgenden Befehl ausführen und laufen lasse nun eine Portumleitung zu erstellen
```bash 
kubectl port-forward services/wordpress 8000:80 #leitet anfragen auf Port 80 auf den port 8000 um
```
Mit der Cluster IP und dem Port kannst du jetzt auf dein WordPress zugreifen.

# __Links__
https://kubernetes.io/docs/tutorials/stateful-application/mysql-wordpress-persistent-volume/