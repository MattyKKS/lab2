<!-- src/views/NetworkErrorView.vue -->
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import NProgress from 'nprogress'

const router = useRouter()
const online = ref<boolean>(navigator.onLine)

function updateStatus() {
  online.value = navigator.onLine
}

onMounted(() => {
  window.addEventListener('online', updateStatus)
  window.addEventListener('offline', updateStatus)
})

onBeforeUnmount(() => {
  window.removeEventListener('online', updateStatus)
  window.removeEventListener('offline', updateStatus)
})

async function tryAgain() {
  // show progress while checking again
  NProgress.start()
  await new Promise((r) => setTimeout(r, 600))
  NProgress.done()

  if (online.value) {
    // if we’re back online, return to previous page
    router.back()
  }
}
</script>

<template>
  <main style="max-width:720px;margin:2rem auto;padding:1rem;text-align:center">
    <h1>Network Error</h1>
    <p v-if="!online">You’re offline. Please check your internet connection.</p>
    <p v-else>We couldn’t reach the server. Please try again.</p>

    <div style="margin-top:1rem;display:flex;gap:.5rem;justify-content:center">
      <button type="button" @click="tryAgain">Try again</button>
      <button type="button" @click="$router.push({ path: '/' })">Go Home</button>
    </div>

    <p style="margin-top:1rem;font-size:.9rem;color:#666">
      Tip: If you’re behind a captive portal (airport/hotel Wi-Fi), open any website to sign in.
    </p>
  </main>
</template>

<style scoped>
button {
  padding: .6rem 1rem;
  border-radius: .5rem;
  border: 1px solid #ccc;
  cursor: pointer;
}
button:hover { opacity: .9; }
</style>
