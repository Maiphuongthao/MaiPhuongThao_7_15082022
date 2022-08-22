const express = require("express");
const cors = require("cors");
require("dotenv").config();
require('./app/config/db.config')

const app = express();




//add headers to avoid blocking from corps between 3000 & 4200
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });
  
  const corsOptions = {
    origin: "http://localhost:4200",
  };
  
  app.use(cors(corsOptions));
  app.use(express.json());//Recognize JSON object
  app.use(express.urlencoded({ extended: true }));//recognize object as strings or arrays


//running port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


