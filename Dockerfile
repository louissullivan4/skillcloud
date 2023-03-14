FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm ci --only=production
COPY . ./
RUN npm run build
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/web
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]