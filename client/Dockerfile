FROM node:14

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install --silent

# copy source code
COPY . .

# Expose the port that the application listens on.
EXPOSE 5173

# Run the application.
CMD npm run dev