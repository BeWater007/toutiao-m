import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login";
import Layout from "@/views/layout";
import Home from "@/views/home";
import My from "@/views/my";
import Wenda from "@/views/wenda";
import Video from "@/views/video";

Vue.use(VueRouter);
// 路由规则
const routes = [
  { path: "/login", name: "login", component: Login },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: Home,
        name: "home",
      },
      {
        path: "wenda",
        component: Wenda,
        name: "wenda",
      },
      {
        path: "video",
        component: Video,
        name: "video",
      },
      {
        path: "my",
        component: My,
        name: "my",
      },
    ],
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/search"),
  },
  {
    path: "/article/:articleId",
    component: () => import("../views/article"),
    name: "article",
    props: true, //开启props传参，把路由的参数映射到组件的props对象当中
  },
  {
    path: "/user-profile",
    name: "user-profile",
    component: () => import("../views/user-profile"),
  },
];

const router = new VueRouter({
  routes,
});
//解决反复跳转页面报错
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};
export default router;
