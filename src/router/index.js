import { createRouter, createWebHistory } from "vue-router";
import { jwtDecode } from "jwt-decode";
import Home from "@/components/MainContainer.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import AdminCategory from "@/components/category/AdminCategory.vue";
import AdminMember from "@/components/member/AdminMember.vue";
import AdminMemberDetail from "@/components/member/AdminMemberDetail.vue"; // AdminMemberDetail 컴포넌트 추가

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/admin/categories",
    name: "AdminCategory",
    component: AdminCategory,
    meta: { requiresAuth: true, role: "ADMIN" },
  },
  {
    path: "/admin/members",
    name: "AdminMember",
    component: AdminMember,
    meta: { requiresAuth: true, role: "ADMIN" },
  },
  {
    path: "/admin/members/:memberId",
    name: "AdminMemberDetail",
    component: AdminMemberDetail,
    meta: { requiresAuth: true, role: "ADMIN" },
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next({ name: "Login" });
    } else {
      try {
        console.log("Token before decoding:", token);
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
        const userRole = decodedToken.role;

        if (to.meta.role && to.meta.role !== userRole) {
          next({ name: "Login" });
        } else {
          next();
        }
      } catch (error) {
        console.error("Token decoding failed:", error);
        next({ name: "Login" });
      }
    }
  } else {
    next();
  }
});

export default router;
