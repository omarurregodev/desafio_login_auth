import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from 'connect-mongo'; 

//aqui importo el sistema de ruteo
import mainRoutes from "./routes/mainRoutes.js";

const app = express();
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true};
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(session({
  //MongoStorage
  store: MongoStore.create({
    mongoUrl:'mongodb+srv://omarurregodev:oturrego0712@normalizrcluster.u64wunr.mongodb.net/?retryWrites=true&w=majority',
    mongoOptions: advancedOptions
  }),
  key: 'currentSession',
  secret: 'its my secret',
  cookie: { 
    maxAge: 1000 * 60 * 10,
   }, // value of maxAge is defined in milliseconds. 
  resave: false,
  saveUninitialized: false,
}));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});




app.use("/api", mainRoutes);



// enabilito los PORT con un limite de subida de 30MB


// aqui tienes que hacer tu base de datos cloud.mongodb.com
// variable de contrasenia de prefencia en archivo .ENV

// const CONNECTION_URL =
//   "mongodb+srv://GLinares:admin123@mern.yktji.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//puerto donde se va a contruir
const PORT = process.env.PORT || 8000;

//inicializo la base de datos y si se puede conectar corre servidor
// mongoose
//   .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() =>
//   )
//   .catch((error) => console.log(error.message));

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
