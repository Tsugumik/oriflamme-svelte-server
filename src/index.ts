import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import createListenerSyncChat from './chat/createListenerSyncChat';
import createListenerNewChatMessage from './chat/createListenerNewChatMessage';
import createListenerPlayerCreate from './connection/createListenerPlayerCreate';
import createListenerDisconnect from './connection/createListenerDisconnect';
import * as dotenv from "dotenv";
import GameInstance from './game/GameInstance';

dotenv.config();

const PORT:number = Number(process.env.port) || 3000;
const PUBLIC_API: number = Number(process.env.public_api) || 0;


const app = express();

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

if(PUBLIC_API) {
    app.get('/api/game', async (req, res)=>{
        res.json(GAME);
    });
    app.get('/api/game/players', async (req, res)=>{
        res.json(GAME.players);
    });
    app.get('/api/game/chat', async (req, res)=>{
        res.json(GAME.chat);
    });
    
}

// Start server
io.on("connection", socket=>{
    console.log(`${socket.id} connected!`);
    createListenerPlayerCreate(socket, GAME.players, GAME);
    createListenerDisconnect(socket, GAME.players, GAME.gameState);
    createListenerNewChatMessage(socket, GAME.players, GAME.chat, io);
    createListenerSyncChat(socket, GAME.chat);
});

server.listen(PORT, ()=>{
    console.log("-- Oriflamme-Svelte Server 1.0 --");
    console.log(`Listening on *:${PORT}`);
});