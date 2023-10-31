const mongoose = require("mongoose");
const { Schema } = mongoose;


const submissionSchema = new Schema({
    language:{
        type:String,
    },
    // filePath:{
    //     type:String,
    // },
    slug:{
      type:String,
    },
    completedAt:{
        type:Date
    },
    status:{
        type:String,
    },
},{timestamps:true});

const submission = mongoose.model("submission",submissionSchema);

module.exports = submission;