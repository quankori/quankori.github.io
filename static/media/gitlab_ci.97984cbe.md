# GitLab

- Basic

```bash
#!/bin/bash

set -f
string=$PROD_DEPLOY_SERVER
array=(${string//,/})
for i in "${!array[@]}"; do
    echo "Deploy project on server ${array[i]}"
    ssh ubuntu@${array[i]} "ls -la devops-golang/"
    # Command exec
done
```

```yml
image: golang:latest

test:
  stage: test
  script:
    - echo "everything OK!"
staging:
  stage: deploy
  script:
    - echo "Staging everything OK!"
  only:
    - master
production:
  stage: deploy
  only:
    - master
  before_script:
    - mkdir -p ~/.ssh
    - echo -e "$SSH_PRIVATE_KEY" > ~/.ssh/id_rsa
    - chmod 600 ~/.ssh/id_rsa
    - '[[ -f /.dockerenv ]] && echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config'
  script:
    - bash ./deploy/gitlab/.gitlab-deploy-dev.sh
```
