FROM node:18
WORKDIR /react-app
COPY ./package*.json ./
RUN npm i
COPY . .
EXPOSE 5173
CMD ["npm","run","dev"]