import express from "express";
import t_rol from "../../model/t_rol.js";

const router = express.Router();
const Rol = new t_rol();




router.get("/roles", async (req, res) => {
    // res.json({"mensaje": "Lista de roles"})
    // console.log("Se ha solicitado la lista de roles");
    try{
        const roles = await Rol.obtenerTodosRoles();
        res.json(roles);
        console.log("Se enviaron los roles efectivamente");
    }catch(err){
        console.log("Error al obtener los roles: ", err);
        res.status(500).json({ error: 'Error al obtener los roles' });
    }


})


export default router;
