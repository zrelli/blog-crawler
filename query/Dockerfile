FROM node:alpine
WORKDIR /app
# Copy package.json and install dependencies
COPY package.json ./
RUN npm install
# Copy the rest of the application code
COPY ./ ./
RUN cp ./prisma/.env.example ./prisma/.env
# Start your application
CMD npx prisma generate && \
    if [ "$RUN_RESET" = "true" ]; then npm run reset; fi && \
    npm start
