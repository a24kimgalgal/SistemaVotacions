# Sistema de Votacions en Temps Real

Una aplicació web *full-stack* que permet als usuaris votar per opcions predefinides i veure com els resultats s'actualitzen instantàniament en tots els dispositius connectats mitjançant WebSockets.

## Tecnologies Utilitzades

* **Frontend:** Vue 3, Vite, Vuetify, Pinia.
* **Backend:** Node.js, Express, WS (WebSockets).
* **Persistència:** Arxiu JSON local (`votos.json`).

## Instal·lació i Execució

Aquest projecte consta de dues parts: el servidor (*backend*) i el client (*frontend*). Necessites dues terminals obertes.

### 1. Iniciar el Backend (Servidor)

El servidor gestiona les connexions WebSocket i guarda els vots.

```bash
cd backend
npm install
node server.js
