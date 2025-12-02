# 🗳️ Sistema de Votaciones en Tiempo Real

Una aplicación web full-stack que permite a los usuarios votar por opciones predefinidas y ver cómo los resultados se actualizan instantáneamente en todos los dispositivos conectados mediante WebSockets.

## 🚀 Tecnologías Utilizadas

* **Frontend:** Vue 3, Vite, Vuetify, Pinia.
* **Backend:** Node.js, Express, WS (WebSockets).
* **Persistencia:** Archivo JSON local (`votos.json`).

## 🛠️ Instalación y Ejecución

Este proyecto consta de dos partes: el servidor (backend) y el cliente (frontend). Necesitas dos terminales abiertas.

### 1. Iniciar el Backend (Servidor)

El servidor maneja las conexiones WebSocket y guarda los votos.

```bash
cd backend
npm install
node server.js
