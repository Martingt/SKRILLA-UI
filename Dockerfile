FROM node:10

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

# Installing dependencies
# COPY package*.json ./


# Copying source files
COPY . .

# # Building app
RUN npm install
RUN npm run-script build

# Running the app
CMD [ "npm", "start" ]
