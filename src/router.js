import { createWebHistory, createRouter } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import ProfilePage from "./pages/ProfilePage.vue";
import ChatPage from "./pages/ChatPage.vue";
import ListChatPage from "./pages/ListChatPage.vue";
import Login from "./pages/Login.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/profile", component: ProfilePage },
  { path: "/explore", component: ListChatPage },
  { path: "/chat", component: ChatPage },

  { path: "/login", component: Login },
  // { path: "/logout", component: Logout },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
