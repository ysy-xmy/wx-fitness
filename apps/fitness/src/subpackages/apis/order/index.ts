import request from "@/utils/request"; //导入http下的httpload.js
export const getOrderlist = (Size: String, Page: String) => {
  let data = {
    Size,
    Page,
  };
  return request.get("/api/order/owner-orders", { params: data });
};
export const getCoachOrderlist = (Size: String, Page: String) => {
  let data = {
    Size,
    Page,
  };
  return request.get("/api/order/coach-orders", { params: data });
};
export const getOrderDetail = (id: string) => {
  return request.get("/api/order/order-detail/", { params: { OrderID: "14" } });
};
