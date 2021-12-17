const mongoose = require("mongoose");
const {Schema,model}=mongoose;

const materiaSchema = new Schema({
    nombre:{
        type:"string",
        required:true,
    },
    descripcion:{
        type:"string",
        required:true,
    },
    cod:{
        type:"string",
        required:true,
    },
    unidad_medida:{
        type:"string",
        required:true,
    },
    cantidad_disponible:{
        type:"number",
        required:true,
    },
    valor_unitario:{
        type:"number",
        required:true,
    }

});
const materiaModels= model("materias",materiaSchema);
exports.materiaModels=materiaModels;

