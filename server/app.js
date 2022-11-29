import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from 'connect-mongo'; 
import bCrypt from 'bcrypt';
import Usuario from "./DAOs/usuarios.dao.class.js";
import UsuariosSchema from './models/usuarios.model.js';

//aqui importo el sistema de ruteo
import mainRoutes from "./routes/mainRoutes.js";

//passport imports
import passport from "passport";
import { Strategy } from "passport-local";

const uriMongo = 'mongodb+srv://omarurregodev:oturrego0712@normalizrcluster.u64wunr.mongodb.net/?retryWrites=true&';
const localStrategy = Strategy;

const usuario = new Usuario();

const app = express();
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());
app.use(session({
  //MongoStorage
  store: MongoStore.create({
    mongoUrl:'mongodb+srv://omarurregodev:oturrego0712@normalizrcluster.u64wunr.mongodb.net/?retryWrites=true&',
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

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST",
    credentials: true,
  })
);

//middleware passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

//estrategias passport
passport.use(
  "register",
  new localStrategy(
    { passReqToCallback: true},
    async (req, username, password, done) => {
      console.log("register", username + password);
      mongoose.connect(uriMongo);
      try {
        console.log(req.body.name ,
          req.body.lastName,
          username,
          req.body.direccion,
          createHash(password));

        UsuariosSchema.create(
          {
            name:req.body.name ,
            lastName: req.body.lastName,
            username: username,
            direccion: req.body.direccion,
            password: createHash(password)
          },
          (err, userWithId) => {
            if (err) {
              return done(err, null);
            }
            return done(null, userWithId);
          }
        )
      } catch (e) {
        return done(e, null);
      }
    }
  )
)
// passport.use('register', new localStrategy({passReqToCallback: true}, async (req, username, password, done) => {
//   console.log(req.body, username, password);
//   const userArr = await usuario.listUsers();
//   const exist = userArr.find((usuario) => {
//       return usuario.username == username;
//   });
//   if (exist) {
//     return done(null, false)
//   } else {
//     const newUser = await usuario.newUser(req.body);
//     return done(null, newUser);
//   }
// }));

passport.use('login', new localStrategy((username, password, done) => {
  const exist = usuarios.find((usuario) => {
      return usuario.nombre == username && usuario.password == password;
  });
  if (!exist) {
      return done(null, false);
  } else {
      return done(null, exist);
  }
}));

// funciones para serializar y deserializar

passport.serializeUser((usuario, done) => {
  console.log(usuario);
  done(null, usuario._id);
});

passport.deserializeUser((id, done) => {
  UsuariosSchema.findById(id, done);
})

// passport.deserializeUser(async (id, done) => {
//   await usuario.listUsersByID(id)
//   .then((dbUser) => {
//     done(null, dbUser);
//   })
//   .catch((err) => {
//     done(err);
//   });
// });

function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
