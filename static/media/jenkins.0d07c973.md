# Jenkins Cheatsheet

- Show password

```bash
cat /var/jenkins_home/secrets/initialAdminPassword
```

- Add remote SSH

1. Install plugin SSH
2. Go to `manager credentials` => `Jenkins` => `Global credentials`
3. Add new key SSH
4. Add security text if you have
5. Go to `configuration` => `SSH remote hosts`
6. Add remote sites
7. Go to `This project is parameterized` Add new variable
8. Go to `Use secret text(s) or file(s)` Add new variable with secret text
9. Go to Projects build with `Execute shell script on remote host using ssh`
10. Use `$SCOPE` get variable config
