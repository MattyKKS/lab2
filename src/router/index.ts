import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import AboutView from '@/views/AboutView.vue'
import EventLayoutView from '@/views/event/LayoutView.vue'
import EventDetailView from '@/views/event/DetailView.vue'
import EventRegisterView from '@/views/event/RegisterView.vue'
import EventEditView from '@/views/event/EditView.vue'
import StudentListView from '@/views/StudentListView.vue'
import nProgress from 'nprogress'
import EventService from '@/services/EventService'
import { useEventStore } from '@/stores/event'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({ page: parseInt(route.query.page?.toString() ?? '1') }),
    },
    {
      path: '/event/:id',
      component: EventLayoutView,
      props: true,
      beforeEnter: (to) => {
        //put api call here
        const id = parseInt(to.params.id as string)
        const eventStore = useEventStore()
        return EventService.getEvent(id)
        .then((response) => {
          //setup the data
          eventStore.setEvent(response.data)
          return true
        }).catch((error) => {
        if (error?.response?.status === 404) {
          return { name: 'resource-not-found', params: { resource: 'event', id } }
        }
        return { name: 'network-error' }
      })
      },
      children: [
        {
          path: '',
          name: 'event-detail-view',
          component: EventDetailView,
          props: true,
        },
        {
          path: 'register',
          name: 'event-register-view',
          component: EventRegisterView,
          props: true,
        },
        {
          path: 'edit',
          name: 'event-edit-view',
          component: EventEditView,
          props: true,
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/students',
      name: 'student-list-view',
      component: StudentListView,
    },
    
    // Resource 404 route (e.g., missing event by id)
    {
      path: '/404/:resource',
      name: 'resource-not-found',
      component: () => import('@/views/ResourceNotFoundView.vue'),
      // pass resource param and id from query as props
      props: route => ({
        resource: route.params.resource as string,
        id: (route.query.id as string) || undefined,
      }),
    },

    // Generic 404 page
    {
      path: '/404',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
      {
      path: '/network-error',
      name: 'network-error',
      component: () => import('@/views/NetworkErrorView.vue'),
    },

    // Catch-all: must be last – catches all unmatched routes
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'not-found' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash }
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach(() => {
  nProgress.start()
  return true
})
router.afterEach(() => {
  nProgress.done()
})

export default router
