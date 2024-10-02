import request from "@/utils/request"; //导入http下的httpload.js
export const getCoachList = () => {
  return request.get("/api/coach/list");
};
export const getCoachcourseinfo = (id: number) => {
  return request.get("/api/coach/courseinfo/" + id);
};

//获取所有我的学员
export const getCoachStudentinfo = () => {
  return request.get("/api/coach/studentList");
};

export const getCourseAndStudentCount = () => {
  return request.get("/api/coach/courseAndStudentCount");
};
