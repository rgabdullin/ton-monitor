# ton-monitor

## Running Celery
1. Set `export PYTHONPATH=/usr/src/mytonctrl`.
2. Run `celery -A backend.background.celery worker --loglevel="INFO"`.

## Running Flask
1. Set `export PYTHONPATH=/usr/src/mytonctrl`.
2. Run `./run_web_server.py`.

## Running MongoDB and RabbitMQ
1. Run `sudo docker-compose up -d --build --force-recreate`.


## (WIP) Docker with MyTonCtrl
1. sudo docker build . -f deploy/Dockerfile.backend
2. sudo docker run -d --name ton-mon --network host -it <IMAGE_ID>
3. в mytonctrl.py закомментить строки с 322 по 332 (иначе ошибка list has no items())
в mypylib.py в строке 780:
return "eth0"

в /etc/systemd/system/validator.service:
заменить user=root, group=root

4. стартануть валидатор и mytoncore:
systemctl start validator
systemctl start mytoncore

5. проверить, что все работает:
в /var/ton-work/log должно быть ACCEPT
в mytonctrl:
 Network load average (Mbit/s) - через какое-то время должно быть > 0
 Mytoncore status: working
 Local validator status: working
