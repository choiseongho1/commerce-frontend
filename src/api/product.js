import axiosInstance from "@/utils/axiosUtils";

const API_URL = "/api/v1/product";

/* Seller */
export const createProduct = (product) => {
  return axiosInstance.post("/seller" + API_URL, product);
};

export const updateProduct = (product) => {
  return axiosInstance.put("/seller" + API_URL, product);
};

export const getProductList = (params) => {
  return axiosInstance.get("/seller" + API_URL, { params });
};

export const deleteProduct = (productId) => {
  return axiosInstance.delete("/seller" + `${API_URL}/${productId}`);
};

export const getProductInfoBySeller = (productId) => {
  return axiosInstance.get("/seller" + `${API_URL}/${productId}`);
};

/* User*/
export const getProductListByUser = (params) => {
  return axiosInstance.get("/user" + API_URL, { params });
};

export const getProductInfoByUser = (productId) => {
  return axiosInstance.get("/user" + `${API_URL}/${productId}`);
};
