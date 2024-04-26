## 电商系统

```
xltzx-api 后端接口
xltzx-app-admin 管理后台
xltzx-app-store 店铺前台
```

#### nginx config

```
server {
    listen 443 ssl;
    server_name www.ankangxinlexiang.cn;
    index index.html index.htm;

    ssl_certificate   certs/www.ankangxinlexiang.cn.pem;
    ssl_certificate_key  certs/www.ankangxinlexiang.cn.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;

    location /api {
        rewrite ^/api/(.*) /$1 break;
        proxy_pass http://127.0.0.1:4000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    location /app-admin {
        alias /data/tsx/packages/xltzx-app-admin/dist;
        index index.html;
        try_files $uri $uri/ /app-admin/;
    }
    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:3000/;
    }
}
server {
    listen 80;
    server_name www.ankangxinlexiang.cn;
    return 301 https://$host$request_uri;
}
```
