const Category= require('./../models/CategorySchema');
const Product = require("./../models/productSchema");

exports.getAllCategory=(req,res,next)=>{
    Category.find()
    .then(doc=>{
        if(doc.length>=1){
            res.status(200).json({doc})
        }else{
            res.status(404).json({message:"Category Not Found"})
        }
    })
    .catch(err=>{
        res.status(404).json({ message: err });
    })
}

exports.addCategory=(req,res,next)=>{
    const category= new Category({
        name:req.body.name
    })
    Category.find({ name: req.body.name })
      .then(doc=>{
        if(doc.length>=1){
            res.status(404).json({message:"This Category Is Found"})
        }else{
            category
              .save()
              .then((doc) => {
                res
                  .status(200)
                  .json({ doc, message: "Category Is Add Successfully" });
              })
              .catch((err) => {
                res.status(404).json({ message: err });
              });
        }
      })
      .catch((err) => {
        res.status(404).json({ message: err });
      });
}

exports.updateCategory=(req,res,next)=>{
    const newCat = {
      name: req.body.name,
    };
    Category.findOneAndUpdate({ _id: req.params.id }, {$set: newCat })
      .then((doc) => {
        if (doc) {
            console.log(doc);
          res
            .status(202)
            .json({ doc, message: "Category Updated Successfully" });
        } else {
          res.status(404).json({ message: "This Category Is Not Found" });
        }
      })
      .catch((err) => {
        res.status(404).json({ message: err });
      });
}

exports.deleteCategory=(req,res,next)=>{
    Category.findOneAndDelete({ _id: req.params.id })
      .then((doc) => {
        if (doc) {
          Product.deleteMany({ category: req.params.id })
            .then((result) => {
              res
                .status(200)
                .json({
                  message: "Category And Products Are Deleted Successfully",
                });
            })
            .catch((err) => next(err));
        } else {
          res.status(404).json({ message: "This Category Is Not Found" });
        }
      })
      .catch((err) => {
        res.status(404).json({ message: err });
      });
}