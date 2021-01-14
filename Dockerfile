FROM node:14

WORKDIR /user

COPY . /user

RUN npm install

CMD ["npm", "start"]