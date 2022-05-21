import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Home from "./Home.vue";
import Detail from "./Detail";
import store from "./store";

const routes = [
  { path: "/", component: Home },
  { path: "/detail/:id", component: Detail, name: 'detail', props: true },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
const app = createApp(App);
app.use(router);
app.mount("#app");
app.use(store);

export default router;
