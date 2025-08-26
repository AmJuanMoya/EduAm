import express from 'express';



let router = express.Router();

router.post('/matricula/registro', (req, res) => {
  const data = req.body;
  console.log(data);
  // Puedes agregar lógica para mostrar mensaje de éxito/error
  res.json({ message: 'Han llegado los datos al servidor' });
});


export default router;