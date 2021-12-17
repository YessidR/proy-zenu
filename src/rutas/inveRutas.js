const {Router}=require("express");
const {materiaModels}=require("../modelos/materiaModels");
const inveRutas=Router();


inveRutas.post("/ingresar",(req,res)=>{
    const data=req.body;
    const ingresar=new materiaModels(data);
    ingresar.save(function(error){
        if(error){
            return res.send({estado:"error",msg:"Error: no se pudo registrar la materia prima"});
        }
        res.send({estado:"ok",msg:"Registrado con exito :)"});
    })
});

inveRutas.get("/consultar",(req,res)=>{
    try {
        materiaModels.find({}, function (error, materias) {
            if(error){
                return res.status(404).send({ estado: "Error", msg: "Listado de  materia no encontrado"});
            }else{
                if(materias!== null){
                    return res.status(200).send({ estado: "ok", msg: "Listado de  Ventas", data: materias });
                }
                return res.status(200).send({ estado: "Error", msg: "Listado de materias no se encuentra"});
                
            }
            
            });
    } catch (error) {

    }
});

exports.inveRutas=inveRutas;