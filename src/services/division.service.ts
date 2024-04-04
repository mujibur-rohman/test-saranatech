import axiosConfig from "@/config/axios.config";
import Division from "@/types/division.types";
import PaginationInterface from "@/types/pagination.types";

const DivisionService = {
  getAll: async (params: any) => {
    const response = await axiosConfig.get<PaginationInterface<Division>>("/division", {
      params,
    });
    return response.data;
  },
  create: async (payload: any) => {
    const response = await axiosConfig.post("/division", payload);
    return response.data;
  },
};

export default DivisionService;
