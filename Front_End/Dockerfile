FROM ubuntu:18.04

#Install NGINX
RUN apt-get update && \
    apt-get install -y nginx

#Install dependencies
RUN apt-get install -y build-essential \
    libpcre3 \
    libpcre3-dev \
    zlib1g \
    zlib1g-dev \
    libssl-dev

#Installing wget to downloads Nginx's source code at tar.gz
RUN apt-get install -y wget

#Download the source code
RUN wget http://nginx.org/download/nginx-1.19.1.tar.gz && \
    tar -zxvf nginx-1.19.1.tar.gz

#CD in nginx directory
WORKDIR /nginx-1.19.1

#Expose HTTP's ports
EXPOSE 80 443

#Running the configuration of NGINX
RUN ./configure --sbin-path=/usr/bin/nginx \
    --conf-path=/etc/nginx/nginx.conf \
    --error-log-path=/var/log/nginx/error.log \
    --http-log-path=/var/log/nginx/access.log \
    --with-pcre \
    --pid-path=/var/run/nginx.pid \
    --with-http_ssl_module

#Compiling nginx
RUN make install

#Remove NGINX.CONF
RUN rm -f /etc/nginx/nginx.conf

#COPY our NGINX.CONF in Container
COPY nginx.conf /etc/nginx/nginx.conf

#Flago to sinalize the nginx process run on foreground
RUN echo  "daemon off;" >> /etc/nginx/nginx.conf

#Creating site directory
RUN mkdir /site

#COPY our HTML Files in container
COPY ./webpages /site

#Start nginx service
CMD service nginx start