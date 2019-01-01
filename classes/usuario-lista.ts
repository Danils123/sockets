import { Usuario } from './usuario';
export class UsuariosLista{
    private lista:Usuario[];
    
    constructor(){
        this.lista = [];
    }

    // Agregar un usuario
    public agregar(usuario:Usuario){
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    public actualizarNombre(id:string, nombre:string){
        this.lista.map(usuario => {
            if(usuario.id === id){
                usuario.nombre = nombre;
            }
        })

        console.log('======================= Actualizando Usuario =======================');
        console.log(this.lista);
    }

    public obtenerLista(){
        return this.lista;
    }

    public obtenerUsuario(id: string){
        return this.lista.find(usuario => usuario.id === id);
    }

    public obtenerUsuarioSala(sala: string){
        return this.lista.filter(usuario => usuario.sala === sala )
    }

    public borrarUsuario(id: string){
        const tempUsuario = this.lista.find(usuario => usuario.id === id) || new Usuario('x');
        console.log('');
        console.log(`Se elimino el usuario ${tempUsuario.nombre}`);
        console.log('');
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        return tempUsuario;
    }
}