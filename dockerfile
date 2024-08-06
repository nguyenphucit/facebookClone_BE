#BUILD STAGE
FROM node:20-alpine as build

WORKDIR /usr/app

COPY package* ./
COPY package-lock* ./

RUN npm install --only=development

COPY . .

RUN npx prisma generate

RUN npm run build

#DEPLOY STAGE
FROM node:20-alpine

WORKDIR /usr/app

COPY package* ./
COPY package-lock* ./

RUN npm install --ondy=prod

COPY . .

COPY --from=build /usr/app/dist ./dist
