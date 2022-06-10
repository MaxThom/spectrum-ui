# stage 1

FROM node:latest AS app_build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# stage 2

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=app_build /app/dist/spectrum-ui /usr/share/nginx/html
EXPOSE 80