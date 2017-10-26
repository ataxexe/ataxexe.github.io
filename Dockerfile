FROM fedora:26

ENV SITE_LOCATION=/usr/share/nginx/html
ENV SOURCE_LOCATION=/blog/source

RUN dnf install -y \
      make \
      gcc \
      zlib-devel \
      ruby-devel \
      rubygems \
      rubygem-bundler \
      rpm-build \
      nginx

COPY _data ${SOURCE_LOCATION}/_data/
COPY _drafts ${SOURCE_LOCATION}/_drafts/
COPY _includes ${SOURCE_LOCATION}/_includes/
COPY _layouts ${SOURCE_LOCATION}/_layouts/
COPY _posts ${SOURCE_LOCATION}/_posts/
COPY _sass ${SOURCE_LOCATION}/_sass/
COPY assets ${SOURCE_LOCATION}/assets/
COPY posts ${SOURCE_LOCATION}/posts/
COPY projects ${SOURCE_LOCATION}/projects/
COPY _config.yml Gemfile feed.xml index.html search.json ${SOURCE_LOCATION}/

RUN cd ${SOURCE_LOCATION} && bundler install && \
    jekyll build --source ${SOURCE_LOCATION} --destination ${SITE_LOCATION}

WORKDIR /etc/nginx

EXPOSE 8000

ENTRYPOINT ["nginx", "-g", "daemon off;"]
