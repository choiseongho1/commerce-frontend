<template>
  <div class="seller-product-create">
    <h1>상품 등록</h1>
    <form @submit.prevent="createProduct">
      <div class="form-group">
        <label for="name">상품명</label>
        <input type="text" v-model="product.name" required />
      </div>
      <div class="form-group">
        <label for="description">상품 설명</label>
        <textarea v-model="product.description" required></textarea>
      </div>
      <div class="form-group">
        <label for="price">가격</label>
        <input type="number" v-model="product.price" required />
      </div>
      <div class="form-group">
        <label for="stockQuantity">재고 수량</label>
        <input type="number" v-model="product.stockQuantity" required />
      </div>
      <div class="form-group">
        <label for="categoryId">카테고리 ID</label>
        <input type="number" v-model="product.categoryId" required />
      </div>
      <button type="submit">상품 등록</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

onMounted(() => {
  setMemberId();
});

const product = ref({
  name: "",
  description: "",
  price: 0,
  stockQuantity: 0,
  categoryId: 0,
  memberId: "", // 판매자 ID는 로그인 정보를 통해 설정됨
});

const setMemberId = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    product.value.memberId = decodedToken.memberId; // 토큰에서 memberId를 추출하여 설정
  }
};

const createProduct = async () => {
  try {
    const response = await axios.post(
      `${process.env.VUE_APP_BASE_URL}/seller/api/v1/product`,
      product.value,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    alert("상품이 성공적으로 등록되었습니다.");
    // 상품 목록 페이지로 이동하거나 다른 적절한 처리를 수행합니다.
  } catch (error) {
    console.error("상품 등록에 실패했습니다:", error);
    alert("상품 등록에 실패했습니다.");
  }
};
</script>

<style scoped>
.seller-product-create {
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
.form-group textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #218838;
}
</style>
