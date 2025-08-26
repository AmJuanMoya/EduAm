import express from 'express';
import Example from '../../controller/c_example.js';

const exm = new Example
 

const router = express.Router();

// Ruta de prueba que devuelve "hola mundo"
router.get('/', (req, res) => {
    res.json({ message: "hola mundo" });
});


router.get("/ex_c", (req, res)=>{
    try{
    exm.setMessage("Hola hola Am")
    exm.setStatustool(213)
    res.json(exm.responseM())
    console.log("todo okey")
    }catch(err){
        console.log("algo salio mal: ", err)
    }

})

export default router;
