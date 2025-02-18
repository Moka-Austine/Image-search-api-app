FROM node

RUN mkdir -p /home/app
COPY . /ASYNC
CMD [ "node" ]

