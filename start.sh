#!/bin/sh
npx prisma generate
# Chạy lệnh Prisma migrate
npx prisma migrate deploy

# Khởi động ứng dụng

npm run start:prod
