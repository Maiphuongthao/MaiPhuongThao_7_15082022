const passwordValidator = require('password-validator');

// Create a schema
const schema = new passwordValidator();

// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 1 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

module.exports = (req, res, next)=>{
    if (!schema.validate(req.body.password)) {
        return res.status(403).json({
          error:
            "Your password need minimum 8 characters and 100 max, 2 digits minimum, lowcase and upcase letters are required",
        });
      } else {
        next();
      }
    
}