FROM node:18
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV
WORKDIR /usr/src/app
COPY package*.json ./
COPY .env ./
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm", "run", "start:dev"]