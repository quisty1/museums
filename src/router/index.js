import { createRouter, createWebHashHistory } from 'vue-router'
import MuseumsList from '../views/MuseumsList.vue'
import AddMuseum from '../views/AddMuseum.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MuseumsList
  },
  {
    path: '/add',
    name: 'addmuseum',
    component: AddMuseum
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router