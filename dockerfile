FROM node:18


# Instalar netcat
RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Copiar script wait-for-db
COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

EXPOSE 3000

CMD ["/wait-for-db.sh", "npm", "run", "dev"]
