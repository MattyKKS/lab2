<!-- src/views/event/RegisterView.vue -->
<script setup lang="ts">
import { defineProps, toRefs } from 'vue'
import type { Event } from '@/types'
import { useMessageStore } from '@/stores/message'
import router from '@/router';

const props = defineProps<{
  event: Event
  id: string
}>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)
const store = useMessageStore()
function register() {
store.updateMessage(`Registered for ${event.value?.title}`)
setTimeout(() => {
  store.updateMessage('')
}, 3000)
router.push({ name: 'event-detail-view', params: { id: event.value?.id } })
}

</script>

<template>
  <div v-if="event" class="register-box">
    <p>Register event here</p>
    <button type="button" @click="register">Register</button>
  </div>
</template>

<style scoped>
.register-box {
  background-color: #ffeb99; /* soft yellow */
  color: #333; /* dark text for contrast */
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
  margin: 20px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.register-box button {
  background-color: #28a745; /* green */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.register-box button:hover {
  background-color: #218838; /* darker green */
}
</style>


