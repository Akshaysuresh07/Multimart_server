const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const adminController = require('../controller/adminController')
const categoryController = require('../controller/categoryController')
const cartController=require('../controller/cartController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const isAdmin = require('../Middlewares/isadmin')
const productController=require('../controller/productController');
const multerConfig = require('../Middlewares/multerConfig');
const  stripe=require('../controller/stripe');
const Order = require('../controller/order');


//user routes
router.post('/register', userController.register)
router.post('/login', userController.login)
//admin routes
router.post('/registeradmin', adminController.registerAdmin)
router.post('/loginAdmin', adminController.loginAdmin)


//category routes
router.post('/category',categoryController.createCategory)
router.get('/allcategories',categoryController.getallCategories)


//product routes
router.post('/addProduct',jwtMiddleware,isAdmin,multerConfig.single('productImage'), productController.addProduct);
router.get('/getProducts',productController.getAllProducts )
router.put('/updateProducts/:pid',jwtMiddleware,isAdmin,multerConfig.single('productImage'),productController.updateProducts )
router.delete('/deleteProducts/:pid',jwtMiddleware,isAdmin,productController.removeProduct)
router.get('/getProducts/:pid',productController.getproductByid )
router.get('/gethomeProduct',productController.getHomeProducts)
router.get('/getSliderProduct',productController.getSliderProducts)
//cart routes
router.post('/addtocart',jwtMiddleware,cartController.addToCart)
router.get('/getcart',jwtMiddleware, cartController.getUserCart)
router.delete('/removefromcart/:productId',jwtMiddleware,cartController.removeItemFromCart)
router.put('/updateCart',jwtMiddleware,cartController.removeItemFromCart)
router.delete('/clearCart/:id',jwtMiddleware,cartController.deleteCart)

router.post('/checkout',stripe.makeTrans)
router.post('/addOrder',jwtMiddleware,Order.CreateOrder)
module.exports=router