
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

const port_number = server.listen(process.env.PORT || 3000);
app.listen(port_number);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(router)

server.keepAliveTimeout = 30 * 1000;
server.headersTimeout = 35 * 1000;