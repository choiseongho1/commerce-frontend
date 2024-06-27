<template>
  <div class="register">
    <h1>회원가입</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="memberId">아이디</label>
        <input type="text" v-model="registerForm.memberId" required />
      </div>
      <div class="form-group">
        <label for="name">이름</label>
        <input type="text" v-model="registerForm.name" required />
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input type="password" v-model="registerForm.password" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">비밀번호 확인</label>
        <input
          type="password"
          v-model="registerForm.confirmPassword"
          required
        />
      </div>
      <div class="form-group">
        <label for="role">역할</label>
        <select v-model="registerForm.role" required>
          <option value="USER">사용자</option>
          <option value="SELLER">판매자</option>
          <option value="ADMIN">관리자</option>
        </select>
      </div>
      <div class="form-group">
        <label for="moblNo">전화번호</label>
        <input type="text" v-model="registerForm.moblNo" required />
      </div>
      <div class="form-group">
        <label for="addr">주소</label>
        <input type="text" v-model="registerForm.addr" required />
      </div>
      <button type="submit">회원가입</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const registerForm = ref({
  memberId: "",
  name: "",
  password: "",
  confirmPassword: "",
  role: "USER",
  moblNo: "",
  addr: "",
});

const register = async () => {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  try {
    await axios.post(
      `${process.env.VUE_APP_BASE_URL}/default`,
      registerForm.value
    );
    alert("회원가입이 완료되었습니다.");
  } catch (error) {
    console.error("회원가입 실패:", error);
    alert("회원가입에 실패했습니다. 다시 시도해주세요.");
  }
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white; /* 배경색 추가 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1em;
}

button:hover {
  background-color: #0056b3;
}
</style>
