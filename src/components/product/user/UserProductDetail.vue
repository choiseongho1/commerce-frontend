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

        <!-- 옵션 선택 섹션 -->
        <div v-if="product.options && product.options.length > 0" class="field">
          <label class="label">옵션 선택</label>
          <div class="control">
            <div class="select">
              <select v-model="currentOption" @change="addOption">
                <option value="" disabled>옵션을 선택하세요</option>
                <option :value="null">기본상품</option>
                <option
                  v-for="option in product.options"
                  :key="option.optionId"
                  :value="option"
                >
                  {{ option.name }} (+₩{{ option.additionalPrice }})
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- 선택된 옵션 정보 표시 및 수량 선택 -->
        <div
          v-for="(option, index) in selectedOptions"
          :key="index"
          class="selected-option"
        >
          <div class="columns is-vcentered">
            <div class="column">
              <p>
                선택된 옵션:
                {{
                  option
                    ? `${option.name} (+₩${option.additionalPrice})`
                    : "기본상품"
                }}
              </p>
            </div>
            <div class="column is-narrow">
              <div class="field has-addons">
                <p class="control">
                  <button class="button" @click="decreaseQuantity(index)">
                    -
                  </button>
                </p>
                <p class="control">
                  <input
                    class="input"
                    type="number"
                    v-model.number="optionQuantities[index]"
                    min="1"
                    readonly
                  />
                </p>
                <p class="control">
                  <button class="button" @click="increaseQuantity(index)">
                    +
                  </button>
                </p>
              </div>
            </div>
            <div class="column is-narrow">
              <button class="button is-danger" @click="removeOption(index)">
                삭제
              </button>
            </div>
          </div>
        </div>

        <!-- 총 금액 표시 -->
        <div class="total-price">
          <p>총 상품 금액: ₩{{ formattedTotalPrice }}</p>
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
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { getProductInfoByUser } from "@/api/product";
import { addItemToCart } from "@/api/cartItem";
import { useAuth } from "@/composables/useAuth";

export default {
  setup() {
    const route = useRoute();
    const product = ref({});
    const selectedOptions = ref([]);
    const currentOption = ref("");
    const optionQuantities = ref([]);
    const { state } = useAuth();

    onMounted(async () => {
      const response = await getProductInfoByUser(route.params.id);
      product.value = response.data;
      if (!product.value.options || product.value.options.length === 0) {
        selectedOptions.value.push(null); // 기본 상품을 자동으로 추가
        optionQuantities.value.push(1);
      }
    });

    const addOption = () => {
      if (!selectedOptions.value.includes(currentOption.value)) {
        selectedOptions.value.push(currentOption.value);
        optionQuantities.value.push(1);
      }
      currentOption.value = ""; // 선택된 옵션 초기화
    };

    const removeOption = (index) => {
      selectedOptions.value.splice(index, 1);
      optionQuantities.value.splice(index, 1);
    };

    const increaseQuantity = (index) => {
      optionQuantities.value[index]++;
    };

    const decreaseQuantity = (index) => {
      if (optionQuantities.value[index] > 1) {
        optionQuantities.value[index]--;
      }
    };

    const formattedTotalPrice = computed(() => {
      let total = 0;
      selectedOptions.value.forEach((option, index) => {
        const quantity = optionQuantities.value[index];
        if (option) {
          total += (product.value.price + option.additionalPrice) * quantity;
        } else {
          total += product.value.price * quantity;
        }
      });
      return total.toLocaleString();
    });

    const addToCart = async () => {
      try {
        const cartItems = selectedOptions.value.map((option, index) => ({
          productId: product.value.productId,
          quantity: optionQuantities.value[index],
          memberId: state.memberId,
          optionId: option ? option.optionId : null,
        }));

        for (const cartItem of cartItems) {
          const response = await addItemToCart(cartItem);
          console.log("장바구니에 추가됨:", response.data);
        }

        alert("장바구니에 상품이 추가되었습니다.");
      } catch (error) {
        console.error("장바구니 추가 실패:", error);
        alert("장바구니에 상품을 추가하는 데 실패했습니다.");
      }
    };

    const buyNow = () => {
      // 바로 구매 로직 구현
      console.log(
        "바로 구매:",
        product.value,
        selectedOptions.value,
        optionQuantities.value
      );
    };

    return {
      product,
      selectedOptions,
      currentOption,
      optionQuantities,
      addOption,
      removeOption,
      increaseQuantity,
      decreaseQuantity,
      formattedTotalPrice,
      addToCart,
      buyNow,
    };
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
.selected-option {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}
.total-price {
  margin-top: 20px;
  font-weight: bold;
  color: red;
}
.field.has-addons {
  display: flex;
}
.field.has-addons .control {
  margin-right: 5px;
}
</style>
