import request from "@/utils/request"; //导入http下的httpload.js

export const getUserInfo = (id: string) => {
    return request.get("/api/user/getInfo");
};

export const updateUserInfo = (data: any) => {
    return request.put("/api/user/updateInfo", data);
}
