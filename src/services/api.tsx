import axios from "axios";

const BASE_URL = "http://localhost:8800/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const handleRequest = async (
  requestFunction: () => Promise<any>
): Promise<any> => {
  try {
    const response = await requestFunction();
    return response.data;
  } catch (error: any) {
    console.error("API request error:", error);
    return error?.response?.data;
  }
};

type SupportedMethods = "post" | "get" | "delete" | "patch";

const makeRequest = async (
  endpoint: string,
  method: SupportedMethods,
  data: object = {}
): Promise<any> => {
  const methodsMap: { [key in SupportedMethods]: () => Promise<any> } = {
    post: () => api.post(endpoint, data),
    get: () => api.get(endpoint, { params: data }),
    delete: () => api.delete(endpoint, { data }),
    patch: () => api.patch(endpoint, data),
  };

  const requestFunction = methodsMap[method];

  if (!requestFunction) {
    throw new Error(`Unsupported HTTP method: ${method}`);
  }

  return handleRequest(requestFunction);
};

const API = {
  signUp: (data: object) => makeRequest("/auth/signup", "post", data),
  signIn: (data: object) => makeRequest("/auth/signin", "post", data),
  googleAuth: (data: object) => makeRequest("/auth/google-auth", "post", data),
  forgotPassword: (data: object) =>
    makeRequest("/auth/forgot-password", "post", data),
  resetPassword: (token: string, data: object) => makeRequest(`/auth/reset-password/${token}`, "post", data),
  getProducts: () => makeRequest("/products", "get"),
  getUsers: () => makeRequest("/userdetails", "get"),
  updateProduct: (id: string, data: object) =>
    makeRequest(`/products/${id}`, "patch", data),
  deleteProduct: (id: string) => makeRequest(`/products/${id}`, "delete"),
};

export default API;
