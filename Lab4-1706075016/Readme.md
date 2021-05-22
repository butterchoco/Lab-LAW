## Nginx Configuration

To serve this service in production, use this configuration for the nginx.

```
server {
    listen 80 default_server;
    listen [::]: 80 default_server;

    location /download/ {
        proxy_pass http://localhost:8002/;
    }
    location /upload/ {
        proxy_pass http://localhost:8001/;
    }
    location / {
        proxy_pass http://localhost:8000/;
    }
}
```
