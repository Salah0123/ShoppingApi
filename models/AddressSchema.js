const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    city: String,
    street: String,
    building: Number,
  },
  { _id: false }
);


module.exports = mongoose.model("Address", addressSchema);
