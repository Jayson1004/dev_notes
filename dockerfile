
# 使用官方的 Nginx 镜像
FROM nginx:latest

# 删除默认的 Nginx 配置文件
RUN rm /etc/nginx/conf.d/default.conf

# 复制自定义的 Nginx 配置文件到容器中
COPY nginx.conf /etc/nginx/conf.d/

# 复制网站文件到容器中
COPY site-content/ /usr/share/nginx/html

# 复制 SSL 证书和密钥文件到容器中
COPY ssl/fullchain.pem /etc/ssl/certs/fullchain.pem
COPY ssl/privkey.pem /etc/ssl/certs/privkey.pem
COPY ssl/options-ssl-nginx.conf /etc/ssl/options-ssl-nginx.conf
COPY ssl/ssl-dhparams.pem /etc/ssl/ssl-dhparams.pem
