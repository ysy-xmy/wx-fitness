import request from "@/utils/request";
export const buyCourse = (data: any) => {
  return request.post("/api/pay/buyCourse", data);
};
//获取支付签名
export const getPaySignature = (data: any) => {
  return request.post("/api/pay/wx/signature", data);
};
//购买前检查是否可以购买
export const ifCanBuy = (data: any) => {
  return request.post("/api/pay/check/courseExist", data);
};

export const checkPay = (data: any) => {
  return request.post("/api/pay/buy/check", data);
};
