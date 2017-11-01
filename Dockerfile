FROM nginx:stable

COPY .docker/nginx.conf /etc/nginx/nginx.conf
COPY .docker/site.conf /etc/nginx/conf.d/default.conf
COPY _site /var/www/

RUN touch /var/run/nginx.pid && \
  chown -R www-data:www-data /var/run/nginx.pid && \
  chown -R www-data:www-data /var/cache/nginx

USER www-data

EXPOSE 8000
