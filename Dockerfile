FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV DATABASE_URL="postgresql://postgres:password@postgres:5432/async_tasks"

RUN npx prisma generate

EXPOSE 5000

CMD ["npm", "run", "dev"]