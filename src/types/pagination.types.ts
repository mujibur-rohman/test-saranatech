type PaginationInterface<T> = {
  success: boolean;
  message: string;
  code: number;
  data: T[];
  meta: {
    next_page_url: null | string;
    prev_page_url: string;
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
};

export default PaginationInterface;
