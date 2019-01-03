import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/usuario';
import { Mensaje } from '../interfaces/mensaje.interface';
import Server from '../classes/server';

export const conectarCliente = (cliente: Socket, io: socketIO.Server) => {
  const usuario = new Usuario(cliente.id);
  usuariosConectados.agregar(usuario);
};

export const desconectar = (cliente: Socket, io: socketIO.Server) => {
  cliente.on('disconnect', () => {
    usuariosConectados.borrarUsuario(cliente.id);
    io.emit('usuarios-activos', usuariosConectados.obtenerLista());
  });
};

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
  cliente.on('mensaje', (payload: Mensaje) => {
    console.log('Mensaje recibido', payload);
    payload.uid = cliente.id;
    io.emit('mensaje-nuevo', payload);
  });
};

// Escuchar login
export const configurar_usuario = (cliente: Socket, io: socketIO.Server) => {
  cliente.on(
    'configurar-usuario',
    (payload: { nombre: string }, callback: Function) => {
      usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
      io.emit('usuarios-activos', usuariosConectados.obtenerLista());
      callback({
        ok: true,
        usuario: usuariosConectados.obtenerUsuario(cliente.id)
      });
    }
  );
};

// Escuchar usuarios conectados
export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {
  cliente.on('obtener-usuarios', () => {
    io.to(cliente.id).emit(
      'usuarios-activos',
      usuariosConectados.obtenerLista()
    );
  });
};

export const usuariosConectados = new UsuariosLista();
