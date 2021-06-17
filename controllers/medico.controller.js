const { response } = require("express")
const Medico = require('../models/medico');
const getMedicos = async (req, res=response)=>{

    const medicos =await  Medico.find().populate('usuario','nombre')
                                .populate('hospital','nombre')
    res.json({
        ok:true,
        medicos
    });
}
const createMedico = async(req, res=response)=>{

    const uid = req.uid;
    const medico = new Medico(
        {
            usuario:uid,
            ...req.body
        });
    try {
        
        const medicoDB = await medico.save();
        res.json({
            ok:true,
            medico: medicoDB
        });
    } catch (error) { 
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        });
    }
    
}
const updateMedico = (req, res=response)=>{

    res.json({
        ok:true,
        msg:'Update Medico'
    });
}
const deleteMedico = (req, res=response)=>{

    res.json({
        ok:true,
        msg:'Delete Medico'
    });
}

module.exports ={
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico
}