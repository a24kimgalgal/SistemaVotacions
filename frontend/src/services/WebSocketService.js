

class WebSocketService {
  constructor(url, store) {
    this.url = url;
    this.socket = null;
    this.store = store;
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("votos inicializados")
      this.store.setVotos(data);
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
      setTimeout(() => this.connect(), 5000);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendVote(optionIndex) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(optionIndex);
    } else {
      console.error('WebSocket is not connected.');
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export default WebSocketService;
