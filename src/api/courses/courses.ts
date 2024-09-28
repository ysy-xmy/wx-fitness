import request from "@/utils/request";
// 学员端首页数据
// 显示所有正在出售的课程
export const getCourses = (Size: number, Page: number) => {
  let data = {
    Size,
    Page,
  };
  return request.get("/api/pay/courseSalesPage", { params: data });
};
//获取我的课程
export const getMycourese = () => {
  return request.get("/api/course/owner-courses");
};
