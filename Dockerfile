FROM mhart/alpine-node:9

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "dev"]



# FROM mhart/alpine-node:9

# WORKDIR /app
# COPY . /app

# RUN rm -f package-lock.json \
#     ; rm -rf .idea \
#     ; rm -rf node_modules \
#     ; npm config set registry "https://registry.npm.taobao.org/" \
#     && npm install

# EXPOSE 3001
# CMD ["npm", "run", "dev"]


