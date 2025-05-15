<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const input = ref('')
const votes = ref(0)
const hasVoted = ref(false)

const vote = () => {
  if (!hasVoted.value) {
    votes.value++
    hasVoted.value = true
  }
}

// Load from localStorage
onMounted(() => {
  const savedVotes = localStorage.getItem('votes')
  const savedInput = localStorage.getItem('input')
  const savedVoted = localStorage.getItem('hasVoted')

  if (savedVotes) votes.value = parseInt(savedVotes)
  if (savedInput) input.value = savedInput
  if (savedVoted) hasVoted.value = savedVoted === 'true'
})

// Save to localStorage
watch(votes, (val) => {
  localStorage.setItem('votes', val.toString())
})
watch(input, (val) => {
  localStorage.setItem('input', val)
})
watch(hasVoted, (val) => {
  localStorage.setItem('hasVoted', val.toString())
})
</script>

<template>
  <div class="container">
    <h2>Hello Music Lovers 🎶</h2>
    <h3>Find a song that you like and cast your vote!</h3>
    <input v-model="input" placeholder="Enter your favorite song" />
    <p v-if="input">You entered: <strong>{{ input }}</strong></p>
    <img
      src="https://i.ytimg.com/vi/vBynw9Isr28/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCp4pgO9atyFIG1u-a2KS9erTKhwA"
      alt="Song image"
    />



    <p>Votes number: {{ votes }}</p>
    <button @click="vote" :disabled="hasVoted">
      {{ hasVoted ? 'Thank you for voting!' : 'Vote' }}
    </button>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  max-width: 600px;
  margin: auto;
  padding: 1em;
}

h2 {
  color: aqua;
}

img {
  max-width: 100%;
  border-radius: 12px;
  margin: 1em 0;
}

input {
  padding: 10px;
  width: 80%;
  max-width: 300px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1em;
}

button {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
