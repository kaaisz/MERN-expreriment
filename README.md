# MERN experiment

## Language/Framework which I used

- ES6/JavaScript
- Node.js/Express
- MongoDB
- React/Redux
- Bootstrap 4
- Heroku & git

## Purpose for creating this app

- Create backend API with Node/Express
- Test with Postman
- Try to use Bootstrap 4
- Use React and connect with backend
- Use Redux for state management
- Prepare, build and deploy to Heroku

courtesy for this project repos: https://github.com/bradtravesy/devconnector

## Creating Process

### 1. Setup environment
- MongoDB setup with [Mlab](https://mlab.com)
- `npm init`
- install packages
```$ npm i express mongoose passport passport-jwt jsonwebtoken body-parser bcryptjs validator```
  - `express` - node.js framework
  - `mongoose` - to connect with mongoDB
  - `passport` - to use for authentication
  - `passport-jwt` - passport-json-web-token - use passport with json web token
  - `jsonwebtoken` - to generate token
  - `body-perser` - to take the data throughout the request
  - `bcryptjs` - to use bcrypt with js (password hashing function - https://en.wikipedia.org/wiki/Bcrypt)
  - `validator` - to use validation
- install nodemon to dev-dependencies
```$ npm i -D nodemon```
* nodemon is a package for watching updates instead of we'll watch & keep update it manually