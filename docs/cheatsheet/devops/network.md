---
title: Network CheatSheet
---

- List ip by domain

```bash
dig your_website ANY +noal +answer
```

- List port running

```bash
sudo netstat -tulpn
```

- Kill port

```bash
sudo kill Process_ID
```

- Check port open

```bash
telnet google.com 443
```

- Hostname to IP

```bash
nslookup hostname
```
