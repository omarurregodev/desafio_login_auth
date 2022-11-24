//import la base de datos
import fs from "fs";

export const loginUser = (req, res) => {
  // guardar datos en JSON data
  // fs.writeFile("./Data/Data.json", JSON.stringify(body, null, 2), (error) => {
  //   if (error) {
  //     console.log("An error has occurred ", error);
  //     return;
  //   }
  //   console.log("Data written successfully to disk");
  // });
  // res.status(200).json({ mesage: "success" });
  if (req.session.views) {
    // Increment the number of views.
    req.session.views++;

    // Session will expires after 1 min
    // of in activity
    res.write(
      "<p> Session expires after 1 min of in activity: " +
        req.session.cookie.expires +
        "</p>"
    );
    res.end();
  } else {
    req.session.views = 1;
    req.session.username = req.body.username;
    res.end(" New session is started" + req.session.username);
  }
  // if (req.session.contador) {
  //   req.session.contador++;
  //   res.send(
  //     `Hola ${req.session.username} visitaste la pagina ${req.session.contador} veces`
  //   );
  // } else {
  //   req.session.contador = 1;
  //   req.session.username = req.body.username;
  //   console.log(req.session.contador);
  //   res.send(`Bienvenido ${req.session.username}`);
  // }
};

//Creo la sesion

export const getUser = (req, res) => {
  fs.readFile("./Data/Data.json", "utf8", (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    res.status(200).json(JSON.parse(data));
  });
};
