const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res=response)=>{
    const {email, password} = req.body;
try {

    const usuarioDB = await Usuario.findOne({email});
    if(!usuarioDB){
        return res.status(404).json({
            ok: false,
            msg: 'Credenciales incorrectas'
        });
    }
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if(!validPassword){
        return res.status(400).json({
            ok: false,
            msg: 'Credenciales Incorrectas.'
        });
    }

    const token =await generarJWT(usuarioDB.id);

    res.json({
        ok: true,
        token})
} catch (error) {
    console.log(error);
    res.status(400).json({
        ok: false,
        msg: 'Hable con el administrador'
    })
}
}

const googleSignIn = async(req,res =response) => {
    const googleToken = req.body.token;
    try {
        const {name, email, picture} = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({email});
        let usuario; 

        if(!usuarioDB){
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        }else{
            usuario = usuarioDB;
            usuario.google = true;
        }

        await usuario.save();

        const token =await generarJWT(usuario.id);

        res.status(200).json({
            ok: true,
           token
        })
    } catch (error) {
        
        res.status(401).json({
            ok: false,
            msg:'Token incorrecto',
        })
        
    }

}

const renewToken = async(req,res=response) => {
    const uid = req.uid;
    
    const token =await generarJWT(uid);
    
    res.json({
        ok:true,
        token
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}