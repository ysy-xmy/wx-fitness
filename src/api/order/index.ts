import request from '@/utils/request'; //导入http下的httpload.js
import type { IOrder } from './types';

export const getOrderlist = (params: IOrder) => {
    params = {
        Page: "1",
        Size: "10",
    }
    return request.get('/api/order/owner-orders')
}

export const getOrderDetail = (id: string) => {
    return request.get('/api/order/order-detail/' + id)
}