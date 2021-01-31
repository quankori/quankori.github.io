# Jenkins cheatsheet

- Show password

```bash
cat /var/jenkins_home/secrets/initialAdminPassword
```

- Add remote SSH

1. Install plugin SSH
2. Go to `manager credentials` => `Jenkins` => `Global credentials`
3. Add new key SSH
4. Go to `configuration` => `SSH remote hosts`
5. Add remote sites
6. Go to Projects build with `Execute shell script on remote host using ssh`
