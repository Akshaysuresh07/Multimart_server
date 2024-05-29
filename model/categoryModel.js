const mongoose=require('mongoose')
const Users=require('./userModel')
const categorySchema=new mongoose.Schema({

   
          name: {
            type: String,
            required: true,
          },
          owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        },
        { timestamps: true }
      );
        const Categories=mongoose.model('Categories',categorySchema)
        module.exports=Categories 