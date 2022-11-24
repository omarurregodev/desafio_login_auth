import mongoose from 'mongoose';
import UsuariosModel from '../models/UsuariosModel.js';

class Usuario {

    constructor() {
        this.url = 'mongodb+srv://omarurregodev:oturrego0712@normalizrcluster.u64wunr.mongodb.net/?retryWrites=true&w=majority';
        this.mongodb = mongoose.connect;
    }
    
    async newUser(name, lastName, username, direccion, password) {
        try {
            await this.mongodb(this.url);
            console.log("entra aqui");
            const crearUsuario = new UsuariosModel(name, lastName, username, direccion, password);
            return await crearUsuario.save();
        } catch (err) {
            throw new Error('No se pudo crear el usuario.');
        }
    }

}

export default Usuario;