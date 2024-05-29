const Category=require('../model/categoryModel')

exports.createCategory=async(req,res)=>{
    const{name}=req.body
   try{
    const category=await Category.create({name})
    res.status(201).json(category)
    }catch(err){
        res.status(401).json(err)
        console.log(err);
    }

}
exports.getallCategories=async(req,res)=>{
    try {
        const categories=await Category.find()
        res.status(200).json(categories)
        
    } catch (error) {
        res.status(401).json(error)
        
    }
}
const getCategoryById = async (req, res) => {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new ApiError(404, "Category does not exist");
    }
    return res
      .status(200)
      .json( category, "Category fetched successfully")
  };