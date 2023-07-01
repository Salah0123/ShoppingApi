// exports.getAllUsers

const bcrypt = require("bcrypt");
const JWT =require("jsonwebtoken")
const { check, validationResult } = require("express-validator");
const User = require("./../models/UserSchema");
const Order = require("../models/OrderSchema");
// const authMW = require("./../MiddleWare/authenicatedMW");




exports.getAllUsers=(rea,res,next)=>{
  User.find()
  .then(doc=>{
    if(doc.length>=1){
      res.status(200).json({users:doc})
    }else {
      let error = "No Users Found"
      next(error)
    }
  })
  .catch(err=>next(err))
}


exports.signUp = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()){
    console.log(errors)

    User.find({ email: req.body.email })
      .then((result) => {
        if (result.length < 1) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              next(err);
            } else {
              // console.log(hash);
              const user = new User({
                userName: req.body.userName,
                email: req.body.email,
                password: hash,
                phone: req.body.phone,
                address: req.body.address,
                // image?: req.file.path
              });
              user
                .save()
                .then((response) => {
                  console.log(response);
                  res
                    .status(200)
                    .json({ message: "User Created Successfully" });
                })
                .catch((err) => {
                  next(err);
                });
            }
          });
        } else {
          let err = new Error("User Is Already Created Before");
          next(err);
        }
      })
      .catch((err) => {
        next(err);
      });
  }else {
    res.status(404).send({ errors: errors.array() });
    // next(errors.array())
  }
};








exports.signIn = (req, res, next) => {
    let token
  User.find({ email: req.body.email })
    .then((user) => {
      if (user.length >= 1) {
        bcrypt
          .compare(req.body.password, user[0].password)
          .then((result) => {
            console.log(user[0].role)
            if (result) {
              //send token
              token = JWT.sign(
                {
                  userName: req.body.userName,
                  email:req.body.email,
                  id: user[0]._id,
                  role: user[0].role,
                },
                process.env.secretKey,
                { expiresIn: "24h" }
              );
              res.status(200).json({ message: "success sign in",token,user });
            } else {
              let err = new Error("Wrong Password");
              next(err)
            }
          })
          .catch((err) => {
            next(err);
          });
      } else {
        let err=new Error("User Is Not Found")
        next(err);
      }
    })
    .catch((err) => {
      next(err);
    });
};









exports.updateUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((result) => {
      let newUser;
      if (result) {
        console.log(result);
        bcrypt.hash(req.body.password,10)
          .then(hash => {
            newUser = {
              userName: req.body.userName,
              email: req.body.email,
              password: hash,
              phone: req.body.phone,
              address: req.body.address,
            };
            let image= req.body.image;
            // console.log(req.file.path);
            if(req.file){
              console.log("hiiiii");
               image = req.file.path;
               newUser.image = image;
            }else{
              console.log("llll");
            }
            //get id from token
            // authMW;
            User.updateOne({ _id: req.params.id }, { $set: newUser })
              .then((result) => {
                console.log(result);
                res
                  .status(202)
                  .json({ message: "User Already Updated Successfully",result });
              })
              .catch((err) => {
                next(err);
              });
          })
          .catch((err) => {
            res.status(404).json({ message: 'password in not valid',err });
          });
      } else {
        res.status(404).json({ message: "User Is Not Found" });
      }
    })
    .catch((err) => {
      next(err)
    });
};


exports.changeRole=(req,res,next)=>{
  User.findOne({ _id: req.params.id })
    .then((doc) => {
      if (doc) {
        let newObject = {
          role: req.body.role,
        };
        User.updateOne({ _id: req.params.id }, { $set: newObject })
          .then((result) => {
            console.log(result);
            res.status(200).json({ message: "User Successfully Updated" });
          })
          .catch((err) => next(err));
      } else {
        let error = "User Is Not Found";
        next(error);
      }
    })
    .catch((err) => next(err));
}




exports.deleteUser = (req, res, next) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then((result) => {
      if (result) {
        Order.deleteMany({ user: req.params.id })
        .then(result=>{
          if(result){
            res.status(200).json({ message: "User Is Deleted Successfully With Has Orders" });
          }else{
            res.status(404).json({ message: "User Is Not Found" });
          }
        })
        .catch(err=>next(err))
        
      } else {
        res.status(404).json({ message: "User Is Not Found" });
      }
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
};