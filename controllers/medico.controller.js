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
const updateMedico = async (req, res=response)=>{
   
    const id = req.params.id;
    const uid = req.uid;
    try {
        const medico = await Medico.findById(id);
    
        if(!medico){
           return res.status(404).json({
                ok:true,
                msg:'Medico no encontrado'
            });    
        }
        const medicoCambiar = {
            ...req.body,
            usuario: uid
        }
        const medicoUpdate = await Medico.findByIdAndUpdate(id,medicoCambiar, {new:true});
    
    
    
        res.json({
            ok:true,
            medico: medicoUpdate
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg: 'Hable con el administrador'
        });
    }
}
const deleteMedico = async(req, res=response)=>{

    const id = req.params.id;
    try {
        const medico = await Medico.findById(id);
    
        if(!medico){
           return res.status(404).json({
                ok:true,
                msg:'Medico no encontrado'
            });    
        }
      
        await Medico.findByIdAndDelete(id);
    
    
        res.json({
            ok:true,
            msg: 'Medico borrado'
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg: 'Hable con el administrador'
        });
    }
    
}

module.exports ={
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico
}