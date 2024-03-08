import axios from 'axios'
import {message} from "antd"

enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

const service = axios.create({
    baseURL: '/api',
    timeout: 5000,
});
service.interceptors.request.use(
    request => request,
    error => Promise.reject(error)
);

service.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
);

function apiAxios(method: Method, url: string, params: any, errorCallBack?: (error: any) => void) {
    return new Promise((resolve, reject) => {
        service({
            method: method,
            url: url,
            data: method === 'POST' || method === 'PUT' ? params : null,
            params: method === 'GET' || method === 'DELETE' ? params : null
        }).then(res => resolve(res), error => {
            switch (error?.response.status) {
                case 504:
                    message.error("网络超时")
            }
            if (errorCallBack) {
                errorCallBack(error)
            }
        }).catch(error => reject(error))
    })
}

export default {
    get: (url: string, params?: any, errorCallBack?: (error: any) => void) => {
        return apiAxios(Method.GET, url, params, errorCallBack)
    },
    post: (url: string, params?: any, errorCallBack?: (error: any) => void) => {
        return apiAxios(Method.POST, url, params, errorCallBack)
    },
    put: (url: string, params?: any, errorCallBack?: (error: any) => void) => {
        return apiAxios(Method.PUT, url, params, errorCallBack)
    },
    delete: (url: string, params?: any, errorCallBack?: (error: any) => void) => {
        return apiAxios(Method.DELETE, url, params, errorCallBack)
    }
};
