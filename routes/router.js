const {Router} = require('express');
const router = Router();
const Product = require('../models/products')
const Category = require('../models/category')
const Sequelize  = require('sequelize');
const Op = Sequelize.Op;

router.get('/pageQuantity', async (req,res) => {
    const quantity = await Product.findAndCountAll({
        limit:0,
        offset:0
    });
    res.json(quantity.count)
})

router.get('/categories', async (req,res) => {
    try {
        const categories2 = await Category.findAll();
        res.status(200).json(categories2)
    } catch (error) {
        
    }
});
router.get('/products/page', async (req,res)=>{
    const {page,limit} = req.query;
    const products = await Product.findAndCountAll({
        limit:parseInt(limit),
        offset:parseInt(page * limit)
    });
    res.json([products])

});
router.get(`/categories/:id`, async (req,res) => {
    
    try {
        const id = req.params.id;
        const productsPerCat2 = await Product.findAll({
            where:{category:id},
        });
        res.json(productsPerCat2)
    } catch (error) {
        
    }
    
});
router.get(`/products/search/:search`, async (req,res) => {
    const search = req.params.search;
    const searchProduct = await Product.findAll({ 
        where: { name: {[Op.like]: '%' + search + '%' } },
    });
    res.json(searchProduct)
});
router.get(`/products/filter/:filter`, async (req,res) => {
    const filter = req.params.filter;
    if (filter == 'price') {
        const filterByPrice = await Product.findAll({
            order: [
                ['price','ASC']
            ]
        })
    res.json(filterByPrice)
    }else{
        const filterByAbc = await Product.findAll({
            order: [
                ['name','ASC']
            ]
        })
    res.json(filterByAbc)
    }
    
});

module.exports = router;