# install mysql on ubuntu

https://www.ionos.fr/digitalguide/sites-internet/developpement-web/mysql-sur-ubuntu-2004/

# install java 17 on ubuntu

https://www.rosehosting.com/blog/how-to-install-java-17-lts-on-ubuntu-20-04/

# deployment on server

https://www.youtube.com/watch?v=iGUNEnFZOgE
https://studygyaan.com/spring-boot/deploy-spring-boot-app-on-vm-using-nginx-https-domain

```bash
sudo apt update && sudo apt-get upgrade -y
sudo apt install git
sudo apt install maven
sudo ufw allow 'Nginx Full'
systemctl status nginx
```

# allocate swap for more ram:
```bash
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
sudo sysctl vm.swappiness=10
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
sudo swapon --show
free -h
```

#remove swap file
```bash
reboot
sudo swapon --show
sudo swapoff /swapfile
sudo umount /swapfile
```

# automatic updates
```bash
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

# mysql
```bash
sudo apt install mysql-server
sudo systemctl start mysql.service
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password12';
exit
sudo mysql_secure_installation
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED WITH auth_socket;
CREATE USER 'user'@'host' IDENTIFIED WITH authentication_plugin BY 'password12';
CREATE USER 'user1'@'host' IDENTIFIEDWITH mysql_native_password BY 'password11';
exit
systemctl status mysql.service
```

# install java:
```bash
sudo apt update
sudo apt install openjdk-17-jdk -y
ls -l /usr/lib/jvm/
sudo nano /etc/environment
PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin"
JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"
PATH="$JAVA_HOME/bin:$PATH"
source /etc/environment
echo $JAVA_HOME
update-alternatives --config java
```

# create mysql required for application to work:
```mysql
sudo mysql -u root -p
CREATE DATABASE http_session_database;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
# this one works
CREATE USER 'myuser'@'localhost' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON http_session_database.* TO 'myuser'@'localhost';
FLUSH PRIVILEGES;
```
sudo apt install nginx

# configure nginx:
```bash
sudo nano /etc/nginx/sites-available/keyboardmasters.org

server {
    listen 80;
    server_name keyboardmasters.org www.keyboardmasters.org;

    root /var/www/keyboardmasters.org;
    index index.html index.htm index.php;

    access_log /var/log/nginx/keyboardmasters.log;
    error_log /var/log/nginx/keyboardmasters-error.log error;

    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
        proxy_pass http://127.0.0.1:8080;
        proxy_redirect off;
    }
}

server {
    server_name www.keyboardmasters.org;
    return 301 https://keyboardmasters.org$request_uri;
}
```
```bash
sudo ln -s /etc/nginx/sites-available/keyboardmasters.org /etc/nginx/sites-enabled/keyboardmasters.org
sudo nginx -t
sudo nginx -s reload
sudo apt update
sudo apt install mount
sudo apt install snapd
sudo systemctl enable snapd
sudo systemctl start snapd
sudo add-apt-repository ppa:certbot/certbot
sudo apt update
sudo apt install certbot
sudo snap install --classic certbot
#https://www.inmotionhosting.com/support/website/ssl/lets-encrypt-ssl-ubuntu-with-certbot/
sudo certbot --nginx -d keyboardmasters.org
sudo certbot --nginx -d www.keyboardmasters.org
sudo certbot delete --cert-name www.keyboardmasters.org
sudo rm /etc/nginx/sites-enabled/keyboardmasters.org
sudo rm /etc/nginx/sites-available/keyboardmasters.org
```
# run project:
```bash
git clone https://github.com/tyrandev/keyboard-masters.git
cd keyboard-masters
./mvnw clean install
./mvnw test
./mvnw compile
./mvnw package
./mvnw spring-boot:run
nohup ./mvnw spring-boot:run > keyboard-masters.log 2>&1 &
nohup ./mvnw spring-boot:run > /dev/null 2>&1 &
```
# alternativelly go run target and execute this command to run
```bash
nohup java -jar keyboard-masters-0.0.1-SNAPSHOT.jar >/dev/null 2>&1 &
```
