const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cryptoJs = require("crypto-js");
require("dotenv").config();
const fs = require("fs");
const { signUpErrors, logInErrors } = require("../errors/errors");

////////ENCRYPT EMAIL/////////////
function encrypt(value) {
  return CryptoJS.AES.encrypt(
    value,
    CryptoJS.enc.Base64.parse(process.env.CRYPTO_KEY),
    {
      iv: CryptoJS.enc.Base64.parse(process.env.CRYPTO_IV),
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  ).toString();
}

function decrypt(value) {
  var bytes = CryptoJS.AES.decrypt(
    value,
    CryptoJS.enc.Base64.parse(process.env.CRYPTO_KEY),
    {
      iv: CryptoJS.enc.Base64.parse(process.env.CRYPTO_IV),
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return bytes.toString(CryptoJS.enc.Utf8);
}

////////////////SIGNUP NEW USER//////////////////////:
exports.signup = (req, res, next) => {
  //Encrypt email before sending it to database
  bcrypt
    //call function hash by bcrypt to password with a salt 10 times to make it safer
    //create a new user and save it in database with encrypted email, send message if it's created and error if not
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        pseudo: req.body.pseudo,
        email: encrypt(req.body.email),
        password: hash,
      });
      user
        .save()
        .then((newUser) => {
          newUser.email = decrypt(newUser.email);
          res.status(201).json({ message: "User created !", user: newUser });
        })
        .catch((error) => {
          const errors = signUpErrors(error);
          res.status(400).send({ errors });
        })
        .catch((error) => res.status(500).json(error));
    });
};

///////////////// LOGIN USER ///////////////////////////
exports.login = (req, res, next) => {
  //Showing encrypted email and check with user given email
  const encryptedEmail = encrypt(req.body.email);
  User.findOne({ email: encryptedEmail })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User not found !" });
      }
      //decrypte email from encrypted to compare with given email by user
      user.email = decrypt(user.email);
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ error: "Your password is incorrect !" });
          }
          res.status(200).json({
            //chiffrer un nouveau token
            token: jwt.sign(
              //userId entant playload
              { userId: user._id },
              //random token dispo pendant 24h
              process.env.JWT_TOKEN,
              { expiresIn: "24h" }
            ),
            //return user as correct user
            user,
          });
        })
        .catch((error) => {
          const errors = logInErrors(error);
          res.status(500).send({ errors });
        });
    })
    .catch((error) => res.status(500).json(error));
};

///////////////////// LOGOUT /////////////////////////////////

exports.logout
