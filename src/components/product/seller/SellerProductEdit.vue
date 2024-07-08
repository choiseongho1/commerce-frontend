<template>
  <div class="container mt-6">
    <div class="box">
      <h1 class="title" v-if="isEdit">상품 수정</h1>
      <h1 class="title" v-else>상품 등록</h1>
      <form @submit.prevent="saveProduct">
        <div class="field">
          <label class="label">상품명</label>
          <div class="control">
            <input class="input" v-model="product.name" required />
          </div>
        </div>
        <div class="field">
          <label class="label">가격</label>
          <div class="control">
            <input
              class="input"
              type="number"
              v-model="product.price"
              required
            />
          </div>
        </div>
        <div class="field">
          <label class="label">재고 수량</label>
          <div class="control">
            <input
              class="input"
              type="number"
              v-model="product.stockQuantity"
              required
            />
          </div>
        </div>
        <div class="field">
          <label class="label">카테고리</label>
          <div class="control">
            <div class="select">
              <select v-model="product.categoryId" required>
                <option value="" disabled selected>
                  카테고리를 선택하세요
                </option>
                <option
                  v-for="category in categories"
                  :key="category.categoryId"
                  :value="category.categoryId"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">상품 이미지</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="product.imgUrl"
              placeholder="이미지 URL을 입력하세요"
              required
            />
          </div>
        </div>
        <div class="field">
          <label class="label">상세 설명</label>
          <div class="control">
            <textarea
              class="textarea"
              v-model="product.description"
              required
            ></textarea>
          </div>
        </div>

        <!-- 옵션 추가 영역 -->
        <div class="field">
          <label class="label">옵션</label>
          <div
            v-for="(option, index) in product.options"
            :key="index"
            class="option-group"
          >
            <div class="control is-flex">
              <input
                class="input mr-2"
                type="text"
                v-model="option.name"
                placeholder="옵션 이름"
                required
              />
              <input
                class="input mr-2"
                type="number"
                v-model="option.additionalPrice"
                placeholder="추가 가격"
                required
              />
              <button
                class="button is-danger"
                @click.prevent="removeOption(index)"
              >
                옵션 삭제
              </button>
            </div>
          </div>
          <button class="button is-primary mt-2" @click.prevent="addOption">
            옵션 추가
          </button>
        </div>

        <div class="field">
          <div class="control">
            <button class="button is-primary" type="submit">저장</button>
          </div>
        </div>
      </form>
      <button
        v-if="isEdit"
        @click="removeProduct"
        class="button is-danger mt-4"
      >
        삭제
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductInfoBySeller,
} from "@/api/product";
import { fetchCategoriesBySeller } from "@/api/category";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const product = ref({
      name: "",
      price: 0,
      stockQuantity: 0,
      categoryId: "",
      imgUrl: "",
      description: "",
      options: [],
    });
    const categories = ref([]);
    const route = useRoute();
    const router = useRouter();
    const isEdit = ref(false);

    onMounted(async () => {
      const categoryResponse = await fetchCategoriesBySeller();
      categories.value = categoryResponse.data;

      if (route.params.id) {
        isEdit.value = true;
        const response = await getProductInfoBySeller(route.params.id);
        const productData = response.data;
        product.value = {
          ...productData,
          options: productData.options || [], // 옵션이 없을 경우 빈 배열로 초기화
        };
      }
    });

    const addOption = () => {
      product.value.options.push({ name: "", additionalPrice: 0 });
    };

    const removeOption = (index) => {
      product.value.options.splice(index, 1);
    };

    const saveProduct = async () => {
      if (isEdit.value) {
        await updateProduct(product.value);
      } else {
        await createProduct(product.value);
      }
      router.push("/seller/products");
    };

    const removeProduct = async () => {
      await deleteProduct(product.value.id);
      router.push("/seller/products");
    };

    return {
      product,
      saveProduct,
      removeProduct,
      categories,
      isEdit,
      addOption,
      removeOption,
    };
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}
.box {
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
}
.title {
  margin-bottom: 20px;
}
.mt-4 {
  margin-top: 1.5rem;
}
.field + .field {
  margin-top: 1rem;
}
.image {
  margin-top: 1rem;
}
.option-group {
  margin-bottom: 10px;
}
.button {
  margin-top: 10px;
}
.is-flex {
  display: flex;
  align-items: center;
}
.mr-2 {
  margin-right: 0.5rem;
}
</style>
