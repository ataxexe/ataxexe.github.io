FROM nginx:stable

COPY .docker/nginx.conf /etc/nginx/nginx.conf
COPY .docker/site.conf /etc/nginx/conf.d/default.conf
COPY _site /var/www/

EXPOSE 80
