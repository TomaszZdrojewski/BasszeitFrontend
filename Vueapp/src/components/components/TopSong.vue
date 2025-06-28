<template>
  <div class="container">
    <h2>Hello Music Lovers 🎶</h2>
    <h3>Find a song that you like and cast your vote!</h3>

    <p v-if="songTitle">Top song for now is: <strong>{{ songTitle }}</strong></p>
    <p v-if="votes !== null">Votes number: {{ votes }}</p>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const songTitle = ref('')
const votes = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('/api/top-song')
    if (!response.ok) throw new Error('Failed to fetch top song')

    const data = await response.json()
    songTitle.value = data.title
    votes.value = data.votes
  } catch (err) {
    console.error('Error fetching top song:', err)
    songTitle.value = 'Unavailable'
    votes.value = 0
  }
})
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}
</style>
