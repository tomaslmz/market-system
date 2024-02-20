FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
COPY .env ./
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm", "run", "start:dev"]