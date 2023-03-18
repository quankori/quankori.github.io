---
title: Github Actions Example
---

Example deploy code to EC2 with docker-compose

folder `.github/workflows`

```yml
name: Push-to-EC2

# Trigger deployment only on push to master branch
on:
  push:
    branches:
      - master

jobs:
  deploy:
    name: Deploy to EC2 on master branch push
    runs-on: ubuntu-latest

    steps:
      - name: Checkout the files
        uses: actions/checkout@v2

      - name: Deploy to Server
        uses: easingthemes/ssh-deploy@main
        env:
          SSH_PRIVATE_KEY: ${{ secrets.EC2_SSH_KEY }}
          REMOTE_HOST: ${{ secrets.HOST_DNS }}
          REMOTE_USER: ${{ secrets.USERNAME }}
          TARGET: ${{ secrets.TARGET_DIR }}

  build:
    name: Build docker to EC2
    runs-on: ubuntu-latest
    needs: [deploy]
    steps:
      - name: Buid docker
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST_DNS }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            cd ${{ secrets.TARGET_DIR }}
            sudo docker-compose stop node
            sudo docker-compose build node
            sudo docker rmi $(docker images --filter "dangling=true" --quiet --no-trunc)
            sudo docker-compose up node -d
            sudo docker ps
```
