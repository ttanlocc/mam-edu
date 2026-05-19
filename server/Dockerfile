FROM node:22-alpine
RUN apk add --no-cache python3 make g++ sqlite
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev && npm cache clean --force
COPY index.js ./
ENV GIEO_CONTENT=/app/content
EXPOSE 3000
CMD ["node", "index.js"]
