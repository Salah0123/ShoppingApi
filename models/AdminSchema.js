const mongoose=require("mongoose");
// const Address = require("./AddressSchema")


const addressSchema = new mongoose.Schema(
  {
    city: String,
    street: String,
    building: Number,
  },
  { _id: false }
);

const AdminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // phone: {
  //   type: String,
  //   required: true,
  // },
  // address: {
  //   type: String,
  //   required: true,
  // },
  // image: {
  //   type: String,
  //   required: true,
  // },
  role: {
    type: String,
    default: "admin",
    required: true,
  },
});

module.exports=mongoose.model("Admin", AdminSchema)