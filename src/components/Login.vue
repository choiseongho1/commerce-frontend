<template>
  <div class="login">
    <h1>로그인</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="memberId">아이디</label>
        <input type="text" v-model="loginForm.memberId" required />
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input type="password" v-model="loginForm.password" required />
      </div>
      <button type="submit">로그인</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const loginForm = ref({
      username: "",
      password: "",
    });
    const { setLoginResult } = useAuth();
    const router = useRouter();

    const login = async () => {
      console.log(`${process.env.VUE_APP_BASE_URL}`);
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}/default/login`,
          loginForm.value,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // CORS 설정 추가
          }
        );
        const loginResult = response.data;
        console.log("Login Result:", loginResult); // 디버그 로그 추가
        localStorage.setItem("token", loginResult.loginToken);
        setLoginResult(loginResult);
        router.push("/"); // 로그인 후 리디렉션할 페이지 설정
      } catch (error) {
        console.error("로그인 실패:", error);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    };

    return {
      loginForm,
      login,
    };
  },
};
</script>

<style scoped>
.login {
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

.form-group input {
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
