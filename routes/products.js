const express=require('express');
const router=express.Router();
const Controller = require("./../controllers/ProductController")
const authMW = require("./../MiddleWare/authenicatedMW");

const {
  isAdmin,
  isUser,
  isUserOrAdmin,
 } = require("../MiddleWare/authenicatedMW");
 
const multer = require("multer");

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
}).array("myfile", 12)


router.get("/", Controller.getAllProducts);

router.post('/addProduct',authMW ,upload,Controller.addProduct)

router.get("/byCategory/:id", Controller.getProductsByCategory)

router.get("/:id",Controller.getProductByID)


router.patch("/:id",authMW ,isAdmin , upload, Controller.updateProduct);
router.patch("/changeQuantity/:id", authMW, Controller.changeQuantity);



router.delete("/:id",authMW , isAdmin, Controller.deleteProduct);




module.exports=router