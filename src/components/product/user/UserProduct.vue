<template>
  <div class="container mt-6">
    <div class="columns is-multiline">
      <div
        class="column is-one-quarter"
        v-for="product in products"
        :key="product.id"
      >
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="product.imgUrl" alt="상품 이미지" />
              <span
                class="icon is-large has-text-danger heart-icon"
                @click="toggleWishlist(product.productId)"
              >
                <i
                  :class="
                    product.isWishlisted ? 'fas fa-heart' : 'far fa-heart'
                  "
                ></i>
              </span>
            </figure>
          </div>
          <div class="card-content">
            <p class="title is-4">{{ product.name }}</p>
            <p class="subtitle is-6">₩{{ product.price }}</p>
          </div>
          <footer class="card-footer">
            <router-link
              class="card-footer-item"
              :to="`/user/products/${product.productId}`"
              >상세 보기</router-link
            >
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getProductListByUser, toggleWishlist } from "@/api/product";

export default {
  setup() {
    const products = ref([]);

    const loadProducts = async () => {
      const response = await getProductListByUser();
      products.value = response.data.map((product) => ({
        ...product,
        isWishlisted: false, // 초기 찜 상태
      }));
    };

    const toggleWishlist = async (productId) => {
      const product = products.value.find((p) => p.productId === productId);
      product.isWishlisted = !product.isWishlisted;
      await toggleWishlist(productId);
    };

    onMounted(loadProducts);

    return { products, toggleWishlist };
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}
.card {
  position: relative;
}
.heart-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
}
</style>
