FROM node:8.11.2

LABEL maintainer="Gabriel Pellegrini"

ENV HOME=/home/app

WORKDIR $HOME/tcc

COPY package.json npm-shrinkwrap.json $HOME/tcc/
<<<<<<< HEAD
=======

RUN npm i npm

RUN npm i

COPY . $HOME/tcc

CMD ["npm","start"]
>>>>>>> master

RUN npm i

COPY . $HOME/tcc

CMD ["npm","start"]

