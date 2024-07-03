import axiosInstance from "@/utils/axiosUtils";

const API_URL = "/api/v1/category";

/* --------------------- admin ------------------------ */
export const fetchCategories = () => {
  return axiosInstance.get("/admin" + API_URL);
};

export const createCategory = (category) => {
  return axiosInstance.post("/admin" + API_URL, category);
};

export const updateCategory = (category) => {
  return axiosInstance.put("/admin" + API_URL, category);
};

/* --------------------- seller ------------------ */
export const fetchCategoriesBySeller = () => {
  return axiosInstance.get("/seller" + API_URL);
};
