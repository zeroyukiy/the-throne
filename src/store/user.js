import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const username = ref("");
  const is_auth = ref(false);
  const avatar = ref("");

  const socket = ref(null);

  const init = async (user) => {
    is_auth.value = true;
    username.value = user.username;
    avatar.value = user.avatar;

    return new Promise((resolve, reject) => {
      const ws = new WebSocket("ws://localhost:8000/ws");
      const timeout = setTimeout(() => {
        reject("error");
      }, 2000);

      ws.onopen = () => {
        socket.value = ws;
        clearTimeout(timeout);
        resolve(socket);
      };

      ws.onclose = () => {
        clearTimeout(timeout);
        reject(new Error("WebSocket connection closed"));
      };
    });
  };

  const logout = () => {
    is_auth.value = false;
    username.value = "";
  };

  return { username, is_auth, avatar, socket, init, logout };
});
