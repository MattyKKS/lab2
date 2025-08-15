<!-- src/views/event/EditView.vue -->
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { Event } from '@/types'
import EventService from '@/services/EventService'
import { useMessageStore } from '@/stores/message' // added
import { storeToRefs } from 'pinia' // optional if you want to reactively watch in template

const props = defineProps<{
    event: Event
  id: string
}>()

const router = useRouter()
const store = useMessageStore()

const event = ref<Event | null>(null)
const form = ref<Event | null>(null)
const loading = ref(true)
const saving = ref(false)
const error = ref<string | null>(null)
const success = ref<string | null>(null)

async function fetchEvent() {
  loading.value = true
  error.value = null
  success.value = null
  try {
    const { data } = await EventService.getEvent(parseInt(props.id, 10))
    event.value = data
    // make an editable copy
    form.value = { ...data }
  } catch (e) {
    console.error('There was an error!', e)
    error.value = 'Failed to load event.'
  } finally {
    loading.value = false
  }
}

async function save() {
  if (!form.value) return
  saving.value = true
  error.value = null
  success.value = null
  try {
    await EventService.updateEvent(parseInt(props.id, 10), form.value)
    // flash message like in RegisterView
    store.updateMessage(`Event "${form.value.title}" updated successfully!`)
    setTimeout(() => {
      store.updateMessage('')
    }, 3000)
    // redirect
    router.push({ name: 'event-detail-view', params: { id: props.id } })
  } catch (e) {
    console.error('There was an error!', e)
    error.value = 'Failed to save changes.'
  } finally {
    saving.value = false
  }
}

onMounted(fetchEvent)
watch(() => props.id, fetchEvent)
</script>

<template>
  <div>
    <p v-if="loading">Loading…</p>
    <p v-else-if="error" class="error">{{ error }}</p>

    <div v-else-if="event && form">
      <form @submit.prevent="save" class="event-form">
        <div class="form-group">
          <label>Title</label>
          <input v-model="form.title" type="text" required />
        </div>

        <div class="form-group">
          <label>Date</label>
          <input v-model="form.date" type="date" required />
        </div>

        <div class="form-group">
          <label>Time</label>
          <input v-model="form.time" type="time" required />
        </div>

        <div class="form-group">
          <label>Location</label>
          <input v-model="form.location" type="text" required />
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea v-model="form.description" rows="4"></textarea>
        </div>

        <button type="submit" :disabled="saving" class="submit-btn">
          {{ saving ? 'Saving…' : 'Save Changes' }}
        </button>
      </form>

      <p v-if="success" class="success">{{ success }}</p>
    </div>

    <p v-else>Event not found.</p>
  </div>
</template>

<style scoped>
.event-form {
  background-color: #fcd34d; /* yellow-300 */
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);
  max-width: 500px;
  margin: 1rem auto;
  color: #000;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: inline-block;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #f59e0b; /* amber-500 */
  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.4);
}

.submit-btn {
  background-color: #f59e0b; /* amber-500 */
  color: #fff;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.submit-btn:hover {
  background-color: #d97706; /* darker amber */
  transform: scale(1.02);
}

.success {
  margin-top: 1rem;
  color: green;
  font-weight: bold;
}
</style>
