import Request from "luch-request"; //npm下载引入luch-request

// const api = import.meta.env.VITE_BASE_URL;

// import qs from 'qs'
const http = new Request({
  baseURL: import.meta.env.VITE_BASE_URL, //设置请求的base url
  timeout: 30000, //超时时长30秒,
  //   header: {
  //     "Content-Type": "multipart/form-data;application/json;charset=UTF-8;",
  //   },
});

//请求拦截器
http.interceptors.request.use(
  (config: any) => {
    // 可使用async await 做异步操作
    const token = uni.getStorageSync("token");
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjYsIk9wZW5JRCI6ImNvYWNoMSIsIlVzZXJuYW1lIjoi5oiR5piv5pWZ57uDIiwiQXV0aG9yaXR5SWQiOlszXSwiQnVmZmVyVGltZSI6ODY0MDAsImlzcyI6IlBPU1RFUiIsImF1ZCI6WyJDQyJdLCJleHAiOjE3MzgxNjY3ODYsIm5iZiI6MTczNzU2MTk4Nn0.M-SD7Gpjj0cfM4EYCzQLHS8JJSzqS85UGBTjxmDhnDc";
    if (token) {
      config.header["Authorization"] = token;
    }

    if (config.method === "POST") {
      config.data = JSON.stringify(config.data) as unknown as Record<
        string,
        any
      >;
    }
    return config;
  },
  (error) => {
    return Promise.resolve(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //未登录时清空缓存跳转
    if (error.statusCode == 401) {
      uni.clearStorageSync();
      uni.switchTab({
        url: "/pages/index/index.vue",
      });
    }

    const { errMsg } = error;

    console.log(errMsg);

    // uni.showToast({
    //   title: errMsg,
    //   duration: 2000,
    // });
    return Promise.resolve(error);
  }
);
export default http;
