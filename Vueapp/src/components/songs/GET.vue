<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Reactive array to hold fetched items
const items = ref<any[]>([])

const loadThings = () => {
  const baseURL = import.meta.env.VITE_BACKEND_BASE_URL
  console.log('Backend URL:', baseURL)

  const endpoint = baseURL + '/music'


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
  <div>
    <h2>Musiclist from backend</h2>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <strong>ID:</strong> {{ item.id }} |
        <strong>Title:</strong> {{ item.title }} |
        <strong>Artist:</strong> {{ item.artist }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
h2 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}
ul {
  padding-left: 1.2rem;
}
li {
  margin-bottom: 0.4rem;
}
</style>
