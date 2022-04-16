const {Router} = require('express');
const router = Router();
const bd = require('../config/config')
const { QueryTypes } = require('sequelize');

router.get('/products', async (req,res)=>{
    const products = await bd.query("SELECT * FROM `product`", { type: QueryTypes.SELECT });
    res.status(200).json(products)
})

module.exports = router;