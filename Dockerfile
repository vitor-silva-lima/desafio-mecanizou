
FROM node:22-bookworm
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
ENV PORT=3001
CMD ["npm", "run", "start:prod"]
