import axios from 'axios'
import type { Event } from '@/types'
const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/HtetOoThu/lab2-vue',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
export default {
  getEvents(perPage: number, page: number) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id: number) {
    return apiClient.get('/events/' + id)
  },
  updateEvent(id: number, payload: Event) {
  return apiClient.put(`/events/${id}`, payload)
},
}
