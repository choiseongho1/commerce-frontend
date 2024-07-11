<template>
  <div class="cart-container">
    <h1>장바구니</h1>
    <div v-if="groupedCartItems.length === 0" class="empty-cart">
      장바구니에 담긴 상품이 없습니다.
    </div>
    <div v-else>
      <div class="cart-header">
        <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
        <span>전체 {{ cartItems.length }}개</span>
        <button @click="removeSelectedItems">선택 삭제</button>
      </div>
      <div class="cart-groups">
        <div
          class="cart-group"
          v-for="(group, productId) in groupedCartItems"
          :key="productId"
        >
          <div class="group-header">
            <input
              type="checkbox"
              v-model="group.checked"
              @change="toggleGroupSelect(group)"
            />
            <img :src="group[0].imgUrl" alt="상품 이미지" class="group-image" />
            <div class="group-details">
              <h2>{{ group[0].name }}</h2>
            </div>
            <button
              @click="removeItem(group[0].cartItemId)"
              class="delete-button group-delete"
            >
              ×
            </button>
          </div>
          <div class="group-content">
            <div class="cart-item" v-for="item in group" :key="item.cartItemId">
              <div class="cart-item-details">
                <div class="cart-item-header">
                  <h2>{{ item.optionName ? item.optionName : "기본상품" }}</h2>
                  <button
                    @click="removeItem(item.cartItemId)"
                    class="delete-button"
                  >
                    ×
                  </button>
                </div>
                <p>
                  수량: {{ item.quantity }} | (+₩{{
                    item.additionalPrice || 0
                  }})
                </p>
                <div class="cart-item-price">
                  <span class="total-price"
                    >{{
                      (item.price + (item.additionalPrice || 0)) *
                      item.quantity
                    }}원</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="group-summary">
            <div class="summary-item">
              <span>선택상품금액</span>
              <span>{{ groupTotalPrice(group) }}원</span>
            </div>
            <div class="summary-item">
              <span>할인 금액 예상</span>
              <span>-{{ groupImmediateDiscount(group) }}원</span>
            </div>
            <div class="summary-total">
              <span>주문금액</span>
              <span>{{ groupOrderTotal(group) }}원</span>
            </div>
            <button class="order-button">주문하기</button>
          </div>
        </div>
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
        await removeItem(item.cartItemId);
      }
      await fetchCartItems();
    };

    const toggleSelectAll = () => {
      cartItems.value.forEach((item) => {
        item.checked = selectAll.value;
      });
    };

    const groupedCartItems = computed(() => {
      return cartItems.value.reduce((groups, item) => {
        if (!groups[item.productId]) {
          groups[item.productId] = [];
        }
        groups[item.productId].push(item);
        return groups;
      }, {});
    });

    const groupTotalPrice = (group) => {
      return group.reduce(
        (total, item) =>
          total + (item.price + (item.additionalPrice || 0)) * item.quantity,
        0
      );
    };

    const groupImmediateDiscount = (group) => {
      return 0; // 예시 할인 금액
    };

    const groupOrderTotal = (group) => {
      return groupTotalPrice(group) - groupImmediateDiscount(group);
    };

    const toggleGroupSelect = (group) => {
      const allChecked = group.every((item) => item.checked);
      group.forEach((item) => {
        item.checked = !allChecked;
      });
    };

    return {
      cartItems,
      selectAll,
      removeItem,
      removeSelectedItems,
      toggleSelectAll,
      groupedCartItems,
      groupTotalPrice,
      groupImmediateDiscount,
      groupOrderTotal,
      toggleGroupSelect,
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

.cart-groups {
  margin-top: 20px;
}

.cart-group {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.group-header {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd; /* 왼쪽과 오른쪽을 나누는 선 */
}

.group-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 8px;
}

.group-details {
  flex-grow: 1;
}

.group-content {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
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

.cart-item-header h2 {
  font-size: 1.2em;
  margin: 0;
}

.cart-item-header p {
  color: #777;
  margin: 0 0 0 10px;
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

.group-summary .summary-item,
.group-summary .summary-total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 1.1em;
}

.group-summary .summary-total {
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
