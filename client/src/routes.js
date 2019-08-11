import Vue from "vue";
import Router from "vue-router";
import ChatWindow from "@component/ChatWindow";

Vue.use(Router);

const router = new Router({
  routes: [
    // 动态路径参数 以冒号开头
    { path: "/channel/:channel", component: ChatWindow }
  ]
});
export default router;
