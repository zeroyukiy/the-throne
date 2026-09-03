import { createApp } from "vue";
import Antd from "ant-design-vue";
import "@/assets/style.css";
import App from "./App.vue";
import { router } from "./router";
import { createPinia } from "pinia";
import { useUserStore } from "./store/user.js";

// axios.interceptors.response.use(undefined, async (error) => {
//   const originalRequest = error.config;

//   if (error.response?.status === 401 && !originalRequest._retry) {
//     const refresh = await axios.get("/api/auth/refresh", {
//       withCredentials: true,
//     });
//     if (refresh.status === 200) {
//       console.log("/api/auth/refresh");
//       const { token } = refresh.data;
//       console.log(token);
//       localStorage.setItem("user", token);
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       setWebsocket();
//       originalRequest.headers.Authorization = `Bearer ${token}`;
//       return axios(originalRequest); // Retry original request
//     }
//   }
//   return error;
// });

const pinia = createPinia();
const app = createApp(App);

app.use(router).use(pinia).use(Antd).mount("#app");

const userStore = useUserStore();

router.beforeEach(async (to, from) => {
  if (
    // make sure the user is authenticated
    !userStore.is_auth &&
    // ❗️ Avoid an infinite redirect
    to.path !== "/login"
    // to.path !== "/"
  ) {
    const req = await fetch("http://localhost:8000/@me", {
      credentials: "include",
      mode: "cors",
    });
    if (req.ok) {
      const data = await req.json();
      const { user } = data;

      console.log("[api: /@me]", user);

      await userStore.init(user);
    } else {
      // redirect the user to the login page
      return "/login";
      // return { name: "Login" };
    }
  }
});
