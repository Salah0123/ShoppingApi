const mongoose=require('mongoose')
const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "In-Progress",
    },
  },
  { timestamps: true }
);

module.exports=mongoose.model("Task", taskSchema)