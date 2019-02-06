"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = require("./usuario");
class UsuariosLista {
    constructor() {
        this.lista = [];
    }
    // Agregar un usuario
    agregar(usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }
    actualizarNombre(id, nombre) {
        this.lista.map(usuario => {
            if (usuario.id === id) {
                usuario.nombre = nombre;
            }
        });
        console.log('======================= Actualizando Usuario =======================');
        console.log(this.lista);
    }
    obtenerLista() {
        return this.lista.filter(user => user.nombre !== 'sin-nombre');
    }
    obtenerUsuario(id) {
        return this.lista.find(usuario => usuario.id === id);
    }
    obtenerUsuarioSala(sala) {
        return this.lista.filter(usuario => usuario.sala === sala);
    }
    borrarUsuario(id) {
        const tempUsuario = this.lista.find(usuario => usuario.id === id) || new usuario_1.Usuario('x');
        console.log('');
        console.log(`Se elimino el usuario ${tempUsuario.nombre}`);
        console.log('');
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        return tempUsuario;
    }
}
exports.UsuariosLista = UsuariosLista;
