<script setup lang="ts">
import { ref } from 'vue'

interface MusicItem {
  id?: number
  title: string
  artist: string
}

const items = ref<MusicItem[]>([])
const titleField = ref('')
const artistField = ref('')
const message = ref('')
const isError = ref(false)

const save = async () => {
  const baseURL = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = baseURL + '/music/repo'

  const data = {
    title: titleField.value,
    artist: artistField.value,
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) throw new Error('Failed to save')

    const newItem: MusicItem = await response.json()
    items.value.push(newItem)

    message.value = '✅ Song saved!'
    isError.value = false

    titleField.value = ''
    artistField.value = ''
  } catch (err) {
    console.error(err)
    message.value = '❌ Error saving song.'
    isError.value = true
  }
}
</script>

<template>
  <div class="container">
    <h2>🎵 Add a New Song</h2>

    <div class="form">
      <input v-model="titleField" placeholder="Song Title" />
      <input v-model="artistField" placeholder="Artist Name" />
      <button @click="save">Save</button>
    </div>

    <p :class="['message', isError ? 'error' : 'success']" v-if="message">{{ message }}</p>

    <ul class="music-list">
      <li v-for="(item, index) in items" :key="index">
        <span><strong>ID:</strong> {{ item.id }}</span>
        <span><strong>🎶 Title:</strong> {{ item.title }}</span>
        <span><strong>👤 Artist:</strong> {{ item.artist }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  font-size: 1.6rem;
  margin-bottom: 1.2rem;
}

.form {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

input {
  padding: 0.5rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  flex: 1 1 200px;
  transition: border 0.3s;
}

input:focus {
  border-color: #4a90e2;
  outline: none;
}

button {
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: #357ab8;
}

.message {
  text-align: center;
  font-weight: bold;
  margin-bottom: 1rem;
}

.success {
  color: #2e7d32;
}

.error {
  color: #c62828;
}

.music-list {
  list-style: none;
  padding: 0;
}

.music-list li {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
</style>
