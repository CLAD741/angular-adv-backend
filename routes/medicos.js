/*
 /api/medico
*/ 

/* /api/hospitales */



const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico
} = require('../controllers/medico.controller');

const router = Router();

router.get('/',getMedicos);

router.post('/',
    [   
        validarJWT,
        check('nombre','El nombre del medico es obligatorio').not().isEmpty(),
        check('hospital','El id del hospital debe ser válido').isMongoId(),
        validarCampos
    ] 
    ,createMedico );

router.put('/:id',
    [
        validarJWT,
        check('nombre','El nombre del medico es obligatorio').not().isEmpty(),
        check('hospital','El id del hospital debe ser válido').isMongoId(),
        validarCampos
    ]
, updateMedico )

router.delete('/:id',deleteMedico);

module.exports = router;