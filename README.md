# Rich Pig web frontend

RichPig.net web frontend written in pure JavaScript

## How to install it
1. Download this repository
2. Move the content to document web root
3. Set the virtual host on your web server to redirect always to index.html file.

For example on Nginx:

```
server {
    listen 80;
    listen [::]:80;
    server_name richpig.net *.richpig.net;
    root /data/www/richpig.net;
    index index.html index.htm;
    access_log /data/log/nginx/richpig.net.access.log;
    error_log /data/log/nginx/richpig.net.error.log;

    location / {
        try_files $uri /index.html;
    }

    location ~ /\.ht {
        deny all;
    }
}
```