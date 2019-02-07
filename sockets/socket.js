"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_lista_1 = require("../classes/usuario-lista");
const usuario_1 = require("../classes/usuario");
exports.conectarCliente = (cliente, io) => {
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
};
exports.desconectar = (cliente, io) => {
    cliente.on('disconnect', () => {
        exports.usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', exports.usuariosConectados
            .obtenerLista()
            .filter(usuario => usuario.id !== cliente.id));
    });
};
// Escuchar mensajes
exports.mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        console.log('Mensaje recibido', payload);
        payload.uid = cliente.id;
        io.emit('mensaje-nuevo', payload);
    });
};
// Escuchar login
exports.configurar_usuario = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        exports.usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', exports.usuariosConectados.obtenerLista());
        callback({
            ok: true,
            usuario: exports.usuariosConectados.obtenerUsuario(cliente.id)
        });
    });
};
// Escuchar usuarios conectados
exports.obtenerUsuarios = (cliente, io) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', exports.usuariosConectados
            .obtenerLista()
            .filter(usuario => usuario.id !== cliente.id));
    });
};
exports.usuariosConectados = new usuario_lista_1.UsuariosLista();
