import axiosConfig from "@/config/axios.config";
import PaginationInterface from "@/types/pagination.types";
import Staff from "@/types/staff.types";

const StaffService = {
  getAll: async (params: any) => {
    const response = await axiosConfig.get<PaginationInterface<Staff>>("/staff", {
      params,
    });
    return response.data;
  },
  create: async (payload: any) => {
    const response = await axiosConfig.post("/staff", payload);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await axiosConfig.delete(`/staff/${id}`);
    return response.data;
  },
  getOne: async (id: number, params: any) => {
    const response = await axiosConfig.get<{
      code: number;
      message: string;
      data: Staff;
    }>(`/staff/${id}`, {
      params,
    });
    return response.data;
  },
  update: async (id: number, payload: any) => {
    const response = await axiosConfig.put(`/staff/${id}`, payload);
    return response.data;
  },
};

export default StaffService;
