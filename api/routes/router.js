const {Router} = require('express');
const router = Router();
const bd = require('../config/config')

router.get('/',(req,res)=>{
    res.status(200).json({
        message: "Este mensaje viene del server"
    })
})

module.exports = router;