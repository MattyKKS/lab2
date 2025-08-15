<!-- src/views/event/EventLayout.vue -->
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useEventStore } from '@/stores/event'

const { event } = storeToRefs(useEventStore())
const props = defineProps<{ id: string }>()
</script>

<template>
  <!-- Loading state -->
  <div v-if="!event" class="text-center py-8 text-yellow-300">
    Loading…
  </div>

  <!-- Event layout -->
  <div v-else class="max-w-lg mx-auto p-6 text-center text-gray-200">
    

    <!-- Vertical nav -->
    <nav class="flex flex-col items-center gap-3 mb-8 font-medium">
      <router-link
        :to="{ name: 'event-detail-view', params: { id: props.id } }"
        class="text-gray-300 hover:text-yellow-300 transition-colors"
      >
        Details
      </router-link>
      <router-link
        :to="{ name: 'event-register-view', params: { id: props.id } }"
        class="text-gray-300 hover:text-yellow-300 transition-colors"
      >
        Register
      </router-link>
      <router-link
        :to="{ name: 'event-edit-view', params: { id: props.id } }"
        class="text-gray-300 hover:text-yellow-300 transition-colors"
      >
        Edit
      </router-link>
    </nav>
    <!-- Dynamic content based on route -->
     <h1 class="text-2xl font-bold mb-6 text-yellow-400">{{ event.title }}</h1>
    <RouterView :event="event" :id="props.id" />
  </div>
</template>