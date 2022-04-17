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
})
router.get('/products', async (req,res)=>{
    try {
        const products = await Product.findAll()
        .then(data => {data.map(x => {
            if(x.url_image !== null){
                res.json(data)
            }else{
                console.log("faltan urls")
            }
        })
        })
        

    } catch (error) {
        console.log(error)
    }
    
})
router.get(`/categories/:id`, async (req,res) => {
    
    try {
        const id = req.params.id;
        const productsPerCat2 = await Product.findAll({where:{category:id}})
        res.json(productsPerCat2)
    } catch (error) {
        
    }
    
})
router.get(`/products/:search`, async (req,res) => {
    const search = req.params.search;
    const searchProduct = await Product.findAll({ where: { name: {[Op.like]: '%' + search + '%' } } });
    res.json(searchProduct)
})

module.exports = router;