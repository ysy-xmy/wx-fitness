import request from "@/utils/request";
export const getNotifyDeatil = (data: any) => {
  return {};
};
export const getNotifyList = (data: any) => {
  return request.get("/api/notifier/list", { params: data });
};

export const readNotify = (data: any) => {
  return request.post("/api/notifier/status", data);
};
