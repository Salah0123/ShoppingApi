const { check, validationResult } = require("express-validator");

module.exports = (req, res, next) => {[
    
      check('userName').not().isEmpty().withMessage('Please Enter Your Email'),
      check('userName').isString().withMessage("Please Enter Valid User Name"),
      check('password').not().isEmpty().withMessage("Please Enter Your Password"),
      check('password').isLength({min: 5}).withMessage("Please Enter Valid Password"),
      check('email').not().isEmpty().optional().trim().isEmail().withMessage("Please Enter Valid Email")
    //   check("confirm-password").custom((value,{req})=>{
    //       if(value !== req.body.password){
    //           throw new Error("Password And Confirm Password Not Match")
    //       }
    //       return true
    //   })
]
};
