// import request from '@/http/httpload.js'
import request from "@/utils/request"; //导入http下的httpload.js

export const getFirstmenulist = () => {
  return request.get("/api/action/getFirstByName");
};

export const getSecByFirst = (FirstID: string) => {
  FirstID = FirstID.toString();
  return request.get("/api/action/getSecByFirst", { params: { FirstID } });
};
export const getActionsBySec = (SecID: string) => {
  SecID = SecID.toString();
  return request.get("/api/action/getActionsBySec", { params: { SecID } });
};

export const getActionAll = () => {
  return request.get("/api/action/getAll");
};

export const getActionById = (id: string) => {
  id = id.toString();
  return request.get("/api/action/action/detail/" + id);
};

//为计划添加动作
export const addActionToGroupAction = (data: any) => {
  return request.post("/api/course/addAtionGroup", data);
};

//给动作组添加动作
export const addActionToGroup = (data: any) => {
  return request.post("/api/course/updateAtionGroup", data);
};

//给动作组删除动作
export const deleteActionFromGroup = (data: any) => {
  return request.delete("/api/course/deleteAtionGroup", data);
};

//获取日期下的动作
export const getActionByDate = (data: any) => {
  return request.get("/api/course/getActionGroup", data);
};
