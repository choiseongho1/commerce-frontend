import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { useAuth } from "./composables/useAuth";
import { jwtDecode } from "jwt-decode";

const app = createApp(App);

const { setLoginResult } = useAuth();
const token = localStorage.getItem("token");
if (token) {
  console.log("etst");
  try {
    const decodedToken = jwtDecode(token);
    setLoginResult({
      memberId: decodedToken.memberId,
      name: decodedToken.name,
      moblNo: decodedToken.moblNo,
      addr: decodedToken.addr,
      loginToken: token,
      role: decodedToken.role,
    });
  } catch (error) {
    console.error("Token decoding failed:", error);
  }
}

app.use(router);
app.mount("#app");
