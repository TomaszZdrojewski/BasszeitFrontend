<template>
  <div class="ranking-container">
    <h1 class="text-2xl font-bold mb-4">🎵 Rangliste der Songs</h1>
    <ul class="space-y-4">
      <li
        v-for="(song, index) in sortedSongs"
        :key="song.id"
        class="bg-white shadow-md p-4 rounded-md flex items-center justify-between"
      >
        <div class="flex items-center space-x-4">
          <img :src="song.imageUrl" alt="Albumcover" class="w-16 h-16 rounded-md" />
          <div>
            <p class="text-lg font-semibold">{{ index + 1 }}. {{ song.title }}</p>
            <p class="text-gray-600">{{ song.artist }}</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-500">Votes</p>
          <p class="text-xl font-bold text-indigo-600">{{ song.votes }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Song {
  id: number
  title: string
  artist: string
  imageUrl: string
  votes: number
}

// Beispiel-Daten – hier würdest du später deine API einbinden
const songs = ref<Song[]>([
  {
    id: 1,
    title: 'Electric Feel',
    artist: 'MGMT',
    imageUrl: 'https://via.placeholder.com/100',
    votes: 22,
  },
  {
    id: 2,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    imageUrl: 'https://via.placeholder.com/100',
    votes: 35,
  },
  {
    id: 3,
    title: 'Levitating',
    artist: 'Dua Lipa',
    imageUrl: 'https://via.placeholder.com/100',
    votes: 18,
  },
])

// Songs nach Votes sortieren (absteigend)
const sortedSongs = computed(() =>
  [...songs.value].sort((a, b) => b.votes - a.votes)
)
</script>

<style scoped>
.ranking-container {
  max-width: 700px;
  margin: auto;
  padding: 20px;
}
</style>
