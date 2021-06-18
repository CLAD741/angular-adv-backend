const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async(req,res)=>{
    const desde = Number(req.query.desde) || 0;

    /* const usuarios = await Usuario.find({},'nombre email role google')
                                        .skip(desde)
                                        .limit(5);
    const total = await Usuario.count();     */                                    
   const[usuarios, total] = await Promise.all([
        await Usuario.find({},'nombre email role google img')
                                        .skip(desde)
                                        .limit(5),
        await Usuario.countDocuments()                        
    ])
    res.json({
        ok: true,
        usuarios,
        total
    })
}


const crearUsuario = async (req,res = response)=>{
    const {email,password} = req.body;


    try {
        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok: false, 
                msg: 'El correo ya está registrado'
            })
        }
        const usuario = new Usuario(req.body);
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);


        await usuario.save();
        const token= await generarJWT(usuario.id);
        res.json({
            ok:true,
            usuario,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

   
  
}


const actualizarUsuario = async (req,res = response) => {
    const uid = req.params.id;
    
    try {
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }


        const {password, google,email, ...campos} = req.body;
        if(usuarioDB.email !== email){
        
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }
        campos.email = email;
        const userActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});
        
        res.json({
            ok: true,
            msg: 'Se ha actualizado el usuario',
            usuario: userActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const borrarUsuario = async(req, res= response) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }
        await Usuario.findOneAndDelete(uid);
        res.json({
            ok:true,
            msg: 'Usuario eliminado'
        });
        
    } catch (error) {
        
    }
}
module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}