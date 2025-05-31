<template>
  <div class="container">
    <h2>Hello Music Lovers 🎶</h2>
    <h3>Find a song that you like and cast your vote!</h3>

    <input v-model="input" placeholder="Enter your favorite song" />
    <p v-if="input">You entered: <strong>{{ input }}</strong></p>

    <p>Votes number: {{ votes }}</p>
    <button @click="vote" :disabled="hasVoted">
      {{ hasVoted ? 'Thank you for voting!' : 'Vote' }}
    </button>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const input = ref('')
const votes = ref(0)
const hasVoted = ref(false)

// Clear hasVoted on every load
onMounted(() => {
  localStorage.removeItem('hasVoted')
  hasVoted.value = false

  // Load saved input (optional)
  const savedInput = localStorage.getItem('input')
  if (savedInput) input.value = savedInput
})

// Save input (optional)
watch(input, (val) => localStorage.setItem('input', val))

function vote() {
  if (!hasVoted.value) {
    votes.value++
    hasVoted.value = true
    // Not saving hasVoted, so it resets on next page load
  }
}
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}
</style>
