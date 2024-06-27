<template>
  <div class="seller-dashboard">
    <h1>판매자 대시보드</h1>
    <div class="section">
      <h2>내 상품 목록</h2>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.name }} - {{ product.price }}원
        </li>
      </ul>
    </div>
    <div class="section">
      <h2>주문 목록</h2>
      <ul>
        <li v-for="order in orders" :key="order.id">
          주문자: {{ order.user.name }}, 상품: {{ order.product.name }}, 수량:
          {{ order.quantity }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const products = ref([]);
const orders = ref([]);

const baseURL = process.env.VUE_APP_BASE_URL;

const fetchSellerProducts = async () => {
  try {
    const response = await axios.get(`${baseURL}/seller/api/v1/product`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    products.value = response.data;
  } catch (error) {
    console.error("상품 목록을 가져오는 데 실패했습니다:", error);
  }
};

const fetchSellerOrders = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/seller/orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    orders.value = response.data;
  } catch (error) {
    console.error("주문 목록을 가져오는 데 실패했습니다:", error);
  }
};

onMounted(() => {
  fetchSellerProducts();
  fetchSellerOrders();
});
</script>

<style scoped>
.seller-dashboard {
  padding: 20px;
}

.section {
  margin-bottom: 20px;
}

.section h2 {
  margin-bottom: 10px;
}

.section ul {
  list-style-type: none;
  padding: 0;
}

.section ul li {
  background: #f4f4f4;
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 5px;
}
</style>
