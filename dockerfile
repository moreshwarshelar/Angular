FROM node:11.6.0-alpine AS builder
COPY . ./NuvenDemo-Angular
WORKDIR /NuvenDemo-Angular
RUN npm i
RUN $(npm bin)/ng build --prod

FROM nginx:1.15.8-alpine
COPY --from=builder /NuvenDemo-Angular/dist/NuvenDemo-Angular/ /usr/share/nginx/html
