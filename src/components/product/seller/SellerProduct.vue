<template>
  <div class="seller-product">
    <h1 class="title">상품 목록</h1>
    <div class="button-container">
      <router-link to="/seller/products/create" class="button is-primary"
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
            <div class="media">
              <div class="media-content">
                <p class="title is-4">{{ product.name }}</p>
                <p class="subtitle is-6">₩{{ product.price }}</p>
              </div>
            </div>
            <div class="content">
              <router-link
                :to="`/seller/products/edit/${product.productId}`"
                class="button is-small is-info mr-2"
                >수정</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!products.length">
      <p>상품 목록이 없습니다.</p>
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
.seller-product {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.button-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}

.card {
  margin-bottom: 20px;
}

.card-image img {
  object-fit: cover;
}

.title {
  margin-bottom: 20px;
}

.mr-2 {
  margin-right: 0.5rem;
}
</style>
