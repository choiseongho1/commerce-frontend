<template>
  <div class="cart-container">
    <h1>장바구니</h1>
    <div v-if="cartItems.length === 0" class="empty-cart">
      장바구니에 담긴 상품이 없습니다.
    </div>
    <div v-else>
      <div class="cart-header">
        <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
        <span>전체 {{ cartItems.length }}개</span>
        <button @click="removeSelectedItems">선택 삭제</button>
      </div>
      <div class="cart-items">
        <div class="cart-item" v-for="item in cartItems" :key="item.cartItemId">
          <input type="checkbox" v-model="item.checked" />
          <img :src="item.imgUrl" alt="상품 이미지" class="cart-item-image" />
          <div class="cart-item-details">
            <div class="cart-item-header">
              <h2>{{ item.name }}</h2>
              <button
                @click="removeItem(item.cartItemId)"
                class="delete-button"
              >
                ×
              </button>
            </div>
            <p>수량: {{ item.quantity }} | {{ item.option }}</p>
            <div class="cart-item-price">
              <span class="total-price"
                >{{ item.price * item.quantity }}원</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="cart-summary">
        <div class="summary-item">
          <span>선택상품금액</span>
          <span>{{ selectedItemsTotalPrice }}원</span>
        </div>
        <div class="summary-item">
          <span>할인 금액 예상</span>
          <span>-{{ immediateDiscount }}원</span>
        </div>
        <div class="summary-total">
          <span>주문금액</span>
          <span>{{ orderTotal }}원</span>
        </div>
        <button class="order-button">결제하기</button>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { getCartItems, removeCartItem } from "@/api/cartItem";
import { useAuth } from "@/composables/useAuth";

export default {
  setup() {
    const cartItems = ref([]);
    const { state } = useAuth();
    const selectAll = ref(false);

    const fetchCartItems = async () => {
      const response = await getCartItems();
      cartItems.value = response.data.map((item) => ({
        ...item,
        checked: true,
      }));
    };

    onMounted(fetchCartItems);

    const removeItem = async (cartItemId) => {
      try {
        await removeCartItem(cartItemId);
        await fetchCartItems();
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
      }
    };

    const removeSelectedItems = async () => {
      const selectedItems = cartItems.value.filter((item) => item.checked);
      for (const item of selectedItems) {
        await removeItem(item.id);
      }
      await fetchCartItems();
    };

    const toggleSelectAll = () => {
      cartItems.value.forEach((item) => {
        item.checked = selectAll.value;
      });
    };

    const selectedItemsTotalPrice = computed(() => {
      return cartItems.value
        .filter((item) => item.checked)
        .reduce((total, item) => total + item.price * item.quantity, 0);
    });

    const immediateDiscount = computed(() => {
      // 현재는 고정값으로 설정, 할인 로직을 추가할 수 있습니다.
      return 0; // 예시 할인 금액
    });

    const orderTotal = computed(() => {
      return selectedItemsTotalPrice.value - immediateDiscount.value;
    });

    return {
      cartItems,
      selectAll,
      removeItem,
      removeSelectedItems,
      toggleSelectAll,
      selectedItemsTotalPrice,
      immediateDiscount,
      orderTotal,
    };
  },
};
</script>

<style scoped>
.cart-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.empty-cart {
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
  color: #555;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #ddd;
  padding: 10px 0;
}

.cart-items {
  margin-top: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 8px;
}

.cart-item-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cart-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-item-details h2 {
  font-size: 1.2em;
  margin: 0;
}

.cart-item-details p {
  color: #777;
  margin: 5px 0;
}

.cart-item-price {
  display: flex;
  flex-direction: column;
}

.total-price {
  font-size: 1.1em;
  color: #333;
}

.delete-button {
  background-color: transparent;
  color: #ff4d4f;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}

.delete-button:hover {
  color: #ff7875;
}

.cart-summary {
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.summary-item,
.summary-total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 1.1em;
}

.summary-total {
  font-weight: bold;
  font-size: 1.3em;
}

.order-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2em;
}

.order-button:hover {
  background-color: #0056b3;
}
</style>
