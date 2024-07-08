import axiosInstance from "@/utils/axiosUtils";

const CART_API_URL = "api/v1/cart-item";

export const addItemToCart = (cartItemAddDto) => {
  return axiosInstance.post(`/user/${CART_API_URL}`, cartItemAddDto);
};

export const getCartItems = () => {
  return axiosInstance.get(`/user/${CART_API_URL}`);
};

export const removeCartItem = (cartItemId) => {
  return axiosInstance.delete(`/user/${CART_API_URL}/${cartItemId}`);
};
