import { createWebHistory, createRouter } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import ProfilePage from "./pages/ProfilePage.vue";
import ChatPage from "./pages/ChatPage.vue";
import ListChatPage from "./pages/ListChatPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/profile", component: ProfilePage },
  { path: "/explore", component: ListChatPage },
  { path: "/chat", component: ChatPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
