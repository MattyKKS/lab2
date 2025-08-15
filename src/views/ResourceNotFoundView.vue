<!-- src/views/ResourceNotFoundView.vue -->
<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{
  resource?: string
  id?: string | number
}>()
</script>

<template>
  <main style="padding: 2rem;">
    <h1>404 — {{ resource || 'Resource' }} Not Found</h1>
    <p v-if="id">We couldn’t find {{ resource || 'this resource' }} with id “{{ id }}”.</p>
    <p v-else>The requested {{ resource || 'resource' }} could not be found.</p>
    <router-link to="/">Back to Home</router-link>
  </main>
</template>
