//llamamos las librerias necesarias 
const express = require('express');
const morgan = require('morgan');//morgan por alguna caso de excalabilidad
const cors = require('cors');//cors para el tema de la cors policy 
const app = express();// para utilizar express

const port = 3004;//definimos el puerto que queremos utilizar 

app.use(express.json({//utilizamos express y fijamos que los archivos json no superen el mb por achivo 
    limit: '1mb'
}
));

const router = require('../routes/router')//traemos nuestro router 


/**Configuraciones */
app.use(cors());//instanciamos el cors a modo global 

const port_number = app.listen(process.env.PORT || port);// utilizamos el puerto antes seleccionado en el caso de local host, pero si se aloja en un server el proccess.env.port se encargara de escoger el que se asigne, en caso de heroku es dinamico por lo que iria variando
app.listen(port_number);//escuchamos el puerto indicado, ya sea el dinamico o el asignado localmente
app.use(morgan('dev'));// utilizamos morgan como desarrollador
app.use(express.json());//volvemos a instanciar express en caso de fallo al mb 
app.use(express.urlencoded({extended:false}));//utilizamos el url encoded si es que en algun caso hayan datos delicados

app.use(router)//ocupamos nuestro router 

app.keepAliveTimeout = 30 * 1000;//tecnica de keepalive
app.headersTimeout = 35 * 1000;