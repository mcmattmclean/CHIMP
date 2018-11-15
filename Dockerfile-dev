FROM node:10
WORKDIR /app
COPY . /app
RUN npm install
RUN npm install -g nodemon
CMD [ "npm", "run", "devstart" ]
