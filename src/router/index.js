import { createRouter, createWebHistory } from "vue-router";

import dashboard from '../pages/master/dashboard'

import products from '../pages/products'
import categories from '../pages/categories'
import user from '../pages/user'
import login from '../pages/login'
import revenue from '../pages/revenue'
const routes = [
  {
    name: "login",
    path: "/",
    component: login,
  },
  {
    name: "Dashboard",
    path: "/",
    component: dashboard,
    children: [
      {
        name: "products",
        path: "/products",
        component: products,
      },
      {
        name: "categories",
        path: "/categories",
        component: categories,
      },
      {
        name: "user",
        path: "/user",
        component: user,
      },
      {
        name: "revenue",
        path: "/revenue",
        component: revenue,
      },
    ],
  },
];
const router = Router();
export default router;
function Router() {
  const router = new createRouter({
    history: createWebHistory(),
    routes,
  });
  return router;
}
