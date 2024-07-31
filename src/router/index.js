import { createRouter, createWebHistory } from "vue-router";
import { jwtDecode } from "jwt-decode";
import Home from "@/components/MainContainer.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import AdminCategory from "@/components/category/AdminCategory.vue";
import AdminMember from "@/components/member/AdminMember.vue";
import AdminMemberDetail from "@/components/member/AdminMemberDetail.vue"; // AdminMemberDetail 컴포넌트 추가

import SellerProductList from "@/components/product/seller/SellerProduct.vue";
import SellerProductEdit from "@/components/product/seller/SellerProductEdit.vue";

import UserProduct from "@/components/product/user/UserProduct.vue"; // UserProduct 컴포넌트 추가
import UserProductDetail from "@/components/product/user/UserProductDetail.vue"; // UserProductDetail 컴포넌트 추가

import UserCart from "@/components/cart/UserCart.vue"; // UserCart 컴포넌트 추가

import UserOrderCheckout from "@/components/order/UserOrderCheckout.vue";

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
  {
    path: "/seller/products",
    name: "SellerProductList",
    component: SellerProductList,
    meta: { requiresAuth: true, role: "SELLER" },
  },
  {
    path: "/seller/products/create",
    name: "SellerProductCreate",
    component: SellerProductEdit,
    meta: { requiresAuth: true, role: "SELLER" },
  },
  {
    path: "/seller/products/edit/:id",
    name: "SellerProductEdit",
    component: SellerProductEdit,
    meta: { requiresAuth: true, role: "SELLER" },
    props: true,
  },
  {
    path: "/user/products",
    name: "UserProduct",
    component: UserProduct,
    meta: { requiresAuth: true, role: "USER" },
  },

  {
    path: "/user/products/:id",
    name: "UserProductDetail",
    component: UserProductDetail,
    meta: { requiresAuth: true, role: "USER" },
  },

  {
    path: "/user/cart",
    name: "UserCart",
    component: UserCart,
    meta: { requiresAuth: true, role: "USER" },
  },

  {
    path: "/user/order",
    name: "UserOrderCheckout",
    component: UserOrderCheckout,
    meta: { requiresAuth: true, role: "USER" },
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

        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("token");
          next({ name: "Login" });
          return;
        }

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
