<template>
  <div class="container">
    <div class="columns">
      <div class="column is-half">
        <figure class="image">
          <img :src="product.imgUrl" alt="상품 이미지" />
        </figure>
      </div>
      <div class="column is-half">
        <h1 class="title">{{ product.name }}</h1>
        <p class="subtitle">₩{{ product.price }}</p>
        <div class="content">
          <p>{{ product.description }}</p>
        </div>
        <div class="field">
          <label class="label">수량</label>
          <div class="control">
            <input
              class="input"
              type="number"
              v-model.number="quantity"
              min="1"
            />
          </div>
        </div>
        <div class="buttons">
          <button class="button is-primary" @click="addToCart">장바구니</button>
          <button class="button is-danger" @click="buyNow">바로 구매</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getProductInfoByUser } from "@/api/product"; // 상품 상세 정보를 가져오는 API 호출 함수

export default {
  setup() {
    const route = useRoute();
    const product = ref({});
    const quantity = ref(1);

    onMounted(async () => {
      const response = await getProductInfoByUser(route.params.id);
      product.value = response.data;
    });

    const addToCart = () => {
      // 장바구니에 추가 로직 구현
      console.log("장바구니에 추가:", product.value, quantity.value);
    };

    const buyNow = () => {
      // 바로 구매 로직 구현
      console.log("바로 구매:", product.value, quantity.value);
    };

    return { product, quantity, addToCart, buyNow };
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}
.image {
  max-width: 100%;
}
.buttons {
  margin-top: 20px;
}
</style>
