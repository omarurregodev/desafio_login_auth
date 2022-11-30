import express from "express";
import mongoose from "mongoose";
import Usuario from "../DAOs/usuarios.dao.class.js";
import passport from "passport";


//inicializo la ruta
const router = express.Router();

const usuario = new Usuario();

//AQUI INICIO LAS RUTAS

//ROUTE DE LOGGEO DE USUARIO
//Creación de la sesión
router.post("/login", passport.authenticate('login', {
  successRedirect: '/api/user',
  failureRedirect: '/api/login-error'
}));

router.get("/login-error", (req, res) => {
  res.status(400).json({status:"No se pudo iniciar sesion!"})
})


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
  res.status(200).json({name:req.session.passport});
});

// Registro de usuario

router.post("/register", passport.authenticate('register', {
  successRedirect: '/api/login',
  failureRedirect: '/api/register'
}));

router.get('/login', (req, res) => {
  res.status(200).json({"message": "Usuario creado con exito!"})
})



export default router;