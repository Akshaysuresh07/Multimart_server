
const Cart=require('../model/cartModel')
const Product=require('../model/productModel')
exports.addToCart = async (req, res) => {
  const { productId, quantity, size, image, name, price } = req.body;
  console.log(req.body);
  const userId = req.userId;

  try {
      // Find the user's cart
      let cart = await Cart.findOne({ owner: userId });

      // If the cart does not exist, create a new one
      if (!cart) {
          cart = await Cart.create({
              owner: userId,
              items: [{ productId, quantity, size, image, name, price }],
          });
          console.log(cart);
      } else {
          let itemIndex = cart.items.findIndex(p => p.productId == productId);
          if (itemIndex !== -1) {
              // If product already exists, update the quantity
              cart.items[itemIndex].quantity += parseInt(quantity);
              cart.items[itemIndex].price = price*cart.items[itemIndex].quantity;
          }
          else {
              cart.items.push({ productId, quantity, size, name, image, price });
          }
          await cart.save();
      }

      // Calculate total price
      const total = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

      res.status(200).json({ cart, total });
  } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Failed to add to cart' });
  }
};

// exports.addToCart = async (req, res) => {
//     const { productId, quantity, size, image, name, price } = req.body;
//     const userId = req.userId;
  
//     try {
//       const product = await Product.findById(productId);
//       if (!product) {
//         return res.status(404).json({ message: 'Product not found' });
//       }
  
//       // Fetch or create user's cart
//       let userCart = await Cart.findOne({ owner: userId });
//       if (!userCart) {
//         userCart = await Cart.create({ owner: userId ,items: [{ productId, quantity,size ,image,name,price}]});
//       }
  
//       // Check if the product already exists in the cart
//       const existingCartItemIndex = userCart.items.findIndex(item => item.productId == productId);
  
//       if (existingCartItemIndex !== -1) {
//         // If product already exists, update the quantity
//         userCart.items[existingCartItemIndex].quantity += parseInt(quantity, 10);
//       } else {
//         // If product doesn't exist, add it to the cart
//         userCart.items.push({
//           product: productId,
//           quantity: parseInt(quantity, 10),
//           price: price,
//         });
//         console.log('Price of added product:', price);
//       }
  
//     // Calculate total amount based on items in the cart
// userCart.totalAmount = userCart.items.reduce((total, item) => {
//     return total + item.quantity * item.price;
//   }, 0);
  
//       let totalItems = 0;
//       for (let item of userCart.items) {
//         totalItems += item.quantity;
//       }
  
//       userCart.totalItems = totalItems;
//       console.log('Total items in cart:', totalItems);
  
//       // Save the cart and send the response
//       const cart = await userCart.save({price,totalItems});
//       res.status(200).json(cart);
//     } catch (error) {
//         console.log(error);
//       res.status(501).json(error);
//     }
//   };


 exports.getUserCart = async (req, res) => {
    const userId = req.userId;
 

    try {
        // Find the user's cart
        let cart = await Cart.findOne({ owner: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to fetch cart' });
    }
 
  };

  exports.removeItemFromCart = async (req, res) => {
    console.log('inside remove item from cart');

    const userId = req.userId;
    const { productId } = req.params;
    console.log(productId);

    try {
       
        let cart = await Cart.findOne({ owner: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove the item from the cart
        cart.items = cart.items.filter(item => item.productId!= productId);
        
        await cart.save();

        res.status(200).json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to remove item from cart' });
    }
};

exports.updateItemQuantity = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    try {
        // Find the user's cart
        let cart = await Cart.findOne({ owner: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the item in the cart
        let itemIndex = cart.items.findIndex(item => item.productId == productId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

       
        cart.items[itemIndex].quantity = quantity;
        cart.markModified('items');
        await cart.save();

        res.status(200).json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to update item quantity' });
    }
};
exports.deleteCart=async(req,res)=>{
    const userId = req.userId;
    try {
        const cart = await Cart.findOne({owner: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.items = [];
        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to empty cart' });
    }
};
    
    
