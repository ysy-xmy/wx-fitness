import { useAuthStore } from "@/state/modules/auth";
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
    t = { id: data };
  }
  t.userId = useAuthStore().user.id;
  return request.put("/api/notifier/status", null, {
    params: t,
  });
};

//获取未读通知数量 vb
export const getWithoutRead = (data) => {
  return request.get("/api/notifier/unread/count", { params: data });
};

//端开连接
export const CloseSocket = () => {
  return request.delete(
    "/api/notifier/conn/close?userId=" + useAuthStore().user.id
  );
};
