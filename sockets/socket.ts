import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/usuario';
import { Mensaje } from '../interfaces/mensaje.interface';


export const conectarCliente = (cliente: Socket)=>{
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const desconectar = ( cliente: Socket ) => {

    cliente.on('disconnect', () => {
        usuariosConectados.borrarUsuario(cliente.id);
    });

}


// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('mensaje', (  payload: Mensaje  ) => {

        console.log('Mensaje recibido', payload );
        payload.uid = cliente.id;
        io.emit('mensaje-nuevo', payload );

    });

}



// Escuchar login
export const confgurar_usuario = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('configurar-usuario', (  payload: { nombre: string }, callback: Function  ) => {

        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        
        callback({
            ok:true,
            usuario: usuariosConectados.obtenerUsuario(cliente.id)
        });
    });

}

export const usuariosConectados = new UsuariosLista();
