import axiosConfig from "@/config/axios.config";
import { DivisionType } from "@/lib/division";
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
  delete: async (id: number) => {
    const response = await axiosConfig.delete(`/division/${id}`);
    return response.data;
  },
  getOne: async (id: number, params: any) => {
    const response = await axiosConfig.get<{
      code: number;
      message: string;
      data: DivisionType;
    }>(`/division/${id}`, {
      params,
    });
    return response.data;
  },
  update: async (id: number, payload: any) => {
    const response = await axiosConfig.put(`/division/${id}`, payload);
    return response.data;
  },
};

export default DivisionService;
