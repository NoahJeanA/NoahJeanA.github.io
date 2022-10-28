# __Kapitel 1 : Installieren und einrichten eines Apache Server über Docker__

Der erste Schritt zum Erstellen eines Apache Webserver ist das Anlegen eines Ordners, worin man die nötigen Dateien speichern kann.
Zuerst setzen wir eine Variable für unseren Ordnernamen, um uns Zeit zu sparen.

```bash 
export FOLDER="<NEWFOLDER>"
```
Danach erstellen wir den Ordner und gehen auch gleich hinein.
```bash 
mkdir "$FOLDER"
cd "$FOLDER"
```
Als nächsten Schritt wird in dem Ordner eine YAML Datei erstellt.
Diese Datei soll docker-compose.yml heißen.

In der Datei definieren wir unseren Apache-Docker. 
```yml
version: "3.9"
services:

  web:
    build: .
    ports:
      - "8000:80"
    volumes:
      - ./public:/var/www/html/
```
Zuerst wird die Version von Docker-compose festgelegt.
In diesem Fall ist es die Version 3.9
Danach eröffnen wir einen Service.
In den Service definieren wir den Namen.
Mit dem Ausdruck "build ." sagen wir, dass Docker den Container mit einem Dockerfile bauen soll.
Danach legen wir noch den Port fest, an dem der Webserver lauschen soll.
Unter dem Ausdruck "volumes" sagen wir, wo unter Apache in unserem Docker den Webserver erstellen soll. In der Datei definieren wir unseren Apache-Docker.

Jetzt müssen wir noch einen Dockerfile erstelle.
Dieser muss den Namen __Dockerfile__ tragen.

```bash
FROM php:apache
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

``` 
Mit dem Dockerfile sagen wir welches Image geladen werden soll und wir installieren noch ein Programm was MySQL zulässt

Damit wir auch etwas auf unserem Webserver sehen können, erstellen wir noch einen Ordner, worin wir eine PHP Datei speichern.

```bash
mkdir public
cd public
```

Die PHP Datei kann z.B so Aussehen:
```php
 <?php echo '<HTML><body><p>Hallo Welt</p></body></HTML>'; ?>
```
Nun können wir unseren Docker bauen.(als root ausführen)

```bash
docker compose build web
docker compose up
```
Nach dem Erstellen der Docker sollte man unter der Adresse __localhost:8000/__ die PHP Datei angezeigt werden.

# __Kapitel 2: Installieren und einrichten einer MySQL Datenbank__

Wenn dem so ist, kann jetzt ein neuer Docker erstellt werden, der eine MySQL Datenbank erstellt wird.
Dafür nehmen wir folgende Änderungen an unserer docker-compose.yml vor:

```yml
version: "3.9"
services:

  web:
    build: .
    ports:
      - "8000:80"
    volumes:
      - ./public:/var/www/html/

  db:
    image: mysql
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    volumes:
      - ./db:/var/lib/mysql
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: example


  adminer:
    image: adminer
    restart: always
    ports:
      - "8080:8080" 
```
Zuerst beschreiben wir eine Datenbank, die wir db nennen.
Das Image von der Docker Hub heißt mysql.
Durch den Ausdruck "volumes" legen wir den Pfad fest, wo die Datenbank gespeichert wird.
Mit dem Ausdruck "command" übergeben wir Parameter an den Docker und mit
restart legen wir fest, dass falls der Docker abstürzt er immer neu gestartet wird.

Danach definieren wir noch einen adminer Docker.
Dieser wird auch immer neu gestartet und lauscht an den Port __8080__ auf unserem Webserver.

Jetzt muss der Docker noch neu gestartet werden.
Das machen wir mit folgenden Befehlen:
```bash
docker compose down
docker compose build db adminer
docker compose up
```

Danach sollten wir die Datenbank über die URL __localhost:8080__ unsere Datenbank erreichen.
Wenn alles geklappt hat, ist man nun in dem Menü von MySQL.
Hier muss man den Server,Bedutzer und das Passwort eintragen.
Den Server nennen wir __db__ und der Benutzer ist __root__.
Das Passwort ist standardmäßig __password__.

Nach dem Einloggen erstellen wir eine neue Datenbank unter dem Punkt __Datenbank erstellen__ und nennen sie __wordpress__.
Jetzt gehen wir in zu dem Punkt __SQL-Kommando__ und tragen dort folgende Befehle ein.
```bash

CREATE USER 'wordpress'@'%' IDENTIFIED BY 'wordpress';
CRANT ALL PRIVILEGES ON wordpress . * TO 'wordpress'@'%';

```

Um die Datenbank zu sichern muss noch ein Ordner im Stammverzeichnis angelegt werden.

```bash
mkdir db 
```
Jetzt sollte die Datenbank auch noch nach dem neu starten der Docker noch erhalten bleiben.

# __Kapitel 3: Installieren und einrichten von WordPress__
Um WordPress zu nutzen, müssen wir es zuerst installieren.
Dies kann man auf folgender Website machen: __https://de.wordpress.org/download/__
nach dem Download solltest du eine ZIP. Dateien in deinem Download Ordner haben.
Entpacke den Ordner dort und öffne ihn bis zum Verzeichnis WordPress.
Dort kopierst du alle Dateien und fügst sie in deinen __Public__ Ordner ein.
Bestätige das Überschreiben einiger deiner Dateien.
Jetzt muss der Docker einmal neu gestartet werden.

```bash
docker compose down
docker compose build db adminer web
docker compose up
```

Nach dem Neustart kann unter der URL: __http://localhost:8000/__ unser WordPress öffnen.
Die Einloggdaten sind:
Database Name: __wordpress__
Username: __wordpress__
Passwort: __wordpress__
um den Database Host herauszufinden gebe im Terminal folgendes ein:
```bash
ip a l
```
Unter dem Punkt wlp0s... findest du deine IP unter dem Punkt __inet__.(ohne z. B. /24)
Jetzt ist den WordPress fertig eingerichtet und kann benutzt werden.
