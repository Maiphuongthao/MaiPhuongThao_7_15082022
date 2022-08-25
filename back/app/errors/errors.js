//messages errors at signup proceed

module.exports.signUpErrors = (err) => {
    let errors = { pseudo: "", email: "", password: "" };
  
    //pseudo invalid
    if (err.message.includes("pseudo"))
      errors.pseudo = "Pseudo incorrect ou déjà pris";
  
      //email invalid
    if (err.message.includes("email")) errors.email = "Email incorrect";
  
    //password too long or too short
    if (err.message.includes("password"))
      errors.password = "Le mot de passe doit faire 6 caractères minimum";
  
      //code 11000 show when unique element appears
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
      errors.pseudo = "Ce pseudo est déjà pris";
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
      errors.email = "Cet email est déjà enregistré";
  
    return errors;
  };
  

  //error while login
  module.exports.logInErrors = (err) => {
    let errors = { email: '', password: ''}
  
    if (err.message.includes("email")) 
      errors.email = "Email inconnu";
    
    if (err.message.includes('password'))
      errors.password = "Le mot de passe ne correspond pas"
  
    return errors;
  }

  //errors of uploading file


  module.exports.uploadErrors = (err) =>{
    let errors = {format:'', maxSize: ''};

    if(err.message.includes('invalide file')){errors.format = 'Incompatable format'};
    if(err.message.includes('max size')){errors.maxSize = 'File is more than 500ko'};

    return errors;
  }