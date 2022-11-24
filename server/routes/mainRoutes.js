import express from "express";

//aqui se importan los controladores
// import { loginUser, getUser } from "../controllers/loginControllers.js";

//inicializo la ruta
const router = express.Router();

//AQUI INICIO LAS RUTAS

//ROUTE DE LOGGEO DE USUARIO
//Creación de la sesión
router.post("/login", (req, res) => {
  try {
    if (req.session.contador) {
      req.session.contador++;
      res.send(req.session);
    } else {
      console.log("creando");
      req.session.contador = 1;
      req.session.name = req.body.username;
      req.session.status = "success";
      console.log(req.session.name);
      req.session.save(() => {
        console.log(req.session);
        res.status(200).send(req.session)
      });
    }
  } catch (e) {
    res.status(500).json({ status: 'error', message: 'Algo salio mal al hacer login' });
  }
});
// Destruyo la sesion

router.get('/logout', (req, res) => {
    try {
      res.clearCookie('currentSession');
      req.session.destroy();
      res.status(200).json({
        status: 'success',
        message: 'Session cerrada',
      });
    } catch (e) {
        res.status(500).json({ status: 'error', message: 'Algo salio mal al hacer logout' });
    }
})

//Llamo al user en sesion

router.get("/user", (req, res) => {
  res.status(200).json({name:req.session.name});
});

export default router;
