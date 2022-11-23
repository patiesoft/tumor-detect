import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/patient-register",
    name: "home",
    component: () => import("../views/RegistrationView.vue"),
  },
  {
    path: "/technician",
    name: "technician",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/technician/dashboard.vue"),
    children: [
      {
        path: "",
        name: "uploadImage",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/uploadImage.vue"),
      },
    ],
  },
  {
    path: "/admin",
    name: "admin",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/admin/dashboard.vue"),
    children: [
      {
        path: "",
        name: "add-doctor",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/admin/addDoctor.vue"
          ),
      },
      {
        path: "add-technician",
        name: "add-technician",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/admin/addTechnician.vue"
          ),
      },
    ],
  },
  {
    path: "/patient",
    name: "home",
    component: () => import("../views/patient/Dashboard.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
