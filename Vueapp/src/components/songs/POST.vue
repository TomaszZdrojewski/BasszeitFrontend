<script setup lang="ts">
import { ref } from 'vue';

interface MusicItem {
  id?: number;
  title: string;
  artist: string;
}

const items = ref<MusicItem[]>([]);
const titleField = ref('');
const artistField = ref('');

const save = () => {
  const baseURL = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = baseURL + '/repo'
  const data = {
    title: "title",

  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  fetch(endpoint, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      items.value.push(data); // add the new item to the list
    })
    .catch((error) => console.log('Error:', error));
};
</script>

<template>
  <div>
    <h2>Saved Music</h2>

    <input v-model="titleField" placeholder="Title" />
    <input v-model="artistField" placeholder="Artist" />
    <button @click="save">Save</button>

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
input {
  margin: 0.2rem;
  padding: 0.4rem;
}
button {
  padding: 0.4rem 0.8rem;
  margin-left: 0.4rem;
}
</style>
