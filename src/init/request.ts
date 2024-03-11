import axios, {AxiosRequestConfig} from 'axios'
import {message} from "antd"

enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

const service = axios.create({
    baseURL: '/api'
});
service.interceptors.request.use(
    request => request,
    error => Promise.reject(error)
);

service.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
);

function apiAxios(method: Method, url: string, params: any, config?: AxiosRequestConfig, errorCallBack?: (error: any) => void) {
    return new Promise((resolve, reject) => {
        service({
            method: method,
            url: url,
            data: method === 'POST' || method === 'PUT' ? params : null,
            params: method === 'GET' || method === 'DELETE' ? params : null,
            ...config
        }).then(res => resolve(res)).catch(error => {
            switch (error?.response.status) {
                case 504:
                    message.error("网络超时")
            }
            if (errorCallBack) {
                errorCallBack(error)
            }
        })
    })
}

export default {
    get: (url: string, params?: any, config?: AxiosRequestConfig, errorCallBack?: (error: any) => void) => {
        return apiAxios(Method.GET, url, params, config, errorCallBack)
    },
    post: (url: string, params?: any, config?: AxiosRequestConfig, errorCallBack?: (error: any) => void) => {
        return apiAxios(Method.POST, url, params, config, errorCallBack)
    },
    put: (url: string, params?: any, config?: AxiosRequestConfig, errorCallBack?: (error: any) => void) => {
        return apiAxios(Method.PUT, url, params, config, errorCallBack)
    },
    delete: (url: string, params?: any, config?: AxiosRequestConfig, errorCallBack?: (error: any) => void) => {
        return apiAxios(Method.DELETE, url, params, config, errorCallBack)
    }
};
