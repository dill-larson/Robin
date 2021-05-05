FROM node:14.15.4-alpine

WORKDIR /app

ENV PATH /app/node_modules?./bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install react-bootstrap bootstrap --silent
RUN npm install react-router-dom --silent
RUN npm install node-sass --silent
RUN npm install @reduxjs/toolkit --silent
RUN npm install formik --silent
RUN npm install yup --silent
RUN npm install axios --silent
RUN npm install cypress --save-dev
RUN npm install --save-dev webpack-cli
RUN npm install --save amazon-cognito-identity-js
RUN npm install dotenv
RUN npm install jspdf --save


COPY . ./

CMD ["npm", "start"]