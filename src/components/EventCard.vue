<script setup lang="ts">
import { ref } from 'vue'
import type { Event } from '@/types'
import EventCard2 from './icons/EventCard2.vue'

defineProps<{
  event: Event
}>()

//const event = ref({
//  id: 5928101,
//  category: 'animal welfare',
//  title: 'Cat Adoption Day',
//  description: 'Find your new feline friend at this event',
//  location: 'Meow Town',
//  date: 'January 28, 2022',
//  time: '12:00',
//  organizer: 'Kat Laydee',
//})
</script>

<template>
  <RouterLink
    class="event-link block transform transition hover:scale-105 hover:shadow-lg border border-gray-600 p-4 w-64 mb-6 group"
    :to="{ name: 'event-detail-view', params: { id: event.id } }"
  >
    <h2 class="font-bold mb-2 transition-colors group-hover:text-green-600">
      {{ event.title }}
    </h2>
    <span class="block mb-3">@{{ event.time }} on {{ event.date }}</span>
    <EventCard2 :event="event" />
  </RouterLink>
</template>



<style scoped>
.event-class {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.event-class:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
}
.event-link {
  text-decoration: none;
  color: #d7f709;
}
</style>
