<template>
  <div class="admin-category">
    <h1>카테고리 관리</h1>
    <form @submit.prevent="createCategory">
      <div class="form-group">
        <label for="categoryName">카테고리 이름</label>
        <input type="text" v-model="newCategoryName" required />
        <button type="submit">카테고리 등록</button>
      </div>
    </form>

    <div class="category-list">
      <h2>카테고리 목록</h2>
      <ul>
        <li v-for="category in categories" :key="category.id">
          <input type="text" v-model="category.name" />
          <button @click="updateCategory(category)">수정</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axiosInstance from "@/utils/axiosUtils";

const newCategoryName = ref("");
const categories = ref([]);

const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get("/admin/api/v1/category");
    categories.value = response.data;
  } catch (error) {
    console.error("카테고리 목록을 가져오는 데 실패했습니다:", error);
  }
};

const createCategory = async () => {
  try {
    await axiosInstance.post("/admin/api/v1/category", {
      name: newCategoryName.value,
    });
    newCategoryName.value = "";
    fetchCategories(); // 카테고리를 생성한 후 전체 목록을 다시 조회합니다.
  } catch (error) {
    console.error("카테고리 등록에 실패했습니다:", error);
  }
};

const updateCategory = async (category) => {
  try {
    await axiosInstance.put(`/admin/api/v1/category`, category);
    alert("카테고리가 성공적으로 수정되었습니다.");
    fetchCategories(); // 카테고리를 수정한 후 전체 목록을 다시 조회합니다.
  } catch (error) {
    console.error("카테고리 수정에 실패했습니다:", error);
  }
};

onMounted(fetchCategories);
</script>

<style scoped>
.admin-category {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
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
}

button {
  padding: 5px 10px;
  margin-right: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}

.category-list {
  margin-top: 20px;
}

.category-list ul {
  list-style-type: none;
  padding: 0;
}

.category-list li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.category-list li input {
  flex: 1;
  margin-right: 10px;
}
</style>
