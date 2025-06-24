<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Reactive array to hold fetched items
const items = ref<any[]>([])

const loadThings = () => {
  const baseURL = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = baseURL + '/music'
  console.log('Backend URL:', baseURL)



  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow'
  }

  fetch(endpoint, requestOptions)
    .then(response => response.json())
    .then(result => {
      items.value = result
    })
    .catch(error => console.log('Fetch error:', error))
}




onMounted(() => {
  loadThings()
})
</script>

<template>
  <div class="music-container">
    <h2>🎵 Music List from Backend</h2>
    <ul class="music-list">
      <li v-for="(item, index) in items" :key="index" class="music-item">
        <div class="music-line">
          <span><strong>ID:</strong> {{ item.id }}</span>
          <span><strong>Title:</strong> {{ item.title || '—' }}</span>
          <span><strong>Artist:</strong> {{ item.artist || '—' }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.music-container {
  max-width: 700px;
  margin: 2rem auto;
  text-align: center;
}

.music-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.music-item {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s ease;
}

.music-item:hover {
  transform: translateY(-2px);
}

.music-line {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.95rem;
}
</style>
