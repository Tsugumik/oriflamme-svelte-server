import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import createListenerSyncChat from './chat/createListenerSyncChat';
import createListenerNewChatMessage from './chat/createListenerNewChatMessage';
import createListenerPlayerCreate from './connection/createListenerPlayerCreate';
import createListenerDisconnect from './connection/createListenerDisconnect';
import * as dotenv from "dotenv";
import GameInstance from './game/GameInstance';
import { ApiErrorMessages } from './errorHandler/ApiErrorMessages';
import { ApiErrors } from './errorHandler/apiErrors';
import createListenerRequestPlayerSync from './connection/createListenerRequestPlayerSync';

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
    app.get('/api/:gameId/', async (req, res)=>{
        if(req.params.gameId == GAME.gameId) {
            res.json(GAME);
            
        } else res.status(400).json({message: ApiErrorMessages[ApiErrors.INVALID_API_KEY]});
        
    });
    app.get('/api/:gameId/players', async (req, res)=>{
        if(req.params.gameId == GAME.gameId) {
            res.json(GAME.players);
        } else res.status(400).json({message: ApiErrorMessages[ApiErrors.INVALID_API_KEY]});
        
    });
    app.get('/api/:gameId/chat', async (req, res)=>{
        if(req.params.gameId == GAME.gameId) {
            res.json(GAME.chat);
        } else res.status(400).json({message: ApiErrorMessages[ApiErrors.INVALID_API_KEY]});
    });
}

// Start server
io.on("connection", socket=>{
    console.log(`${socket.id} connected!`);
    createListenerPlayerCreate(socket, GAME.players, GAME, io);
    createListenerDisconnect(socket, GAME.players, GAME.gameState, io);
    createListenerNewChatMessage(socket, GAME.players, GAME.chat, io);
    createListenerSyncChat(socket, GAME.chat);
    createListenerRequestPlayerSync(io, GAME.players);
});

server.listen(PORT, ()=>{
    console.log("-- Oriflamme-Svelte Server 1.0 --");
    console.log(`Listening on *:${PORT}`);
});