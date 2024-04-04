import axiosConfig from "@/config/axios.config";

const AuthService = {
  login: async (payload: any) => {
    const response = await axiosConfig.post("/login", payload);
    return response.data;
  },
};

export default AuthService;
