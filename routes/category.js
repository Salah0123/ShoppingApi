const express = require('express');
const router=express.Router();
const Controller=require("./../controllers/CategoryController")
const authMW = require("./../MiddleWare/authenicatedMW");
const {
  isAdmin,
  isUser,
  isUserOrAdmin,
} = require("../MiddleWare/authenicatedMW");


router.get("/",Controller.getAllCategory);
router.post("/addCategory", authMW, isAdmin, Controller.addCategory);
router.patch("/updateCategory/:id",authMW ,isAdmin,Controller.updateCategory);
router.delete("/deleteCategory/:id",authMW ,isAdmin, Controller.deleteCategory);




module.exports=router;