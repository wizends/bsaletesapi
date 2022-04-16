const {Router} = require('express');
const router = Router();
const bd = require('../config/config')
const { QueryTypes } = require('sequelize');

router.get('/categories', async (req,res) => {
    const categories = await bd.query("SELECT * FROM `category`", { type: QueryTypes.SELECT });

    res.status(200).json(categories)
})
router.get('/products', async (req,res)=>{
    const products = await bd.query("SELECT * FROM `product`", { type: QueryTypes.SELECT });
    res.json(products)
})

module.exports = router;