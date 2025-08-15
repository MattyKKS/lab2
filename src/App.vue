<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

const messageStore = useMessageStore()
const { message } = storeToRefs(messageStore)
</script>

<template>
  <div class="flex flex-col min-h-screen w-screen font-sans bg-gray-900 text-gray-200 antialiased">
    <!-- Header -->
    <header class="w-full flex-shrink-0">
      <!-- Flash message -->
      <div
        v-if="message"
        id="flashmessage"
        class="w-full bg-yellow-400 text-black py-4 px-6 text-center font-bold text-xl rounded-md shadow-lg animate-[yellofade_3s_ease-in-out]"
      >
        <h4>{{ message }}</h4>
      </div>
      <h1>Deploy with Vercel</h1>

      <!-- Navigation -->
      <div class="w-full flex flex-col items-center border-b border-gray-700">
        <nav class="flex flex-col items-center gap-4 py-6">
          <RouterLink
            class="font-bold text-yellow-400 hover:text-yellow-300 transition-colors"
            exact-active-class="text-yellow-200"
            :to="{ name: 'event-list-view' }"
          >
            Event
          </RouterLink>
          <RouterLink
            class="text-gray-300 hover:text-yellow-300 transition-colors"
            :to="{ name: 'about' }"
          >
            About
          </RouterLink>
          <RouterLink
            class="text-gray-300 hover:text-yellow-300 transition-colors"
            :to="{ name: 'student-list-view' }"
          >
            Students
          </RouterLink>
        </nav>
      </div>
    </header>

    <!-- Main (fills remaining space) -->
    <main class="flex-1 overflow-y-auto w-full flex justify-center">
      <RouterView class="w-full max-w-4xl p-4" />
    </main>

    <!-- Footer -->
    <footer class="w-full py-4 text-center text-sm text-gray-500 border-t border-gray-700">
      © {{ new Date().getFullYear() }} Your App Name
    </footer>
  </div>
</template>

<style>

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #0cec17;
}

nav a.router-link-exact-active {
  color: #42b983;
}

h1 {
  font-size: 24px;
  text-align: center;
  margin: 20px 0;
  color: #b38c0a;
}

h2 {
  font-size: 20px;
}

@keyframes yellofade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}

#flashmessage {
  animation: yellofade 3s ease-in-out;
  color: black;
}
</style>
