import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import createListenerPlayerCreate from './connection/createListenerPlayerCreate';
import createListenerDisconnect from './connection/createListenerDisconnect';
import * as dotenv from "dotenv";
import GameInstance from './game/GameInstance';
import cors from "cors";
import bodyParser from "body-parser";
import chat from './api/chat';
import auth from './middlewares/auth';
import lobby from './api/lobby';
import admin from './api/admin';
import adminAuth from './middlewares/adminAuth';

dotenv.config();

const PORT:number = Number(process.env.port) || 3000;
const PUBLIC_API: number = Number(process.env.public_api) || 0;
const ADMIN_KEY: string = process.env.admin_key || "zaq1@WSX";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server: http.Server = http.createServer(app);

const GAME = new GameInstance();

export const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.get('/', (req, res)=>{
    res.send("Oriflamme-Svelte Server 1.0");
});

app.use('/api/chat', chat(GAME, io));
app.use('/api/lobby', lobby(GAME, io));
app.use('/api/admin', admin(GAME, io, ADMIN_KEY));

// Start server
io.on("connection", socket=>{
    console.log(`${socket.id} connected!`);
    createListenerPlayerCreate(socket, GAME.players, GAME, io);
    createListenerDisconnect(socket, GAME.players, GAME.gameState, io);
});

server.listen(PORT, ()=>{
    console.log("-- Oriflamme-Svelte Server 1.0 --");
    console.log(`Listening on *:${PORT}`);
});