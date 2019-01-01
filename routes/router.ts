
import { Router, Request, Response } from 'express';
import { Mensaje } from '../interfaces/mensaje.interface';
import { mensaje } from '../sockets/socket';
import Server from '../classes/server';

const router = Router();



router.get('/mensajes', ( req: Request, res: Response  ) => {

    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    });

});

router.post('/mensajes', ( req: Request, res: Response  ) => {

   
    const payload: Mensaje = {
        nombre: req.body.nombre,
        mensaje: req.body.mensaje,
        uid: req.body.id
       }
    
       const server = Server.instance;
       server.io.emit('mensaje-nuevo', payload);
       
        res.json({
            ok: true,
            mensaje: payload
        });
});


router.post('/mensajes/:id', ( req: Request, res: Response  ) => {

   const payload: Mensaje = {
    nombre: req.body.nombre,
    mensaje: req.body.mensaje,
    uid: req.body.id
   }

   const server = Server.instance;
   server.io.in( payload.uid ).emit('mensaje-privado', payload);
   
    res.json({
        ok: true,
        mensaje: payload
    });

});



export default router;


