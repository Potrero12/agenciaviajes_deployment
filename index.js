import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

//conectar la base de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch(error => console.log(error));

//definir el puerto
const port = process.env.PORT || 4000

//habilitar pug
app.set('view engine', 'pug');

// Obtener el año actual
app.use( (req, res, next) => {
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes'
    next();
});

//agregar body-parser
app.use(express.urlencoded({extended: true}));

//definir la carpeta publica
app.use(express.static('public'));

//agregar router
app.use('/', router);

//puerto y host para la app
const host = process.env.HOST || '0.0.0.0';

//arrancar el servidor
app.listen(port, host, () => {
    console.log(`El servidor esta funcionando correctamente en el puerto ${port} y en el host ${host}`);
});