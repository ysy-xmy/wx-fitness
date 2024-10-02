import request from '@/utils/request'; //导入http下的httpload.js
import type { IOrder } from './types';

export const getOrderlist = (params: IOrder) => {
    return {
        "code": 200,
        "data": {
            "OrderInfos": [
                {
                    "ID": 28,
                    "OrderNum": "1727196246",
                    "CoachName": "coach1",
                    "CourseName": "装六手所她",
                    "Img": "http://dummyimage.com/400x400",
                    "Amount": 100,
                    "PaymentTime": "2024-09-25T00:44:06.671+08:00"
                },
                {
                    "ID": 27,
                    "OrderNum": "1727196183",
                    "CoachName": "coach1",
                    "CourseName": "装六手所她",
                    "Img": "http://dummyimage.com/400x400",
                    "Amount": 100,
                    "PaymentTime": "2024-09-25T00:43:03.957+08:00"
                },
                {
                    "ID": 26,
                    "OrderNum": "1727196162",
                    "CoachName": "coach1",
                    "CourseName": "装六手所她",
                    "Img": "http://dummyimage.com/400x400",
                    "Amount": 100,
                    "PaymentTime": "2024-09-25T00:42:42.542+08:00"
                },
                {
                    "ID": 25,
                    "OrderNum": "1727195055",
                    "CoachName": "coach1",
                    "CourseName": "装六手所她",
                    "Img": "http://dummyimage.com/400x400",
                    "Amount": 100,
                    "PaymentTime": "2024-09-25T00:24:15.858+08:00"
                },
                {
                    "ID": 24,
                    "OrderNum": "1727194916",
                    "CoachName": "coach1",
                    "CourseName": "装六手所她",
                    "Img": "http://dummyimage.com/400x400",
                    "Amount": 58,
                    "PaymentTime": "2024-09-25T00:21:56.434+08:00"
                },
                {
                    "ID": 23,
                    "OrderNum": "1727194900",
                    "CoachName": "coach1",
                    "CourseName": "装六手所她",
                    "Img": "http://dummyimage.com/400x400",
                    "Amount": 58,
                    "PaymentTime": "2024-09-25T00:21:40.864+08:00"
                },
                {
                    "ID": 22,
                    "OrderNum": "1727194868",
                    "CoachName": "coach1",
                    "CourseName": "装六手所她",
                    "Img": "http://dummyimage.com/400x400",
                    "Amount": 58,
                    "PaymentTime": "2024-09-25T00:21:08.195+08:00"
                },
                {
                    "ID": 21,
                    "OrderNum": "1727194834",
                    "CoachName": "coach1",
                    "CourseName": "装六手所她",
                    "Img": "http://dummyimage.com/400x400",
                    "Amount": 100,
                    "PaymentTime": "2024-09-25T00:20:34.544+08:00"
                },
                {
                    "ID": 20,
                    "OrderNum": "1727194303",
                    "CoachName": "coach1",
                    "CourseName": "装六手所她",
                    "Img": "http://dummyimage.com/400x400",
                    "Amount": 100,
                    "PaymentTime": "2024-09-25T00:11:43.759+08:00"
                },
                {
                    "ID": 19,
                    "OrderNum": "1727194192",
                    "CoachName": "coach1",
                    "CourseName": "装六手所她",
                    "Img": "http://dummyimage.com/400x400",
                    "Amount": 100,
                    "PaymentTime": "2024-09-25T00:09:52.747+08:00"
                }
            ],
            "Page": 1,
            "Size": 10,
            "Total": 27
        },
        "msg": "成功"
    }
    return request.get('/api/order/owner-orders', { params })
}

export const getOrderDetail = (id: string) => {
    return request.get('/api/order/order-detail/' + id)
}