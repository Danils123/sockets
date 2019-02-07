"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Usuario {
    constructor(id, nombre = 'sin-sala', sala = 'sin-sala') {
        this.id = id;
        this.nombre = nombre;
        this.sala = sala;
    }
}
exports.Usuario = Usuario;
