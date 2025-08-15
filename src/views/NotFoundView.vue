<!-- src/views/NotFoundView.vue -->
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
function goHome() {
  router.push({ path: '/' })
}
</script>

<template>
  <main style="padding: 2rem;">
    <h1>404 — Page Not Found</h1>
    <p>The page <code>{{ route.fullPath }}</code> doesn’t exist.</p>
    <button @click="goHome">Go Home</button>
  </main>
</template>
