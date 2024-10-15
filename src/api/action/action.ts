// import request from '@/http/httpload.js'
import request from '@/utils/request'; //导入http下的httpload.js



export const getFirstmenulist = () => {
    return request.get('/api/action/getFirstByName')
}

export const getSecByFirst = (FirstID: string) => {
    FirstID = FirstID.toString()
    return request.get('/api/action/getSecByFirst', { params: { FirstID } })
}
export const getActionsBySec = (SecID: string) => {
    SecID = SecID.toString()
    return request.get('/api/action/getActionsBySec', { params: { SecID } })
}

export const getActionAll = () => {
    return request.get('/api/action/getAll')
}

export const getActionById = (id: string) => {
    id = id.toString()
    return request.get('/api/action/action/detail/' + id)
}