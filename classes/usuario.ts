export class Usuario {
    public id:string;
    public nombre?:string;
    public sala: string;
    constructor(id:string, nombre:string = 'sin-sala', sala:string = 'sin-sala'){
        this.id = id;
        this.nombre = nombre;
        this.sala = sala;
    }
}