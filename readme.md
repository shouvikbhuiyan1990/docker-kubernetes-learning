## Docker Useful Commands

- docker run <image name>
- Docker run -p <local machine port>:<docker port> <container id/name>

- docker create <image name>
- docker start <image name> ——> doesn’t show output
- docker start -a <image name> ——> show output
- docker system prune
- docker stop <container id>
- docker kill <container id>

- docker exec -it <container id> <command>
- docker exec -it <container id> sh ——> opens with a shell

- docker build . —> builds and gives hash id of image as output
- docker build -t <docker id>/<image name>:latest .  —> builds and gives output with tagging. This name can be used to create a container
- docker build -f <custom docker file name>

- Docker-compose up  ———> only docker run
- Docker-compose up — build  ——> build image and run docker
- Docker-compose up -d —> start containers in background 
- Docker-compose down —> stop the container
