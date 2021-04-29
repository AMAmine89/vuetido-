import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Dashboard from "../views/Dashboard";
import Tasks from "../views/Tasks";
import Completed from "../views/Completed";
import Deleted from "../views/Deleted";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "",
    component: () => import("../components/HeaderMenu"),
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "/completed",
        name: "Completed",
        component: Completed
      },
      {
        path: "/tasks",
        name: "Tasks",
        component: Tasks
      },
      {
        path: "/deleted",
        name: "Deleted",
        component: Deleted
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name === "Home") {
    (localStorage.getItem("username") && next({ name: "Dashboard" })) || next();
  } else {
    (!localStorage.getItem("username") && next({ name: "Home" })) || next();
  }
});

export default router;
