import request from "@/utils/request";
export const getNotifyList = (data) => {
  return request.get(`/api/notifier/list`, { params: data });
};

export const readNotify = (data: any) => {
  return request.post("/api/notifier/status", data);
};

//获取未读通知数量
export const getWithoutRead = () => {
  return request.get("/api/notifier/unread/count");
};
