const express=require('express');
const router=express.Router();
const multer = require("multer");
const Controller = require('./../controllers/AdminController');


const fileFilter = function (req, file, cb) {
  if (file.mimetype == "image/png") {
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

router.post("/signUp", upload.single("myfile"), Controller.adminSignUp);
router.post("/signIn",Controller.adminSignIn)
router.patch(
  "/updateAdmin/:id",
  upload.single("myfile"),
  Controller.updateAdmin
);
router.delete("/deleteAdmin/:id",Controller.deleteAdmin)

module.exports=router;