<template>
  <div class="home">
    <header>
      <h1>Welcome to the Commerce Platform</h1>
      <nav>
        <router-link to="/login">로그인</router-link>
        <router-link to="/register">회원가입</router-link>
      </nav>
    </header>
    <section class="features">
      <h2>Our Features</h2>
      <div class="feature">
        <h3>관리자 기능</h3>
        <p>관리자는 사용자 관리 및 모든 구매/판매 목록을 조회할 수 있습니다.</p>
      </div>
      <div class="feature">
        <h3>판매자 기능</h3>
        <p>
          판매자는 상품을 등록하고, 수정하며, 자신의 상품을 구매한 내역을 볼 수
          있습니다.
        </p>
      </div>
      <div class="feature">
        <h3>사용자 기능</h3>
        <p>
          사용자는 판매자가 등록한 상품을 주문하고, 장바구니와 찜 기능을 사용할
          수 있습니다.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup></script>

<style scoped>
.home {
  text-align: center;
}

header {
  background-color: #007bff;
  color: white;
  padding: 20px;
}

header h1 {
  margin: 0;
}

nav {
  margin: 20px 0;
}

nav a {
  margin: 0 15px;
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}

.features {
  padding: 20px;
}

.feature {
  margin: 20px 0;
}

.feature h3 {
  margin-bottom: 10px;
  color: #007bff;
}

.feature p {
  margin: 0;
}
</style>
