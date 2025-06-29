<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useMusicStore } from '@/stores/useMusicStore'

defineProps<{ msg: string }>()

const store = useMusicStore()
const videoId = ref<string | null>(null)

onMounted(() => {
  store.loadMusic()
})

// Sort songs by votes
const rankedMusic = computed(() =>
  [...store.musicItems].sort((a, b) => b.votes - a.votes)
)

const topSong = computed(() =>
  rankedMusic.value.length > 0 ? rankedMusic.value[0] : null
)

const embedUrl = computed(() => {
  if (!topSong.value) return ''
  const query = `${topSong.value.title} ${topSong.value.artist}`
  return `https://www.youtube.com/embed?autoplay=1&mute=1&origin=${window.location.origin}&q=${encodeURIComponent(query)}`
})
</script>


<template>
  <iframe
    width="560"
    height="315"
    :src="embedUrl"

    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>


  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>You’ve successfully created a project</h3>

    <div class="ranking">
      <h2>🏆 Music Ranking</h2>
      <ol>
        <li v-for="(item, index) in rankedMusic" :key="item.id">
          <strong>#{{ index + 1 }}</strong> — {{ item.title }} by {{ item.artist }} ({{ item.votes }} votes)
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
.greetings {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  color: #fff;
}

.ranking {
  margin-top: 2rem;
  background: #1e1e1e;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
}

.ranking h2 {
  text-align: center;
  color: #00ff88;
  margin-bottom: 1rem;
}

ol {
  padding-left: 1.2rem;
}

li {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}
</style>
