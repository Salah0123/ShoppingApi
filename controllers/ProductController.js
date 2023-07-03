const Product = require("./../models/productSchema");




exports.getAllProducts = (req, res, next) => {
  // getAllProductsFromDB
//   console.log(req);
const {page = 1 , limit=10} = req.query
  Product.find()
    .populate("category", "name")
    // .select("_id name price category image")
    // .limit(limit * 1)
    // .skip((page - 1) * limit)
    .sort({ updatedAt: -1 })
    .then((doc) => {
      // console.log(doc);
      if (doc.length >= 1) {
        // const docs = {
        //   doc: doc.map((result) => {
        //     return {
        //       name: result.name,
        //       price: result.price,
        //       category: result.category,
        //       image:result.image,
        //       _id: result._id,
        //       url: {
        //         type: "Get",
        //         urls: `http://localhost:3000/products/${result._id}`,
        //       },
        //     };
        //   }),
        // };
        res.status(200).json({ products: doc, totalLength: doc.length });
      } else {
        res.status(404).json({ message: "Product Not Found" });
      }
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
};

exports.addProduct = (req, res, next) => {
  console.log(req.files);
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.files,
    category:req.body.category,
    color:req.body.color,
    size:req.body.size,
    description:req.body.description,
    quantity:req.body.quantity
  });
  product
    .save()
    .then((doc) => {
      res
        .status(200)
        .json({ message: "Added Product Successfully", product: doc });
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
};

exports.getProductByID = (req, res, next) => {
  Product.find({ _id: req.params.id })
  .populate("category","name")
    .then((prd) => {
      if (prd.length >= 1) {
        res.status(200).json({ product: prd });
      } else {
        res.status(404).json({ message: "Product Not Found" });
      }
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
};

exports.updateProduct = (req, res, next) => {
    // console.log(req.file);
  const newPrd = {
    name: req.body.name,
    price: req.body.price,
    image: req.files,
    category: req.body.category,
    color: req.body.color,
    size: req.body.size,
    description: req.body.description,
    quantity: req.body.quantity,
  };

  Product.findOneAndUpdate({ _id: req.params.id }, { $set: newPrd })
    .then((prd) => {
        console.log(prd);
      if (prd) {
        res.status(202).json({ message: "Product Updated Successfully" });
      } else {
        res.status(404).json({ message: "Product Not Found" });
      }
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
};

exports.deleteProduct = (req, res, next) => {
  Product.findOneAndDelete({ _id: req.params.id })
    .then((data) => {
        console.log(data);
      if (data) {
        res.status(200).json({ message: "Product Deleted Successfully" });
      } else {
        res.status(404).json({ message: "Product Not Found" });
      }
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
};

exports.getProductsByCategory=(req,res,next)=>{
  const { page = 1, limit = 10 } = req.query;
  const id= req.params.id
  // console.log(req.params.id)
  Product.find({ category: id })
    .populate("category", "name")
    // .limit(limit * 1)
    // .skip((page - 1) * limit)
    .sort({ updatedAt: -1 })
    .then((doc) => {
      // console.log(doc)
      if (doc.length >= 1) {
        res.status(200).json({ doc,totalItems:doc.length });
      } else {
        let err = "No Product Fount";
        res.status(404).json({ err });
        // next(err)
      }
    })
    .catch((error) => next(error));
}


// exports.rating=(req,res,next)=>{

// }