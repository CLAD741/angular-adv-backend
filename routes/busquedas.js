/* /api/todo/:busqueda */

const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {searchCollections, getCustomSearch}  =require('../controllers/busqueda.controller');

const router = Router();

router.get('/:busqueda',[
    validarJWT
],searchCollections)

router.get('/coleccion/:tabla/:busqueda', validarJWT, getCustomSearch)

module.exports = router;