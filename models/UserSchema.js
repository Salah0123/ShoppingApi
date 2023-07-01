const mongoose=require('mongoose')

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      // required: true,
    },
    role: {
      type: String,
      default: "user",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports= mongoose.model('User', userSchema)