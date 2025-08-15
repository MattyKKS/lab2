<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { type Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'
import { useRoute } from 'vue-router'

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)

const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

const page = computed(() => props.page)

const route = useRoute()
const pageSize = computed(() => {
  const s = Number(route.query.pageSize ?? 2)
  const allowed = [2, 5, 10, 20]
  return allowed.includes(s) ? s : 2
})

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / pageSize.value)
  return page.value < totalPages
})

onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(pageSize.value, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = parseInt(response.headers['x-total-count'])
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  })
})
</script>

<template>
  <h1 class="text-2xl font-bold mb-6">Events For Good</h1>

  <div class="flex flex-col items-center gap-6">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="flex w-[290px] mt-6">
      <RouterLink
        id="page-prev"
        v-if="page > 1"
        :to="{ name: 'event-list-view', query: { page: page - 1 } }"
        rel="prev"
        class="flex-1 text-blue-500 px-4 py-2 border border-gray-300 rounded-md transition-all duration-200 hover:bg-gray-100 hover:shadow-md text-left"
      >
        &#60; Prev Page
      </RouterLink>

      <RouterLink
        id="page-next"
        v-if="hasNextPage"
        :to="{ name: 'event-list-view', query: { page: page + 1 } }"
        rel="next"
        class="flex-1 text-blue-500 px-4 py-2 border border-gray-300 rounded-md transition-all duration-200 hover:bg-gray-100 hover:shadow-md text-right"
      >
        Next Page &#62;
      </RouterLink>
    </div>
  </div>
</template>
