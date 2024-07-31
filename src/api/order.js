import axiosInstance from "@/utils/axiosUtils";

const API_URL = "/api/v1/order";

/* User*/
export const createOrderByUser = (params) => {
  return axiosInstance.post("/user" + API_URL, params);
};
