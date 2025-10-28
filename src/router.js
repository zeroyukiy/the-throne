import { createWebHistory , createRouter } from 'vue-router'

import HomePage from './pages/HomePage.vue'
import ProfilePage from './pages/ProfilePage.vue'
import ChatPage from './pages/ChatPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/profile', component: ProfilePage },
  { path: '/chat', component: ChatPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})