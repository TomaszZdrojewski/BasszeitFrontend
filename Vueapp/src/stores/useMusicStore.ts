import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMusicStore = defineStore('music', () => {
  const musicItems = ref<any[]>([])

  const loadMusic = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/music`)
    musicItems.value = await res.json()
  }

  return { musicItems, loadMusic }
})
