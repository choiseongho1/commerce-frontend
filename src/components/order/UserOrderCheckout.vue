<template>
  <div class="checkout-container">
    <h1>결제 정보 입력</h1>
    <div class="cart-items">
      <div v-for="item in items" :key="item.cartItemId" class="cart-item">
        <img :src="item.imgUrl" alt="상품 이미지" class="cart-item-image" />
        <div class="cart-item-details">
          <h2>{{ item.name }}</h2>
          <p>수량: {{ item.quantity }} | (+₩{{ item.additionalPrice || 0 }})</p>
          <p>
            총 금액:
            {{ (item.price + (item.additionalPrice || 0)) * item.quantity }}원
          </p>
        </div>
      </div>
    </div>
    <form @submit.prevent="submitOrder">
      <div class="field">
        <div class="control">
          <button
            class="button is-primary"
            type="button"
            @click="requestPayment"
          >
            결제하기
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import * as PortOne from "@portone/browser-sdk/v2";
import { createOrderByUser } from "@/api/order"; // createOrderByUser API import

export default {
  data() {
    return {
      amount: 0,
      items: [],
    };
  },
  mounted() {
    this.amount = this.$route.params.amount; // 결제 금액을 라우트 파라미터로 전달받음
    this.items = JSON.parse(this.$route.params.items); // 장바구니 데이터 수신

    // 카카오 주소 검색 API 스크립트 추가
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.head.appendChild(script);
  },

  methods: {
    async requestPayment() {
      const response = await PortOne.requestPayment({
        // Store ID 설정
        storeId: "store-1d22806e-22f6-420e-bc05-70fb2262884c",
        // 채널 키 설정
        channelKey: "channel-key-471644c6-6a29-4b6d-93ba-0612e51a4bd0",
        paymentId: `${crypto.randomUUID()}`,
        orderName: "test",
        // totalAmount: this.amount,
        totalAmount: 10,
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY",
        productItem: [
          {
            categoryType: "categoryType", // 결제 상품 유형
            categoryId: "categoryId", // 결제 상품 분류
            uid: "uid", // 결제 상품 식별값
            name: "name", // 상품명
            payReferrer: "NAVER_BOOK", // 결제 상품 유입경로
            startDate: "20230421", // 시작일(YYYYMMDD)
            endDate: "20230428", // 종료일(YYYYMMDD)
            sellerId: "sellerId", // 하위 판매자 식별키
            count: 5, // 결제 상품 개수
          },
        ],
      });

      if (response.code != null) {
        // 오류 발생
        return alert(response.message);
      }

      // 결제 완료 후 서버에 주문 정보 전달
      try {
        const notified = await createOrderByUser({
          orderId: response.paymentId,
          buyerName: this.buyerName,
          buyerEmail: this.buyerEmail,
          buyerTel: this.buyerTel,
          buyerAddr: this.buyerAddr,
          buyerPostcode: this.buyerPostcode,
          orderItemSaveList: this.items,
          amount: this.amount,
        });

        if (notified) {
          alert("결제가 완료되었습니다.");
          // 결제 성공 시 로직
        }
      } catch (error) {
        console.error("서버에 주문 정보를 전달하는데 실패했습니다.", error);
        alert("서버에 주문 정보를 전달하는데 실패했습니다.");
      }
    },

    openPostcode() {
      new daum.Postcode({
        oncomplete: (data) => {
          this.buyerAddr = data.address;
          this.buyerPostcode = data.zonecode;
        },
      }).open();
    },
  },
};
</script>

<style scoped>
.checkout-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.field + .field {
  margin-top: 1rem;
}

.button {
  margin-top: 1rem;
}

.cart-items {
  margin-bottom: 20px;
}

.cart-item {
  display: flex;
  margin-bottom: 10px;
}

.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 10px;
}

.cart-item-details {
  flex-grow: 1;
}
</style>
