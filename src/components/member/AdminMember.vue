<template>
  <div class="admin-member">
    <h1>회원 목록 조회</h1>
    <div class="filter-container">
      <form @submit.prevent="fetchMembers" class="filter-form">
        <div class="form-group">
          <label for="memberId">아이디</label>
          <input type="text" v-model="searchConditions.memberId" />
        </div>
        <div class="form-group">
          <label for="name">이름</label>
          <input type="text" v-model="searchConditions.name" />
        </div>
        <div class="form-group">
          <label for="role">역할</label>
          <select v-model="searchConditions.role">
            <option value="">전체</option>
            <option value="ADMIN">관리자</option>
            <option value="SELLER">판매자</option>
            <option value="USER">사용자</option>
          </select>
        </div>
        <div class="form-group">
          <button type="submit">조회</button>
        </div>
      </form>
    </div>
    <div class="table-container" v-if="members.length">
      <table>
        <thead>
          <tr>
            <th>아이디</th>
            <th>이름</th>
            <th>역할</th>
            <th>전화번호</th>
            <th>주소</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in members" :key="member.memberId">
            <td>
              <router-link
                :to="{
                  name: 'AdminMemberDetail',
                  params: { memberId: member.memberId },
                }"
              >
                {{ member.memberId }}
              </router-link>
            </td>
            <td>{{ member.name }}</td>
            <td>{{ member.role }}</td>
            <td>{{ member.moblNo }}</td>
            <td>{{ member.addr }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>회원 목록이 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axiosInstance from "@/utils/axiosUtils";

const searchConditions = ref({
  memberId: "",
  name: "",
  role: "",
});

const members = ref([]);

const fetchMembers = async () => {
  try {
    const response = await axiosInstance.get("/admin/api/v1/member", {
      params: searchConditions.value,
    });
    members.value = response.data;
  } catch (error) {
    console.error("회원 목록을 가져오는 데 실패했습니다:", error);
  }
};

fetchMembers();
</script>

<style scoped>
.admin-member {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.filter-container {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.filter-form {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-right: 15px;
  flex: 1;
}

.form-group label {
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
}

.form-group button:hover {
  background-color: #0056b3;
}

.table-container {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>
