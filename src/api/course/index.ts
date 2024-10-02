import request from "@/utils/request";
import type { planRequest } from "./types";
export const postPlan = (data: planRequest) => {
  return request.post("/api/course/postPlan", data);
};
// export const getCourselist = () => {
//     return request.get("/api/course/owner-courses");
// }
export const getplanlist = (id: number) => {
  return request.get("/api/course/planInfo/" + id);
};
