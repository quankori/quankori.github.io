---
title: GIT CheatSheet
---

- Commit and push code

```bash
git add .
git commit -m "Description"
git push
```

- Pull code

```bash
git fetch
git pull origin develop
```

- Git config local or global name

```bash
git config --global user.email "your_email@example.com"
git config --global user.name "your_name"

git config --local user.email "your_email@example.com"
git config --local user.name "your_name"
```

- Move change to another branch

```bash
git stash
git checkout correct-branch
git stash pop
```

- Discard local changes

```bash
git reset --hard origin/master
git pull origin master
```
