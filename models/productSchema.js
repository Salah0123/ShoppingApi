const mongoose=require("mongoose");


const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity:{
        type:Number
    },
    size:{
        type:String
    },
    description:{
        type:String
    },
    color:{
      type:String
    }
    // rate: {
    //   type: [
    //     {
    //       star: Number,
    //       postedBy: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User",
    //       },
    //       feedback: string,
    //       date: {
    //         type: Date,
    //         default: Date.now,
    //       },
    //     },
    //   ],
    // },
    // totalRating: {
    //     type: number,
    //     default: 0
    // }
  },
  { timestamps: true }
);



module.exports=mongoose.model('Product', productSchema)