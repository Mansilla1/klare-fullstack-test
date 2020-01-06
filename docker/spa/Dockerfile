FROM node:latest

WORKDIR /spa
# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /spa/node_modules/.bin:$PATH
# install and cache app dependencies
ADD package.json /spa/package.json
RUN npm install
RUN npm install react-scripts@0.9.5 -g
# add app
ADD . /spa
# start app
CMD ["npm", "start"]