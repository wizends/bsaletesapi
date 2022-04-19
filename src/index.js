
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const port = 3004;

app.use(express.json({
    limit: '1mb'
}
));

const router = require('../routes/router')


/**Configuraciones */
app.use(cors());

const port_number = app.listen(process.env.PORT || port);
app.listen(port_number);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(router)

app.keepAliveTimeout = 30 * 1000;
app.headersTimeout = 35 * 1000;