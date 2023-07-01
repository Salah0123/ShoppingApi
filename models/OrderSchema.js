const mongoose=require('mongoose')


const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: [
    {
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        quantity:{
            type:Number
        },
    },
  ],
},{ timestamps: true });


module.exports=mongoose.model('Order', orderSchema)