import request from "@/utils/request";
import type { planRequest } from "./types";
export const postPlan = (data: any) => {
  return request.post("/api/course/postPlan", data);
};
// export const getCourselist = () => {
//     return request.get("/api/course/owner-courses");
// }
export const getplanlist = (id: number) => {
  return request.get("/api/course/plan/getActionGroup/" + id);
};

export const changeCourseMes = (data: any) => {
  return request.post("/api/course/studentCourse/update", data);
};
//获取课程下的所有计划
export const getCoursePlan = (data: any) => {
  return request.get("/api/course/planInfo/" + data);
};
