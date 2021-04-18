# Nginx

```nginx
upstream server_pool {
    server node:8200;
}

server {
    listen 80;
    client_max_body_size 20M; # Max file upload 20MB
    location / {
        # Proxy pass
        proxy_pass http://server_pool; # Load balancing

        # Setup set header
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
