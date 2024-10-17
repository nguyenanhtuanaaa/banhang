import axios from "axios";
import Cookies from "js-cookie";

const access_token = Cookies.get("access_token");
// Tạo instance của axios với các config cơ bản
const httpRequest = axios.create({
  baseURL: "http://localhost:3030/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  },
});

// Hàm GET request
export const get = async (path, options = {}) => {
  try {
    const response = await httpRequest.get(path, options);
    return response.data;
  } catch (error) {
    console.error("GET request failed:", error);
    throw error.response.data; // Ném lỗi để xử lý phía gọi hàm
  }
};

// Hàm POST request
export const post = async (path, data, options = {}) => {
  try {
    const response = await httpRequest.post(path, data, options);
    return response.data;
  } catch (error) {
    console.error("POST request failed:", error);
    throw error.response.data; // Ném lỗi để xử lý phía gọi hàm
  }
};

export const put = async (path, data, options = {}) => {
  try {
    const response = await httpRequest.put(path, data, options);
    return response.data;
  } catch (error) {
    console.error("POST request failed:", error);
    throw error.response.data; // Ném lỗi để xử lý phía gọi hàm
  }
};

export const deleteMethod = async (path, options = {}) => {
  try {
    const response = await httpRequest.delete(path, options);
    return response.data;
  } catch (error) {
    console.error("DELETE request failed:", error);
    throw error; // Ném lỗi để xử lý phía gọi hàm
  }
};

export default httpRequest;
