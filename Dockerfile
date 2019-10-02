FROM node:10.15

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "dev"]

