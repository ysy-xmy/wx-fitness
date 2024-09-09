export function getLogincode(data: Record<string, any>) {
    // get请求 可以拼接url或者传入数据对象 二选一
    return request.get('/list', { params: data });
}