import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from 'vue-router'

const isSSR = typeof window === 'undefined'
const history = isSSR ? createMemoryHistory() : createWebHistory()

const Entry = () => import('@/views/Entry.vue')
const NotFoundView = () => import(/* webpackPrefetch: true */ '@/views/NotFoundView.vue')

export default function createRouter() {
  return _createRouter({
    history,
    routes: [
      { path: '/', component: Entry, name: 'entry' },
      { path: '/404', component: NotFoundView, name: 'notfound' }
    ]
  })
}
