<template>
  <div class="admin-member-detail">
    <h1>회원 상세 정보</h1>
    <div v-if="member">
      <form @submit.prevent="updateMember">
        <div class="form-group">
          <label for="memberId">아이디</label>
          <input type="text" v-model="member.memberId" readonly />
        </div>
        <div class="form-group">
          <label for="name">이름</label>
          <input type="text" v-model="member.name" readonly />
        </div>
        <div class="form-group">
          <label for="role">역할</label>
          <select v-model="member.role">
            <option value="SELLER">판매자</option>
            <option value="USER">사용자</option>
          </select>
        </div>
        <div class="form-group">
          <label for="moblNo">전화번호</label>
          <input type="text" v-model="member.moblNo" />
        </div>
        <div class="form-group">
          <label for="addr">주소</label>
          <input type="text" v-model="member.addr" />
        </div>
        <button type="submit">수정</button>
      </form>
    </div>
    <div v-else>
      <p>해당 아이디의 사용자를 찾을 수 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axiosInstance from "@/utils/axiosUtils";

const route = useRoute();
const router = useRouter();
const member = ref(null);

const fetchMemberDetail = async () => {
  try {
    const response = await axiosInstance.get(
      `/admin/api/v1/member/${route.params.memberId}`
    );
    member.value = response.data;
  } catch (error) {
    console.error("회원 정보를 가져오는 데 실패했습니다:", error);
    member.value = null;
  }
};

const updateMember = async () => {
  try {
    await axiosInstance.put(`/admin/api/v1/member`, member.value);
    alert("회원 정보가 성공적으로 수정되었습니다.");
    router.push("/admin/members");
  } catch (error) {
    console.error("회원 정보를 수정하는 데 실패했습니다:", error);
    alert("회원 정보를 수정하는 데 실패했습니다. 다시 시도해주세요.");
  }
};

onMounted(fetchMemberDetail);
</script>

<style scoped>
.admin-member-detail {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
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
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1em;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}
</style>
