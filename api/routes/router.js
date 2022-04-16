const {Router} = require('express');
const router = Router();
const bd = require('../config/config')
const { QueryTypes } = require('sequelize');
const Product = require('../models/products')
const Sequelize  = require('sequelize')
const Op = Sequelize.Op
router.get('/categories', async (req,res) => {
    const categories = await bd.query("SELECT * FROM `category`", { type: QueryTypes.SELECT });

    res.status(200).json(categories)
})
router.get('/products', async (req,res)=>{
    const products = await bd.query("SELECT * FROM `product`", { type: QueryTypes.SELECT });
    res.json(products)
})
router.get(`/categories/:id`, async (req,res) => {
    const id = req.params.id;
    const productsPerCat = await bd.query(`SELECT * FROM product where category = ${id}`,{ type: QueryTypes.SELECT, bind:['active']})
    res.json(productsPerCat)
})
router.get(`/products/:search`, async (req,res) => {
    const search = req.params.search;
    Product.findAll({
        where:{name:{[Op.like]: '%' + search + '%'}}})
        .then(res => res.json())
    const productsPerCat = await bd.query(`SELECT * FROM product where name = "${search}"`,{ type: QueryTypes.SELECT, bind:['active']})
    res.json(productsPerCat)
})


module.exports = router;