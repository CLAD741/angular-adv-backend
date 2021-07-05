/*
/api/usuarios
*/


const {Router} = require('express');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuario.controller');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarAdminRole, validarAdminRoleoMismoUser } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',validarJWT,getUsuarios);

router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        validarCampos
    ] 
    ,crearUsuario );

router.put('/:id',
[
    validarJWT,
    validarAdminRoleoMismoUser,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos
]
, actualizarUsuario )

router.delete('/:id',[validarJWT, validarAdminRole],borrarUsuario);

module.exports = router;