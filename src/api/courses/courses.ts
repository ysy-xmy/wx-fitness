import request from "@/utils/request";
// 学员端首页数据
// 显示所有正在出售的课程
export const getCourses = (Size: number, Page: number) => {
  let data = {
    Size: String(Size),
    Page: String(Page),
  };
  console.log(data, "data");
  // return request.get("/api/pay/courseSalesPage", { params: data });
  return new Promise((res, rej) => {
    uni
      .request({
        url: "http://127.0.0.1:4523/m1/4822762-4477606-default/api/pay/courseSalesPage",
        param: data,
        header: "Bear " + uni.getStorageSync("token"),
      })
      .then((r) => {
        console.log(r);
        res({
          data: {
            list: [
              {
                id: 1,
                img: "https://img.js.design/assets/img/668c2ed952a8c9cae69e281b.png#4da10c88bc2ff6efbe0d64ef8f3eee6d",
                name: "私教课",
                time: "2024-11-20",
              },
              {
                id: 1,
                img: "https://img.js.design/assets/img/668c2ed952a8c9cae69e281b.png#4da10c88bc2ff6efbe0d64ef8f3eee6d",
                name: "私教课",
                time: "2024-11-20",
              },
              {
                id: 1,
                img: "https://img.js.design/assets/img/668c2ed952a8c9cae69e281b.png#4da10c88bc2ff6efbe0d64ef8f3eee6d",
                name: "私教课",
                time: "2024-11-20",
              },
              {
                id: 1,
                img: "https://img.js.design/assets/img/668c2ed952a8c9cae69e281b.png#4da10c88bc2ff6efbe0d64ef8f3eee6d",
                name: "私教课",
                time: "2024-11-20",
              },
            ],
          },
        });
      })
      .catch((err) => {
        rej(err);
      });
  });
};
//获取我的课程
export const getMycourese = (Size: string, Page: string) => {
  return request.get("/api/course/owner-courses", { params: { Size, Page } });
};
