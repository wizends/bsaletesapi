/**Llamamos a todos los modulos necesarios, en este caso utilizare express y el operacional de Sequelize */

const {Router} = require('express');//destructuring al nodo de express
const router = Router();// instanciamos el router
//traemos los modelos
const Product = require('../models/products')
const Category = require('../models/category')
const Sequelize  = require('sequelize');
const Op = Sequelize.Op;


//****Aqui estaran todos los endpoints*********////////////
router.get('/pageQuantity', async (req,res) => {//endpoint que consulta a la base de datos la cantidad de productos existentes
    const quantity = await Product.findAndCountAll({
        limit:0,
        offset:0
    });
    res.json(quantity.count)
})

router.get('/categories', async (req,res) => {//obtiene todas las categorias 
    try {
        const categories2 = await Category.findAll();//utilizamos findall de Sequelize, esto genera una consulta select dentro de la bd y obtiene todas las categorias
        res.status(200).json(categories2)//enviamos la respuesta mediante el parametro res, ademas esperamos un status de 200
    } catch (error) {//capturamos el error
        console.log(error)//lo imprimimos en la consola
    }
});
router.get('/products', async (req, res) => {//obtiene todos los productos sin paginacion
    const allProducts = await Product.findAll();
    res.json(allProducts)
});
router.get('/products/page', async (req,res)=>{//obtiene los todos los productos paginados
    const {page,limit} = req.query;//hacemos destructuring a la query recibida por la url donde viene page y limit
    const products = await Product.findAndCountAll({//utilizamos findandcountall lo que traerla una respuesta mas elaborada, la cual servira para dividir la query dependiendo los parametros que le pasemos 
        limit:parseInt(limit),//le mandamos el limit obtenido de la url
        offset:parseInt(page * limit)// y mandamos el offset, el cual ira de un numero a otro, esto quiere decir que si le pasamos un 1 mostrara los productos que le indiquesmos y al cambiar de offset a 2 mostrara el limit + 1, por este mostivo se multiplica para obtener el resultado paginado
    });
    res.json([products])// se devuelve la respuesta en este caso un array que contiene nuestra response

});
router.get(`/categories/:id`, async (req,res) => {//obtiene productos agrupados por categorias 
    
    try {
        const id = req.params.id;//aqui utilizamos el bindeo mediante parametros enviados directamente por la url y los guardamos en una variable id 
        const productsPerCat2 = await Product.findAll({
            where:{category:id},
        });// traemos todos los productos cuando su category sea igual al id recibido en los params
        res.json(productsPerCat2)
    } catch (error) {
        console.log(error)
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