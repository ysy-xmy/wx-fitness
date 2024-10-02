import request from "@/utils/request"; //导入http下的httpload.js

export const getUserInfo = () => {
    return request.get("/api/user/getInfo");
};

export const updateUserInfo = (data: any) => {
    return request.put("/api/user/updateInfo", data);
}

export const refreshToken = () => {
    return request.post("/api/user/token/refresh");
}