<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-left">
        <div class="nav-logo">
          <router-link to="/">홈</router-link>
        </div>
        <ul class="nav-menu">
          <li v-if="isLoggedIn && state.role === 'ADMIN'" class="nav-item">
            <router-link to="/admin/categories" class="nav-link"
              >카테고리 관리</router-link
            >
            <router-link to="/admin/members" class="nav-link"
              >사용자 관리</router-link
            >
          </li>
          <li v-if="isLoggedIn && state.role === 'SELLER'" class="nav-item">
            <router-link to="/seller/products" class="nav-link"
              >상품 등록/수정</router-link
            >
          </li>
          <li v-if="isLoggedIn && state.role === 'USER'" class="nav-item">
            <router-link to="/user/products" class="nav-link"
              >상품 목록</router-link
            >
          </li>
        </ul>
      </div>
      <div class="nav-right">
        <ul class="nav-menu">
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link to="/login" class="nav-link">로그인</router-link>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link to="/register" class="nav-link">회원가입</router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <router-link to="/user/cart" class="nav-link">장바구니</router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <span class="nav-link"
              >안녕하세요 {{ state.name }}님! [{{ state.role }}]</span
            >
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <a href="#" @click.prevent="logout" class="nav-link">로그아웃</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useAuth } from "../composables/useAuth";
import { useRouter } from "vue-router";

const { state, setLoginResult } = useAuth();
const router = useRouter();

const isLoggedIn = computed(() => !!state.loginToken);

const logout = () => {
  setLoginResult({
    memberId: "",
    name: "",
    moblNo: "",
    addr: "",
    loginToken: "",
    role: "",
  });
  localStorage.removeItem("token");
  router.push("/");
};
</script>

<style scoped>
.navbar {
  background-color: #333;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px; /* 고정 높이 설정 */
}

.nav-left {
  display: flex;
  align-items: center;
}

.nav-right {
  display: flex;
  align-items: center;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.nav-logo a {
  color: white;
  font-size: 1.5em;
  text-decoration: none;
}

.nav-menu {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-left: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.1em;
  padding: 0 10px; /* 좌우 패딩 추가 */
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
