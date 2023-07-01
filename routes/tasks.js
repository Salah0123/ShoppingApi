const express = require("express");
const router = express.Router();
const Controller = require("./../controllers/TaskController");

const multer = require("multer");

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

router.get("/", Controller.getAllTasks);
router.post("/addTask", upload.single("myfile"), Controller.addTask);


module.exports=router
