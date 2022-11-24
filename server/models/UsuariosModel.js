import mongoose from 'mongoose';

const usuariosSchema = mongoose.Schema({

    name: {type: String, require: true},
    lastName: {type: Number, require: true},
    username: {type: String, require: true},
    direccion: {type: String, require: true},
    password: {type: String, require: true}
});

const UsuariosModel = mongoose.model('usuarios', usuariosSchema);

export default UsuariosModel;