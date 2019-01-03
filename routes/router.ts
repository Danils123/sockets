import { Router, Request, Response } from 'express';
import { Mensaje } from '../interfaces/mensaje.interface';
import { mensaje, usuariosConectados } from '../sockets/socket';
import Server from '../classes/server';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: 'Todo esta bien!!'
  });
});

router.post('/mensajes', (req: Request, res: Response) => {
  const payload: Mensaje = {
    nombre: req.body.nombre,
    mensaje: req.body.mensaje,
    uid: req.body.id
  };

  const server = Server.instance;
  server.io.emit('mensaje-nuevo', payload);

  res.json({
    ok: true,
    mensaje: payload
  });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
  const payload: Mensaje = {
    nombre: req.body.nombre,
    mensaje: req.body.mensaje,
    uid: req.body.id
  };

  const server = Server.instance;
  server.io.to(payload.uid || '0').emit('mensaje-privado', payload);

  res.json({
    ok: true,
    mensaje: payload
  });
});

// Servicio para obtener todos los ids de los usuario

router.get('/usuarios', (req: Request, res: Response) => {
  const payload: any = {
    uid: req.body.id
  };

  const server = Server.instance;
  server.io.clients((err: any, clientes: string) => {
    if (err) {
      res.json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      clientes
    });
  });
});

// obtener usuario y sus nombres
router.get('/usuarios/detalle', (req: Request, res: Response) => {
  res.json({
    ok: true,
    usuarios: usuariosConectados.obtenerLista()
  });
});

export default router;
