FROM node:18-alpine
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3000
ENTRYPOINT ["npm"]
CMD ["start"]