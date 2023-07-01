
const Product = require("./../models/productSchema");



exports.searchFunc = (req, res, next) => {
  const { page = 1, limit = 10, search, category = "All" } = req.query;
  Product.find({
    $or: [
      { name: { $regex: search } },
          // { price: { $regex: search } },
    ],
    //   "category.name": "women's clothes",
  })
    .populate("category", "name")
    .then((doc) => {
      res.status(200).json({ doc });
    })
    .catch((err) => next(err));
};

exports.filterFunc = (req, res, next) => {
  const { color, size, price, model } = req.query;
  Product.find({
    $or: [
      { color: { $regex: color } },
      { size: { $regex: size } },
      { model: { $regex: model } },
      { price: { $lte: price } },
    ],
  })
    .then((doc) => {
      if (doc.length >= 1) {
        res.status(200).json({ doc });
      } else {
        const error = new Error("No Product Found");
        next(error);
      }
    })
    .catch((error) => next(error));
};