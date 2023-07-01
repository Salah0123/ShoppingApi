const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const Admin=require("./../models/AdminSchema");


exports.adminSignUp=(req,res,next)=>{
    Admin.find({email:req.body.email})
    .then(doc=>{
        if(doc.length<1){
            bcrypt.hash(req.body.password,10,(error, hash)=>{
                if(error){
                    res.status(404).json({error})
                }else{
                    const admin = new Admin({
                      name: req.body.name,
                      email: req.body.email,
                      password: hash,
                      // phone: req.body.phone,
                      // address: req.body.address,
                      // image: req.file.path,
                    });
                    admin.save()
                    .then(doc=>{
                        res.status(200).json({message:"New Admin Is Created Successfully"})
                    })
                    .catch(error=>{
                        next(error)
                    })
                }
            })
        }else{
            res
              .status(404)
              .json({ message: "Admin Is Already Created Before" });
        }
    })
    .catch(err=>next(err))
    
}



exports.adminSignIn=(req,res,next)=>{
    let token
    Admin.find({email:req.body.email})
    .then(doc=>{
        if(doc.length>=1){
            bcrypt
              .compare(req.body.password, doc[0].password)
              .then((result) => {
                if (result) {
                    token = JWT.sign(
                      {
                        name: req.body.name,
                        email: req.body.email,
                        role: "admin",
                      },
                      process.env.secretKey,
                      {expiresIn: "24h"}
                    );
                  res.status(200).json({message:"Successfully SignIn" ,doc,token });
                } else {
                  res.status(404).json({ message: "Password Is Wrong" });
                }
              })
              .catch((error) => {
                next(error);
              });
        }else{
            res.status(404).json({message:"This Admin Is Not Found"})
        }
    })
    .catch(error=>{next(error)})
    
}

exports.updateAdmin=(req,res,next)=>{
    Admin.findOne({_id:req.params.id})
    .then(doc=>{
        if(doc){
            bcrypt.hash(req.body.password,10)
            .then(hash=>{
                const newAdmin = {
                  name: req.body.name,
                  email: req.body.email,
                  password: hash,
                  phone: req.body.phone,
                  address: req.body.address,
                  image: req.file.path
                };
                Admin.updateOne({ _id: req.params.id }, { $set: newAdmin })
                  .then(doc=>{
                    res.status(200).json({message:"Admin Is Updated Successfully", doc})
                  })
                  .catch((error) => next(error));
            })
            .catch(error=>next(error))
        }else{
            res.status(404).json({message: "Admin Is Not Found"})
        }
    })
    .catch(error=>next(error))
}

exports.deleteAdmin=(req,res,next)=>{
    Admin.findOneAndDelete({_id:req.params.id})
    .then(doc=>{
        if(doc){
            res.status(200).json({message:"Admin Is Deleted Successfully"})
        }else{
            let error=new Error("Admin Is Not Found")
            next(error)
        }
    })
    .catch(error=>next(error))
}