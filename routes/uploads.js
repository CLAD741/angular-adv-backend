/* api/upload/usuarios/123 */

const {Router} = require('express');
const { fileUpload, retornaImagen } = require('../controllers/uploads.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const expressFileUpload = require('express-fileupload');


const router = Router();
router.use(expressFileUpload());

router.put('/:tipo/:id',[
    validarJWT
],fileUpload)

router.get('/:tipo/:foto',retornaImagen)

module.exports = router;