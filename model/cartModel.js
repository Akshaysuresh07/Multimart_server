const mongoose=require('mongoose')
const users=require('./userModel')


const cartSchema = new mongoose.Schema(
    {
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
      items: {
        type: [
          {
            productId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
            },
            quantity: {
              type: Number,
              required: true,
              min: [1],
              default: 1,
            },
            size:{
              type:String,
              
            },
            image:{
              type:String,
            },
            name:{
              type:String
            },
            price: {
              type: Number,
              
          },
          total:{
            type:Number,
            
          }
        }
        ],
        default: [],
      },
      coupon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coupon",
        default: null,
      },
    },
  
    { timestamps: true }
  );
  const carts=mongoose.model('carts',cartSchema)
  module.exports=carts