<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Define a reactive array to hold the fetched items
const items = ref<any[]>([])

// Function to fetch data from the backend
const loadThings = () => {
  const endpoint = 'http://localhost:8080'
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow'
  }

  fetch(endpoint, requestOptions)
    .then(response => response.json())
    .then(result => {
      result.forEach((thing: any) => {
        items.value.push(thing)
      })
    })
    .catch(error => console.log('error', error))
}

// Call the function when the component is mounted
onMounted(() => {
  loadThings()
})
</script>

<template>
  <div>
    <h2>Things List</h2>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item }}
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
</style>
