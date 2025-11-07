import { createApp } from "vue";
import Antd from "ant-design-vue";
import "@/assets/style.css";
import App from "./App.vue";
import { router } from "./router";
import { auth, is_authenticated } from "./auth.vue";

auth.value.user = await is_authenticated();

const app = createApp(App);

app.use(router).use(Antd).mount("#app");
