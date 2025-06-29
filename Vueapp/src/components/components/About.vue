<script setup lang="ts">
import { ref } from 'vue'
import { useMusicStore } from '@/stores/useMusicStore'

const message = ref('')
const store = useMusicStore()
const resetVotes = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/music/reset-votes`, {
      method: 'POST',
    })

    if (response.ok) {
      message.value = '✅ All votes have been reset.'
      localStorage.removeItem('votedId') // 🧹 remove saved vote from browser
      await store.loadMusic() // 🔄 refresh music list
    } else {
      message.value = '❌ Failed to reset votes.'
    }
  } catch (error) {
    console.error(error)
    message.value = '⚠️ Error while resetting votes.'
  }
}


</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>
      This is About page for BasszeitFrontend.
      It is a Vue.js application that serves as the frontend for the Basszeit project.
      The application is designed to provide a user-friendly interface for interacting with the Basszeit backend services.

    </p>
<h2> This button allows you to start the fun all over again</h2>

    <button class="reset-button" @click="resetVotes">🔄 Reset Votes</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<style scoped>
h2{
  font-weight: 500;
  font-size: 2rem;
  position: relative;
  top: -10px;
}
.about {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}

.reset-button {
  margin-top: 1.5rem;
  background-color: #ff5555;
  color: white;
  font-weight: bold;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.reset-button:hover {
  background-color: #ff7777;
}
</style>
