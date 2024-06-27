import { reactive } from "vue";

const state = reactive({
  memberId: "",
  name: "",
  moblNo: "",
  addr: "",
  loginToken: "",
  role: "", // 사용자 역할 추가
});

const setLoginResult = (loginResult) => {
  state.memberId = loginResult.memberId;
  state.name = loginResult.name;
  state.moblNo = loginResult.moblNo;
  state.addr = loginResult.addr;
  state.loginToken = loginResult.loginToken;
  state.role = loginResult.role; // 사용자 역할 설정
};

export const useAuth = () => {
  return {
    state,
    setLoginResult,
  };
};
