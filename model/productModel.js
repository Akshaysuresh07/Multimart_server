
const mongoose = require("mongoose");
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');

const productSchema = new mongoose.Schema(
  
  {
    category: {
      ref: "Category",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    description: {
      required: true,
      type: String,
    },
    productImage: {
      type:String,
      required:true
      },
    
    name: {
      required: true,
      type: String,
    },


    price: {
      default: 0,
      type: Number,
    },
  //   createdBy: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Users',
  //     // required: true
  // },
    stock: {
      default: 0,
      type: Number,
    },
    // subImages: {
    //   type: [
    //     {
    //       url: String,
    //       localPath: String,
    //     },
    //   ],
    //   default: [],
    // },
  },
  { timestamps: true }
);
productSchema.plugin(mongooseAggregatePaginate);

const Products=mongoose.model('Product',productSchema)
module.exports=Products