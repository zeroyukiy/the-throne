import { createWebHistory, createRouter } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import ProfilePage from "./pages/ProfilePage.vue";
import ChatPage from "./pages/ChatPage.vue";
import ListChatPage from "./pages/ListChatPage.vue";
import Login from "./pages/Login.vue";
// import CreateChat from "./pages/chat/CreateChat.vue";
import NotFound from "./pages/NotFound.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/profile", component: ProfilePage },
  { path: "/explore", component: ListChatPage },
  { path: "/chat/:id", component: ChatPage },
  // { path: "/chat/new", component: CreateChat },

  { path: "/login", component: Login },
  // { path: "/logout", component: Logout },

  // will match everything and put it under `route.params.pathMatch`
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top
    return { top: 0 };
  },
});
