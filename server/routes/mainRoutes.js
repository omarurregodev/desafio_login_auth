import express from "express";
import mongoose from "mongoose";
import Usuario from "../DAOs/usuarios.dao.class.js";

//aqui se importan los controladores
// import { loginUser, getUser } from "../controllers/loginControllers.js";

//inicializo la ruta
const router = express.Router();

const usuario = new Usuario();

//AQUI INICIO LAS RUTAS

//ROUTE DE LOGGEO DE USUARIO
//Creación de la sesión
router.post("/login", async (req, res) => {
  const userArr = await usuario.listUsers();
  const userValido = await userArr.find((user) => user.username === req.body.username && user.password === req.body.password);
  
  try {
    if (userValido) {
      req.session.contador = 1;
      req.session.name = req.body.username;
      req.session.status = "success";
      console.log(req.session.name);
      req.session.save(() => {
        console.log(req.session);
        res.status(200).send(req.session)
      });
    } else {
      req.session.contador++;
      res.send(req.session);
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

// Registro de usuario

router.post("/register", async (req, res) => {
  try {
    const newUser = await usuario.newUser(req.body);
    res.status(200).send(newUser);
  } catch (err) {
    res.status(500).json({error: err.message});
  }

});

export default router;
