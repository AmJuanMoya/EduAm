import { Router } from "express";
import conectionDB from "../../model/database/conectionDB.js";

const router = Router();

router.get("/recursos", async (req, res) => {
  const db = new conectionDB();
  try {
    await db.connect();
    const query = `SELECT id_recurso, nombre_recurso FROM t_recursos`;
    await db.consultar(query);
    const recursos = db.getData();
    await db.cerrar();
    res.json(recursos);
  } catch (err) {
    console.error("❌ Error al obtener recursos:", err.message);
    res.status(500).json({ error: "Error al obtener recursos" });
  }
});

export default router;
