import axiosInstance from "@/utils/axiosUtils";

const API_URL = "/seller/api/v1/product";

export const createProduct = (product) => {
  return axiosInstance.post(API_URL, product);
};

export const updateProduct = (product) => {
  return axiosInstance.put(API_URL, product);
};

export const getProductList = (params) => {
  return axiosInstance.get(API_URL, { params });
};

export const deleteProduct = (productId) => {
  return axiosInstance.delete(`${API_URL}/${productId}`);
};
