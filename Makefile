build:
    docker build . -t pocketbase-cloudrun
run:
    docker run -p 8080:8080 -t pocketbase-cloudrun
