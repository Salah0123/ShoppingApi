var express = require('express');
var router = express.Router();

const { body, validationResult } = require("express-validator");
const multer = require("multer");
const Controller=require('./../controllers/UsersController')
const authMW = require("./../MiddleWare/authenicatedMW");
const isValid = require("./../MiddleWare/validationMW")
const {
  isAdmin,
  isUser,
  isUserOrAdmin,
} = require("../MiddleWare/authenicatedMW");
const fileFilter = function (req, file, cb) {
  if (file.mimetype == "image/png" || "image/jpg") {
    cb(null, true);
  } else {
    cb(new Error("Please Upload png File"), false);
  }
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toDateString() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

/* GET users listing. */
router.post(
  "/signUp",
  
    // body("userName").isEmpty().withMessage("Please Enter Your Name"),
    // body("userName")
      // .not()
      // .isString()
      // .withMessage("Please Enter Valid User Name"),
    // body("password").isEmpty().withMessage("Please Enter Your Password"),
    // body("password")
      // .isStrongPassword({ minLength: 8 })
      // .isLength({ min: 5})
      // .withMessage("Please Enter Valid Password"),
    // body("email")
    //   .isEmpty()
    //   .optional()
    //   .trim()
    //   .isEmail()
    //   .withMessage("Please Enter Valid Email"),
  
  upload.single("myfile"),
  Controller.signUp
);
router.post('/signIn',Controller.signIn)
router.get("/allUsers", authMW, isAdmin,Controller.getAllUsers);
router.patch("/updateUser/:id",authMW , upload.single("myfile"), Controller.updateUser);
router.patch("/changeRole/:id", authMW, isAdmin,Controller.changeRole);
router.delete("/deleteUser/:id",authMW , Controller.deleteUser)

module.exports = router;
