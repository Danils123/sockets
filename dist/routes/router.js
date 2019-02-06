"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const socket_1 = require("../sockets/socket");
const server_1 = __importDefault(require("../classes/server"));
const router = express_1.Router();
router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    });
});
router.post('/mensajes', (req, res) => {
    const payload = {
        nombre: req.body.nombre,
        mensaje: req.body.mensaje,
        uid: req.body.id
    };
    const server = server_1.default.instance;
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        mensaje: payload
    });
});
router.post('/mensajes/:id', (req, res) => {
    const payload = {
        nombre: req.body.nombre,
        mensaje: req.body.mensaje,
        uid: req.body.id
    };
    const server = server_1.default.instance;
    server.io.to(payload.uid || '0').emit('mensaje-privado', payload);
    res.json({
        ok: true,
        mensaje: payload
    });
});
// Servicio para obtener todos los ids de los usuario
router.get('/usuarios', (req, res) => {
    const payload = {
        uid: req.body.id
    };
    const server = server_1.default.instance;
    server.io.clients((err, clientes) => {
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
router.get('/usuarios/detalle', (req, res) => {
    res.json({
        ok: true,
        usuarios: socket_1.usuariosConectados.obtenerLista()
    });
});
exports.default = router;
