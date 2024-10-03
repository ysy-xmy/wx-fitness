import request from "@/utils/request";
// 学员端首页数据
// 显示所有正在出售的课程 已经废弃
// export const getCourses = (Size: string, Page: string) => {
//   let data = {
//     Size,
//     Page,
//   };
//   // return request.get("/api/pay/courseSalesPage", { params: data });
//   return new Promise((res, rej) => {
//     uni
//       .request({
//         url: "http://127.0.0.1:4523/m1/4822762-4477606-default/api/pay/courseSalesPage",
//         param: data,
//         header: "Bear " + uni.getStorageSync("token"),
//       })
//       .then((r) => {
//         console.log(r);
//         res({
//           data: {
//             list: [
//               {
//                 id: 1,
//                 img: "https://img.js.design/assets/img/668c2ed952a8c9cae69e281b.png#4da10c88bc2ff6efbe0d64ef8f3eee6d",
//                 name: "私教课",
//                 coachName: "2024-11-20",
//               },
//               {
//                 id: 1,
//                 img: "https://img.js.design/assets/img/668c2ed952a8c9cae69e281b.png#4da10c88bc2ff6efbe0d64ef8f3eee6d",
//                 name: "私教课",
//                 coachName: "2024-11-20",
//               },
//               {
//                 id: 1,
//                 img: "https://img.js.design/assets/img/668c2ed952a8c9cae69e281b.png#4da10c88bc2ff6efbe0d64ef8f3eee6d",
//                 name: "私教课",
//                 coachName: "2024-11-20",
//               },
//               {
//                 id: 1,
//                 img: "https://img.js.design/assets/img/668c2ed952a8c9cae69e281b.png#4da10c88bc2ff6efbe0d64ef8f3eee6d",
//                 name: "私教课",
//                 coachName: "2024-11-20",
//               },
//             ],
//           },
//         });
//       })
//       .catch((err) => {
//         rej(err);
//       });
//   });
// };
//获取我的课程
export const getMycourese = () => {
  return request.get("/api/course/owner-courses");
};

//授权教练打卡
export const allowCoachClock = (id: string) => {
  return request.post(`/api/course/plan/punchIn/allow/${id}`);
};
//取消授权教练打卡
export const cancelCoachClok = (id: string) => {
  return request.post(`/api/course/plan/punchIn/cancel/${id}`);
};

//查看教练是否有权打卡
export const selectCoachClok = (id: string) => {
  return request.get(`/api/course/plan/punchInAuthCheck/` + id);
};

//计划动作打卡
export const actionClok = (id: string) => {
  return request.post(`/api/course/plan/punchIn/${id}`);
};
