const Order = require("../models/OrderSchema");


exports.addOrder = (req, res, next) => {
  console.log(req.decodedObject);
  const newOrder = new Order({
    user: req.decodedObject.id,
    product: req.body.product,
    quantity: req.body.quantity,
  });

  newOrder
    .save()
    .then((doc) => {
      res.status(200).json({ message: doc });
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
};

exports.getAllOrders = (req, res, next) => {
  Order.find()
    .populate("user", "userName email")
    .populate("product.product", "name price image")
    .then((doc) => {
      if (doc.length >= 1) {
        res.status(200).json({ message: doc });
      } else {
        res.status(404).json({ message: "Order Is Not Found" });
      }
    })
    .catch((err) => {
      next(err)
    });
};

exports.updateOrder = (req, res, next) => {
  const newProduct = req.body.product;
//   console.log(newProduct);

  Order.find({ _id: req.params.id })
    .then((doc) => {
        var oldProduct = doc[0].product;
        console.log(oldProduct);
      for (let indxOfNewPrd = 0;indxOfNewPrd < newProduct.length;indxOfNewPrd++) {
        for ( let indxOfOldPrd = 0;indxOfOldPrd < oldProduct.length; indxOfOldPrd++) {
          if (newProduct[indxOfNewPrd]._id === oldProduct[indxOfOldPrd]._id) {
            oldProduct[indxOfOldPrd].quantity += newProduct[indxOfNewPrd].quantity;
            newProduct.splice(indxOfNewPrd, 1);
            // break;
          }
        }
      }

      oldProduct = oldProduct.concat(newProduct);
      console.log(newProduct);
      console.log(oldProduct);
      const newOrder = {
        product: oldProduct,
      };
      Order.findOneAndUpdate({ _id: req.params.id }, { $set: newOrder })
        .then((doc) => {
            console.log(doc.product.length);
          if (doc.product.length >= 1) {
            res.status(200).json({ doc });
          } else {
            res.status(404).json({ message: "Order Not Found" });
          }
        })
        .catch((err) => {
          res.status(403).json({ message: err });
        });
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
};

exports.deleteOrder = (req,res,next)=>{
    Order.findOneAndDelete({ _id: req.params.id })
      .then(result=>{
        if(result){
            res.status(200).json({message:"Order Is Deleted Successfully"})
        }else{
            res.status(404).json({message: "Order Is Not Found"})
        }
      })
      .catch((err) => {
        res.status(404).json({ message: err });
      });
}

exports.orderByID=(req,res,next)=>{
    Order.find({ _id: req.params.id })
      .then((doc) => {
        // console.log(doc);
        if(doc.length >=1){
            res.status(200).json({doc})
        }else {
            res.status(404).json({message:"Order Not Found"})
        }
      })
      .catch((err) => {
        res.status(404).json({ message: err });
      });
}


exports.userOrders=(req,res,next)=>{
  const userId = req.decodedObject.id;
  console.log(req.decodedObject.id);
  Order.find({ user: userId })
    .populate('product.product')
    .populate("user", "userName")
    .then((doc) => {
      if (doc.length >= 1) {
        res.status(200).json({ doc });
      } else {
        const error = new Error("No Order Found");
        next(error);
      }
    })
    .catch((error) => next(error));
}
