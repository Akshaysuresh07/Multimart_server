const Products=require('../model/productModel')
const Category=require('../model/categoryModel')

exports.addProduct = async (req, res) => {
    const { name, description, price ,category} = req.body;
    console.log(req.body);
    console.log(req.payload)
    const productImage = req.file.filename
    // const createdBy  = req.userId

    try {
        const categoryN = await Category.findOne({ name: category })
        console.log(category);


        if (!categoryN) {
            return res.status(400).json({ message: 'Category not found' });
        }
        
        const newProduct = new Products({
            name,
            description,
            price,
            category: categoryN._id,
          
            productImage,
            stock: 0
        });

        
        await newProduct.save();
        console.log(newProduct);

        res.status(201).json({ message: 'Product added successfully', newProduct});
    } catch (error) {
       console.log(error);
        res.status(500).json({ message: 'Failed to add product' });
    }
};
exports.getAllProducts = async (req, res) => {
    console.log('inside product');
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const categoryName = req.query.category || 'all'
    const skip = (page - 1) * limit;
    let query = {};
  
    if (categoryName !== 'all') {
      if (categoryName === 'clear') {
        query = {};
      } else {
        const category = await Category.findOne({ name: categoryName });
        if (!category) {
          return res.status(404).json({ message: 'Category not found' });
        }
        query.category = category._id;
      }
    }
  
    try {
      const allProducts = await Products.find(query).skip(skip).limit(limit).populate('name')
      res.status(200).json(allProducts)
    } catch (err) {
      res.status(500).json(err)
      console.log(err);
    }
  }
exports.getHomeProducts=async(req,res)=>{
    try{
        const homeProducts=await Products.find() .limit(4)
        res.status(200).json(homeProducts)
    }catch(err){
        res.status(401).json(err)
    }
}
exports.getSliderProducts=async(req,res)=>{
    try{
        const homeProducts=await Products.find().sort({createdAt:-1}) .limit(20)
        res.status(200).json(homeProducts)
    }catch(err){
        res.status(401).json(err)
    }
}




exports.getproductByid=async(req,res)=>{
     const { pid } = req.params;

    try {
        const product = await Products.findById(pid);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to fetch product' });
    }
}
exports.updateProducts = async (req, res) => {
    console.log('inside update products');
    const { pid } = req.params;
    const { name, description, price, category, createdBy, productImage, stock } = req.body;
    const uploadImage = req.file ? req.file.filename : productImage;

   
    let update = {};
    if (name !== undefined) update.name = name;
    if (description !== undefined) update.description = description;
    if (price !== undefined) update.price = price;
    if (category !== undefined) update.category = category;
    if (createdBy !== undefined) update.createdBy = createdBy;
    if (uploadImage !== undefined) update.productImage = uploadImage;
    if (stock !== undefined) update.stock = stock;

    try {
        const updatedProduct = await Products.findByIdAndUpdate({ _id: pid }, update, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(404).json("product not found");
        console.log(error);
    }
};




exports.removeProduct=async(req,res)=>{
    console.log('inside remove product');
    const {pid}=req.params
    try{
        const productDetails=await Products.findByIdAndDelete({_id:pid})
        if(productDetails){
        res.status(200).json(productDetails)
        }
        else{
            res.status(402).json('product not found')
        }
    }catch(err){
        res.status(401).json(err)
    }
}
