const Task = require("./../models/TaskSchema")


exports.getAllTasks=(req,res,next)=>{
    Task.find()
    .then(docs=>{
        if((docs.length)>=1){
            res.status(200).json({docs})
        }else {
            let error = new Error("No Tasks Found")
            next(error)
        }
    }).catch(err=>{
        next(err)
    })
}

exports.addTask=(req,res,next)=>{
    const task=new Task({
        title:req.body.title,
        userId:req.body.userId,
        image:req.file.path,
        description:req.body.description,
        deadLine:red.body.deadLine,

    })

    task.save()
    .then(doc=>{
        res.status(200).json({message:"Added Successfully"})
    })
    .catch(err=>next(err))
}