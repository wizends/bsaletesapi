
const express = require('express');
const morgan = require('morgan');
//const cors = require('cors')
const app = express();

app.use(express.json({
    limit: '1mb'
}
));

const router = require('../routes/router')

/**Configuraciones */
//app.use(cors());

app.set('port',3004);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(router)


const server = app.listen(app.get('port'), () => {
    console.log("Server status 200 on port 3004")
})
server.keepAliveTimeout = 30 * 1000;
server.headersTimeout = 35 * 1000;