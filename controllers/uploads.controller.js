const path = require('path');
const fs = require('fs');

const {response} = require('express');
const {v4:uuidv4} = require('uuid');
const { actualizarImagen } = require('../helpers/actualizarImg');

const fileUpload = (req,res= response) =>{

    const tipo = req.params.tipo;
    const id = req.params.id;
    
    const tipoValidos = ['hospitales','medicos','usuarios'];
    if(!tipoValidos.includes(tipo)){
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario u hospital (tipo)'
        });
    }

    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).send({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extension = nombreCortado[nombreCortado.length -1];

    const extensionesValidas = ['png','jpg','jpeg','gif'];

    if(!extensionesValidas.includes(extension)){
        return res.status(400).send({
            ok: false,
            msg: 'Extensión inválida'
        });
    }
    const nombreArchivo = `${uuidv4()}.${extension}`;
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    file.mv(path, (err)=>{
        if(err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        actualizarImagen(tipo,id, nombreArchivo);
        
    res.json({
        ok:true,
        msg: 'Archivo cargado',
        nombreArchivo
    })
    })



}
    const retornaImagen = (req,res = response) =>{
        const tipo = req.params.tipo;
        const foto = req.params.foto;

        const pathImg = path.join(__dirname,`../uploads/${tipo}/${foto}`);

        //img por defecto
        if(fs.existsSync(pathImg)){

            res.sendFile(pathImg);
        }
        else{
            const pathImg = path.join(__dirname,`../uploads/no-img.jpg`);
            res.sendFile(pathImg);
        }
    }
module.exports = {
    fileUpload,
    retornaImagen
}