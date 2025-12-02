import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { WebSocketServer } from 'ws';
import fs from 'fs';

const app = express();
app.use(cors());

const server = createServer(app);
const wss = new WebSocketServer({ server });

let votos = {};

try {
  const data = fs.readFileSync('votos.json', 'utf8');
  votos = JSON.parse(data);
  console.log('Estado inicial de votos cargado desde votos.json');
} catch (err) {
  console.error('No se pudo leer votos.json, se iniciará con un objeto vacío.', err.message);
}

function broadcast(data) {
  const message = JSON.stringify(data);
  console.log("Enviando actualización a todos los clientes:", message);
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(message);
    }
  });
}

wss.on('connection', (ws) => {
  console.log('Cliente conectado al WebSocket');

  ws.send(JSON.stringify(votos));

  ws.on('message', (message) => {
    const votedOption = message.toString();
    console.log("Llega una votación para:", votedOption);

    if (votos.hasOwnProperty(votedOption)) {
      votos[votedOption]++;
    } else {
      console.warn(`La opción "${votedOption}" no existe en votos.json`);
      return;
    }

    fs.writeFile('votos.json', JSON.stringify(votos, null, 2), (err) => {
      if (err) {
        console.error("Error al escribir en el archivo:", err);
        return;
      }
      broadcast(votos);
    });
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(3999, () => {
  console.log('Servidor corriendo en http://localhost:3999');
});