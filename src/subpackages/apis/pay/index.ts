import request from "@/utils/request";
export const buyCourse = (data: any) => {
  return request.post("/api/pay/bugCourse", data);
};

// export const
