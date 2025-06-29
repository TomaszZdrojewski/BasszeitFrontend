<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useMusicStore } from '@/stores/useMusicStore'

defineProps<{ msg: string }>()

const store = useMusicStore()
const topSongVideoId = ref<string | null>(null)

onMounted(() => {
  store.loadMusic()
})

// Ranking — We sort the song desc
const rankedMusic = computed(() =>
  [...store.musicItems].sort((a, b) => b.votes - a.votes)
)

// Best SOng
const topSong = computed(() =>
  rankedMusic.value.length > 0 ? rankedMusic.value[0] : null
)

// Link embedowany do YouTube
const embedUrl = computed(() =>
  topSongVideoId.value ? `https://www.youtube.com/embed/${topSongVideoId.value}` : ''
)

// Pobierz videoId z YouTube API
async function fetchYouTubeVideoId(query: string): Promise<string | null> {
  const apiKey = import.meta.env.VITE_YT_API_KEY
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(query)}&key=${apiKey}`

  console.log("🔎 Fetching YT video for query:", query)
  console.log("🔐 API KEY present?", !!apiKey)

  const res = await fetch(url)
  const data = await res.json()

  console.log("📺 YouTube search result:", data)

  return data.items?.[0]?.id?.videoId || null
}


// Reaguj na zmianę zwycięzcy i pobierz nowe video
watch(topSong, async (song) => {
  if (song) {
    const query = `${song.title} ${song.artist}`
    const videoId = await fetchYouTubeVideoId(query)
    topSongVideoId.value = videoId
  }
})
</script>
<template>
  <div class="ranking-container">
    <h1 class="green">{{ msg }}</h1>

    <div class="flex-wrapper">
      <div v-if="topSongVideoId" class="video-player">
        <iframe
          width="100%"
          height="315"
          :src="embedUrl"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <p>
          <a :href="`https://www.youtube.com/watch?v=${topSongVideoId}`" target="_blank" rel="noopener">
            Open in YouTube 🔗
          </a>
        </p>
      </div>

      <div class="ranking">
        <h2>🏆 Music Ranking</h2>
        <ol>
          <li v-for="(item, index) in rankedMusic" :key="item.id">
            <strong>#{{ index + 1 }}</strong> — {{ item.title }} by {{ item.artist }} ({{ item.votes }} votes)
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>


<style scoped>
.ranking-container {
  max-width: 1000px;
  margin: 2rem auto;
  text-align: center;
  color: #fff;
  padding: 1rem;
}

/* Układ boczny */
.flex-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
}

/* Okno YouTube */
.video-player {
  flex: 1 1 400px;
  max-width: 500px;
}

.video-player iframe {
  width: 100%;
  height: 315px;
  border-radius: 8px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.2);
}

.video-player p {
  margin-top: 0.5rem;
}

.video-player a {
  color: #00ff88;
  text-decoration: none;
  font-weight: bold;
}

.video-player a:hover {
  text-decoration: underline;
}

/* Ranking */
.ranking {
  flex: 1 1 300px;
  max-width: 400px;
  background: #1e1e1e;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
}

.ranking h2 {
  color: #00ff88;
  margin-bottom: 1rem;
}

ol {
  padding-left: 1.2rem;
  text-align: left;
}

li {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  color: #f0f0f0;
}

/* Responsywność dla małych ekranów */
@media (max-width: 768px) {
  .flex-wrapper {
    flex-direction: column;
    align-items: center;
  }

  .video-player iframe {
    height: 200px;
  }
}
</style>

