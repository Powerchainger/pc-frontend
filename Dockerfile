# pull official base image
FROM node:16-alpine AS build

# set working directory in the container
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install application dependencies
COPY package.json ./
COPY package-lock.json ./

# create a new user named "appuser"
RUN addgroup appgroup && adduser -S -G appgroup appuser

# change ownership of the /app directory to appuser
RUN chown -R appuser:appgroup /app

# switch to "appuser"
USER appuser

RUN npm ci

# add app
COPY --chown=appuser:appgroup . ./

# build app
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
