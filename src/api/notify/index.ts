import request from "@/utils/request";
export const getNotifyList = (data, url) => {
  return request.get(url, { params: data });
};

export const readNotify = (data: any) => {
  let t = null;
  if (data == -1) {
    t = {
      range: "all",
    };
  } else {
    t = data;
  }
  return request.post("/api/notifier/status", t);
};

//获取未读通知数量
export const getWithoutRead = (data) => {
  return request.get("/api/notifier/unread/count", { params: data });
};
