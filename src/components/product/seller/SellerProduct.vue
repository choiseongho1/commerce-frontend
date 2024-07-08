<template>
  <div class="container mt-6">
    <div class="buttons">
      <router-link class="button is-primary" to="/seller/products/create"
        >상품 등록</router-link
      >
    </div>
    <div class="columns is-multiline">
      <div
        class="column is-one-quarter"
        v-for="product in products"
        :key="product.productId"
      >
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="product.imgUrl" alt="상품 이미지" />
            </figure>
          </div>
          <div class="card-content">
            <p class="title is-4">{{ product.name }}</p>
            <p class="subtitle is-6">₩{{ product.price }}</p>
          </div>
          <footer class="card-footer">
            <router-link
              class="card-footer-item"
              :to="`/seller/products/edit/${product.productId}`"
              >수정</router-link
            >
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getProductList } from "@/api/product";

export default {
  setup() {
    const products = ref([]);

    const loadProducts = async () => {
      const response = await getProductList();
      products.value = response.data;
    };

    onMounted(loadProducts);

    return { products };
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.card-content {
  flex-grow: 1;
}
.card-footer {
  justify-content: center;
}
.buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
