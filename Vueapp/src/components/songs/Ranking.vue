// src/views/Ranking.vue
<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Ranking</h1>
    <ul>
      <li v-for="(app, index) in ranking" :key="index" class="flex justify-between items-center mb-2 p-2 border rounded">
        <div>
          <strong>{{ index + 1 }}. {{ app.name }}</strong>
        </div>
        <div class="flex gap-2 items-center">
          <span>{{ app.score }}</span>
          <button @click="vote(index, 1)" class="px-2">⬆️</button>
          <button @click="vote(index, -1)" class="px-2">⬇️</button>
        </div>
      </li>
    </ul>
    <router-link to="/" class="block mt-6 text-blue-500 hover:underline">Zurück zur Hauptseite</router-link>
  </div>
</template>

<script>
export default {
  name: 'Ranking',
  data() {
    return {
      ranking: [
        { name: 'App Alpha', score: 10 },
        { name: 'App Beta', score: 8 },
        { name: 'App Gamma', score: 6 }
      ]
    };
  },
  methods: {
    vote(index, delta) {
      this.ranking[index].score += delta;
    }
  }
};
</script>