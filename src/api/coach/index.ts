import request from '@/utils/request'; //导入http下的httpload.js
export const getCoachList = () => {
    return request.get('/api/coach/list')
}
export const getCoachcourseinfo = (id: number) => {
    return request.get('/api/coach/courseinfo/' + id)
}