import request from "@/utils/request"; //导入http下的httpload.js

export const getUserInfo = () => {
  return request.get("/api/user/getInfo");
};

export const updateUserInfo = (data: any) => {
  return request.put("/api/user/update", data);
};

export const refreshToken = () => {
  return request.post("/api/user/token/refresh?Token=" + uni.getStorageSync("token"));
};

export const getHWInfo = () => {
  return request.get("/api/user/getHW");
};
