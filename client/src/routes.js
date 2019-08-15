import Vue from "vue";
import Router from "vue-router";
import ChatWin from "@component/ChatWin";
// import MainWin from "@component/MainWin";

Vue.use(Router);

const router = new Router({
  routes: [
    { path: "/channel/:channel", component: ChatWin }
  ]
});
export default router;
