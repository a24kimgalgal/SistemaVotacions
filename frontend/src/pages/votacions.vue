<template>
    <div class="votacion-container">
    <h1 class="title">Enquesta de Programació</h1>
    <p class="subtitle">Vota pel teu llenguatge preferit!</p>

    <div class="opciones-grid">
        <div 
        v-for="(cantidad, index) in store.votos" 
        :key="index" 
        class="card"
        >
        <div class="card-header">
            <h3>{{ opcionesNombres[index] || `Opción ${index + 1}` }}</h3>
            <span class="badge">{{ cantidad }} votacions</span>
        </div>

        <div class="progress-bg">
            <div 
            class="progress-fill" 
            :style="{ width: getPorcentaje(cantidad) + '%' }"
            ></div>
        </div>
        <p class="percent-text">{{ getPorcentaje(cantidad) }}%</p>

        <button @click="votar(index)" class="btn-votar">
            Votar
        </button>
        </div>
    </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, computed } from 'vue';
import { useAppStore } from '../stores/app';
import WebSocketService from '../services/WebSocketService';

const store = useAppStore();
const wsService = new WebSocketService('ws://localhost:3999', store);

const opcionesNombres = ['JavaScript', 'Python', 'Java', 'C++'];

const totalVotos = computed(() => {
    if (!Array.isArray(store.votos)) return 0;
    return store.votos.reduce((acc, curr) => acc + curr, 0);
});

const getPorcentaje = (votos) => {
    if (totalVotos.value === 0) return 0;
    return Math.round((votos / totalVotos.value) * 100);
};

onMounted(() => {
    wsService.connect();
});

onUnmounted(() => {
    wsService.disconnect();
});

const votar = (index) => {
    wsService.sendVote(index); 
};
</script>

<style scoped>
.votacion-container { max-width: 800px; margin: 0 auto; padding: 2rem; text-align: center; font-family: 'Segoe UI', sans-serif; color: #333; }
.title { font-size: 2.5rem; margin-bottom: 0.5rem; color: #2c3e50; }
.subtitle { color: #7f8c8d; margin-bottom: 2rem; }
.opciones-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
.card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.2s; display: flex; flex-direction: column; }
.card:hover { transform: translateY(-5px); }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.badge { background-color: #ecf0f1; color: #2c3e50; padding: 4px 8px; border-radius: 20px; font-weight: bold; font-size: 0.85rem; }
.progress-bg { height: 10px; background-color: #eee; border-radius: 5px; overflow: hidden; margin-bottom: 0.5rem; }
.progress-fill { height: 100%; background: linear-gradient(90deg, #3498db, #8e44ad); transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
.percent-text { text-align: right; font-size: 0.8rem; color: #7f8c8d; }
.btn-votar { margin-top: auto; background-color: #3498db; color: white; border: none; padding: 10px 15px; border-radius: 6px; cursor: pointer; font-weight: 600; }
.btn-votar:hover { background-color: #2980b9; }
</style>