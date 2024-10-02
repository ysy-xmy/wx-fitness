import request from "@/utils/request"; //导入http下的httpload.js
import type { IOrder } from "./types";

export const getOrderlist = (Size: String, Page: String) => {
  let data = {
    Size,
    Page,
  };
  //   return request.get("/api/order/owner-orders", { params: data });
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
                className: "私教课",
                time: "2024-11-20",
                money: "200",
                number: 10,
              },
              {
                id: 1,
                img: "https://img.js.design/assets/img/668c2ed952a8c9cae69e281b.png#4da10c88bc2ff6efbe0d64ef8f3eee6d",
                className: "私教课",
                time: "2024-11-20",
                money: "200",
                number: 10,
              },
              {
                id: 1,
                img: "https://img.js.design/assets/img/668c2ed952a8c9cae69e281b.png#4da10c88bc2ff6efbe0d64ef8f3eee6d",
                className: "私教课",
                time: "2024-11-20",
                money: "200",
                number: 10,
              },
              {
                id: 1,
                img: "https://img.js.design/assets/img/668c2ed952a8c9cae69e281b.png#4da10c88bc2ff6efbe0d64ef8f3eee6d",
                className: "私教课",
                time: "2024-11-20",
                money: "200",
                number: 10,
              },
              {
                id: 1,
                img: "https://img.js.design/assets/img/668c2ed952a8c9cae69e281b.png#4da10c88bc2ff6efbe0d64ef8f3eee6d",
                className: "私教课",
                time: "2024-11-20",
                money: "200",
                number: 10,
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

export const getOrderDetail = (id: string) => {
  return request.get("/api/order/order-detail/" + id);
};
