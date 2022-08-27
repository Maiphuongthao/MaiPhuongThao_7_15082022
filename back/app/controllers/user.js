const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
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
        username: req.body.username,
        email: encrypt(req.body.email),
        password: hash,
      });
      user
        .save()
        .then((newUser) => {
          newUser.email = decrypt(newUser.email);
          res.status(201).json({ message: "User created !", newUser });
        })
        .catch((error) => {
          const errors = signUpErrors(error);
          res.status(400).send({ errors });
        });
    })
    .catch((error) => res.status(500).json(error));
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
          //Creating an access token

          const accessToken = jwt.sign(
            //userId entant playload
            { userId: user._id },
            //random token dispo pendant 24h
            process.env.TOKEN_SECRET,
            { expiresIn: "15m" }
          );

          //Declare refreshToken method ( res object & jwt key) and reassigning it to httpOnly-cookie: to regenerate newtoken once old one is expired
          const refreshToken = jwt.sign(
            //userId entant playload
            { userId: user._id },
            //random token dispo pendant 24h
            process.env.REFRESH_TOKEN,
            { expiresIn: "24h" }
          );
          const userSend = hateoasLinks(req, user, user._id);
          res.cookie("jwt", refreshToken, {
            httpOnly: true,
            //cookie is allowed in intersite context == protect from server attacking
            sameSite: "None",
            secure: true,
            maxAge: 1000 * 60 * 60 * 24,
          });

          res.status(200).json({
            userId: user._id,
            //chiffrer un nouveau token
            token: accessToken,
            refreshToken: refreshToken,
            //return user as correct user
            userSend,
          });
        })
        .catch((error) => {
          const errors = logInErrors(error);
          res.status(500).send({ errors });
        });
    })
    .catch((error) => res.status(500).json(error));
};

////////////////REFRESH TOKEN ROUTE////////////////////
//whenever a token expires or user refresh, a new access token can be created

exports.refresh = (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  //destructuring refreshtoken from cookie
  const refreshToken = cookies.jwt;

  //verifying refreshtoken
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN,
    async (error, decoded) => {
      //wrong refresh token
      if (error) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findOne({
        userId: decoded.userId,
      }).exec();

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      //correct token ==send new access token
      const accessToken = jwt.sign(
        { userId: foundUser._id },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );
      res.json({ accessToken });
    }
  );
};

///////////////////// LOGOUT /////////////////////////////////

exports.logout = (req, res, next) => {
  User.findOne({ _id: req.auth.userId })
    .then(() => {
      const cookies = req.cookies;
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      res.redirect("/");
      res.status(200).json({ message: "User logged out" });
    })
    .catch((error) => res.status(404).json(error));
};

/////////////////READ OWN PROFILE///////////////////

exports.readUserInfo = (req, res, next) => {
  User.findById(req.auth.userId)
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: "user not found" });
      } else {
        (user.email = decrypt(user.email)),
          (user.imageUrl = `${req.protocol}://${req.get("host")}${
            user.imageUrl
          }`);
        res.status(200).json(hateoasLinks(req, user, user._id));
      }
    })
    .catch((error) => res.status(500).json(error));
};

////////////////// READ ONE USER /////////////////////////

exports.readOneUser = (req, res, next) => {
  // Check the user login if it's existe
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: "user not found" });
      } else {
        const userFound = {
          username: user.username,
          imageUrl: `${req.protocol}://${req.get("host")}${user.imageUrl}`,
        };
        res.status(200).json(hateoasLinks(req, userFound, userFound._id));
      }
    })
    .catch((error) => res.status(500).json(error));
};

//////////////EXPORT USER DATA//////////////////////////
exports.exportData = (req, res, next) => {
  // Check the user login if it's existe
  User.findById(req.auth.userId)
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: "user not found" });
      } else {
        // decrypt the email to be returned
        user.email = decrypt(user.email);
        const txt = user.toString();
        res.attachment("userData.txt");
        res.status(200).json(txt);
      }
    })
    .catch((error) => res.status(500).json(error));
};

//////////////////////UPDATE USER PRODILE////////////////
exports.updateUser = (req, res, next) => {
  User.findById(req.auth.userId)
    // check the email of user
    .then(async (user) => {
      if (!user) {
        res.status(401).json({ message: "user not found" });
      } else {
        const update = req.file ? JSON.parse(req.body.user) : req.body;

        //in case email modification
        if (update.email) {
          update.email = encrypt(update.email);
        }

        ///in case password modification
        if (update.password) {
          const hash = await bcrypt.hash(update.password, 10);
          update.password = hash;
        }

        //In case img file modification
        const userObject = req.file
          ? {
              ...JSON.parse(req.body.user),
              imageUrl: `/images/${req.file.filename}`,
            }
          : {
              ...req.body,
            };
        const filename = user.imageUrl.split("/images/")[1];
        try {
          if (userObject.imageUrl) {
            fs.unlinkSync(`images/${filename}`);
          }
        } catch (error) {
          console.error(error);
        }

        // update user data with new info, email need to be encrypted before adding to database
        User.findOneAndUpdate({ _id: req.auth.userId }, ...userObject, {
          new: true,
          setDefaultsOnInsert: true,
          upsert: true,
        })
          .then((updatedUser) => {
            //decrypt email to be returned
            updatedUser.email = decrypt(updatedUser.email);
            res.status(200).json(hateoasLinks(req, updatedUser, updatedUser._id));
          })
          .catch((error) => console.log(error));
      }
    })
    .catch((error) => res.status(500).json(error));
};

/////////////////DELETE USER/////////////////////////
exports.deleteUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(403).json({ message: "User isn't found" });
      } else {
        const filename = user.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          User.deleteOne({ _id: req.params.id })
            .then(() => {
              Post.deleteMany({ userId: req.params.userId })
                .then(() => res.status(204).send())
                .catch((error) => res.status(400).json(error));
              res.status(204).send();
            })
            .catch((error) => res.status(400).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//hateoas links
const hateoasLinks = (req, user, id) => {
  const hateoas = [
    {
      href: `${req.protocol}://${req.get("host") + "/api/auth/signup"}`,
      rel: "signup",
      type: "POST",
    },
    {
      href: `${req.protocol}://${req.get("host") + "/api/auth/login"}`,
      rel: "login",
      type: "POST",
    },
    {
      href: `${req.protocol}://${req.get("host") + "/api/auth/refresh"}`,
      rel: "refresh",
      type: "POST",
    },
    {
      href: `${req.protocol}://${req.get("host") + "/api/auth/logout"}`,
      rel: "logout",
      type: "GET",
    },
    {
      href: `${req.protocol}://${req.get("host") + "/api/auth/" + id}`,
      rel: "readOneUser",
      type: "GET",
    },
    {
      href: `${req.protocol}://${req.get("host") + "/api/auth/"}`,
      rel: "readUserInfo",
      type: "GET",
    },
    {
      href: `${req.protocol}://${req.get("host") + "/api/auth/export"}`,
      rel: "export",
      type: "GET",
    },
    {
      href: `${req.protocol}://${req.get("host") + "/api/auth/"}`,
      rel: "update",
      type: "PUT",
    },
    {
      href: `${req.protocol}://${req.get("host") + "/api/auth/"}`,
      rel: "delete",
      type: "DELETE",
    },
  ];

  return {
    ...user.toObject(),
    links: hateoas,
  };
};
