# Deployment

## Docker with TON full node and MyTonCtrl
1. Run `sudo docker build -t ton-node . -f deploy/Dockerfile.node`.
2. Create new volume for ton-node db: `sudo docker volume create ton-node-db`.
3. Run container: `sudo docker run -d --restart unless-stopped --name ton-node --mount source=ton-node-db,target=/var/ton-work/db --network host -it ton-node` (this command will automaticaly runs `scripts/entrypoint_node.sh`).
