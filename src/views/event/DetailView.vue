<script setup lang="ts">
import { ref, onMounted, defineProps, watch } from 'vue'
import type { Event } from '@/types'
import EventService from '@/services/EventService'

const event = ref<Event | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const props = defineProps<{
  event: Event
  id: string
}>()

async function fetchEvent() {
  loading.value = true
  error.value = null
  try {
    const { data } = await EventService.getEvent(parseInt(props.id, 10))
    event.value = data
  } catch (e) {
    console.error('There was an error', e)
    error.value = 'Failed to load event.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchEvent)
watch(() => props.id, fetchEvent)
</script>

<template>
  <div>
    <p v-if="loading">Loading…</p>
    <p v-else-if="error" class="text-red-600 font-semibold">{{ error }}</p>

    <div v-else-if="event">
      <!-- Distinct highlighted box -->
      <div class="bg-yellow-300 text-black p-4 rounded-lg shadow-lg">
        <p class="mb-2 font-bold text-lg">
          {{ event.time }} on {{ event.date }} @ {{ event.location }}
        </p>
        <p class="text-base">
          {{ event.description }}
        </p>
      </div>

      <!-- Nested routes -->
      <RouterView :event="event" />
    </div>

    <p v-else>Event not found.</p>
  </div>
</template>
