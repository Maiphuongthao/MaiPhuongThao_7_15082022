const jwt = require("jsonwebtoken");

// verify if user is connected to transfert connection infos to differents methods
module.exports = (req, res, next) => {
  try {
    //get header and split it after space which is 2nd

    let token = req.headers.authorization.split(" ")[1];
    //decode the token

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
 
    //get userId as decode token userID
    const userId = decodedToken.userId;

    const isAdmin = decodedToken.isAdmin;


    //add this value to request to call it after
    req.auth = {
      userId,
      isAdmin
    };

    //Check if userId exist in body and if it isn't the same as userID of post then return error message, if not continue
    if ((req.body.userId && req.body.userId !== userId)|| req.body.isAdmin === false) {
      res.status(403).json({ error: "unauthorized requets" + error });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({ error: "unauthorized request" });
  }
};
