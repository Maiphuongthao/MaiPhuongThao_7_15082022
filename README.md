# Groupomania - un réseau social d’entreprise

This is the last project of OpenClassooms Web Developper path. 



## BACKEND


### Requirements


Node.js, version: 16.14.0 LTS or later

npm, version 8.3.1 or later

nodemon, 2.0.19 or later
 





### Getting started


Clone this repo. Move to directory ```back``` , run:
```bash 
npm install 
``` 
then: 
```bash 
nodemon server 
``` 

The server should run on localhost with default port 3000.
Create your own ``.env`` file, copy the variables from ``.env.example`` file and set its own value.

## Front-end

Return to the root directory then move to directory ```front```, then run:


### Requirements
Vue latest version with Vite


### Getting started


```bash
npm init vue@latest
```

```bash 
npm install
``` 
then:
```bash
npm run dev
```




### Usage


Using Postman or Postwoman... to test this API. Token for authentification will be required, you'll need to /signup and /login first to test the rest of routes.

Routes can be tested:


| name  |      method   |  URI | description |
|----------|:-------------:|------:|------:|
| signup | POST   | /api/auth/signup/  |   create an user |
| login| POST  |  /api/auth/login/  |   login to account |
|readUser |GET | /api/auth/| return user's data|
| exportData | GET  | /api/auth/export /  |  export user's data to a .txt file |
| updateUser | PUT | /api/auth/ |  update user's data |
| deleteUser | DELETE | /api/auth/ |   delete user |
| readOnePost | GET | /api/sauces/:id |  return the chosen post |
| readPosts | GET | /api/sauces/ |   return all available posts |
| createPost | POST | /api/sauces/ |   create a new post|
| likePost | POST | /api/sauces/:id/like/ |  Like or dislike chosen post|
| updatePost | PUT | /api/sauces/:id/ |   update post's information|
| deletePost | DELETE | /api/sauces/:id/ |   delete chosen post|



The API works with MongoDB NoSQL database. Signup on [MongoDB website](https://www.mongodb.com/cloud/atlas/register) to get your srv, then add it as value of MONGO_URI in your ```.env``` file. 


