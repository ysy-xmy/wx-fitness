import request from "@/utils/request"; //导入http下的httpload.js
import type { inputBodyType, addBodyType } from "./types";
export const getBodydata = (data: inputBodyType) => {
  return request.post("/api/body/getByType", data);
};
export const addBodydata = (data: addBodyType) => {
  return request.post("/api/body/add", data);
};
//获取身高体重
export const getBody = () => {
  return request.get("/api/user/getHW");
};
