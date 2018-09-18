FROM node:8.11.2

LABEL maintainer="Gabriel Pellegrini"

ENV HOME=/home/app

WORKDIR $HOME/tcc

COPY package.json npm-shrinkwrap.json $HOME/tcc/

RUN npm i

COPY . $HOME/tcc

CMD ["npm","start"]

