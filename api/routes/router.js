const {Router} = require('express');
const router = Router();
const bd = require('../config/config')
const { QueryTypes } = require('sequelize');
const Product = require('../models/products')
const Category = require('../models/category')
const Sequelize  = require('sequelize');
const { response } = require('express');
const Op = Sequelize.Op

router.get('/categories', async (req,res) => {
    try {
        const categories2 = await Category.findAll();
        res.status(200).json(categories2)
    } catch (error) {
        
    }
});
router.get('/products', async (req,res)=>{
    const products = await Product.findAll();
    res.json(products)
});
router.get(`/categories/:id`, async (req,res) => {
    
    try {
        const id = req.params.id;
        const productsPerCat2 = await Product.findAll({where:{category:id}})
        res.json(productsPerCat2)
    } catch (error) {
        
    }
    
});
router.get(`/products/search/:search`, async (req,res) => {
    const search = req.params.search;
    const searchProduct = await Product.findAll({ where: { name: {[Op.like]: '%' + search + '%' } } });
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