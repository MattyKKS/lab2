<script setup lang="ts">
import type { Event } from '@/types'

defineProps<{
  event: Event
}>()
</script>

<template>
  <div class="event-card2">
    <p>{{ event.category }} | {{ event.organizer }}</p>
  </div>
</template>

<style scoped>
.event-card2 {
  text-align: right;
  font-size: 16px;
}
</style>
