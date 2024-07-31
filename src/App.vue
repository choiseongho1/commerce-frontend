<template>
  <div id="app">
    <Nav />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import Nav from "./components/Nav.vue";
</script>

<style>
body,
html,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.content {
  padding-top: 60px; /* 네비게이션 바 높이만큼 여백 추가 */
}
</style>
