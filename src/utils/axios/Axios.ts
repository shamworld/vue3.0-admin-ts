/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2021-07-11 17:04:37
 * @LastEditors: Roy
 * @LastEditTime: 2021-07-11 23:43:52
 * @Deprecated: 否
 * @FilePath: /vue3.0-admin-ts/src/utils/axios/Axios.ts
 */
import { AxiosRequestConfig, AxiosResponse } from './types'
import qs from 'qs';
import parseHeaders from 'parse-headers';
import AxiosInterceptorManager, { Interceptor } from './AxiosInterceptorManager'

let defaults: AxiosRequestConfig = {
    method: 'get',
    timeout: 0,
    headers: {
        common: {//针对所有方法的请求生效
            accept: 'application/json'//指定告诉服务器返回JSON格式的数据
        }
    },
    transformReuqes: (data: Record<string, any>, headers: any) => {
        headers['common']['content-type'] = 'application/json';
        return JSON.stringify(data);
    },
    transformResponse: (response: any) => {
        return response.data;
    }
}

let getStyleMethods = ['get', 'head', 'delete', 'options'];//get风格的请求
getStyleMethods.forEach((method: string) => {
    defaults.headers![method] = {};
})
let postStyleMethods = ['put', 'post', 'patch'];//post风格的请求
postStyleMethods.forEach((method: string) => {
    defaults.headers![method] = {
        'content-type': 'application/json'//请求体的格式
    };
})

let allMethods = [...getStyleMethods, ...postStyleMethods];

export default class Axios<T> {
    public defaults: AxiosRequestConfig = defaults;
    public interceptors = {
        request: new AxiosInterceptorManager<AxiosRequestConfig>(),
        response: new AxiosInterceptorManager<AxiosResponse<T>>()
    }
    //T用来限制响应对象response里的data的类型
    request<T>(config: AxiosRequestConfig): Promise<AxiosRequestConfig | AxiosResponse<T>> {
        // return this.dispatchRequest<T>(config);

        config.headers = Object.assign(this.defaults.headers, config.headers,)
        if (config.transformReuqes && config.data) {
            config.data = config.transformReuqes(config.data, config.headers);
        }

        //chain:[请求拦截器2，请求拦截器1,request,响应拦截器1,响应拦截器2]

        const chain: Array<Interceptor<AxiosRequestConfig> | Interceptor<AxiosResponse<T>>> = [
            {
                onFulfilled: this.dispatchRequest,
                onRejected: (error: any) => error
            }
        ]
        this.interceptors.request.interceptors.forEach((interceptor: Interceptor<AxiosRequestConfig> | null) => {
            interceptor && chain.unshift(interceptor);
        })
        //TODO Interceptor<AxiosResponse<T>> | null
        this.interceptors.response.interceptors.forEach((interceptor: any) => {
            interceptor && chain.push(interceptor);
        })
        //TODO Promise<AxiosRequestConfig | AxiosResponse<T>>
        let promise: any = Promise.resolve(config);
        while (chain.length) {
            const { onRejected, onFulfilled } = chain.shift()!;
            promise = promise.then(onFulfilled, onRejected);
        }
        return promise;
    }
    //定义一个派发请求的方法
    dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosRequestConfig | AxiosResponse<T>> {
        return new Promise<AxiosResponse<T>>((resolve, reject) => {
            let { method, url, params, headers, data, timeout } = config;
            let request = new XMLHttpRequest();
            if (params) {
                params = qs.stringify(params);
                url += (url!.indexOf('?') === -1 ? '&' : '?') + params;
            }
            // url += (url!.indexOf('?') === -1 ? '&' : '?') + params;
            request.open(method!, url!, true);
            request.responseType = 'json';
            request.onreadystatechange = () => {//指定一个状态变更函数
                if (request.readyState === 4 && request.status !== 0) {
                    if (request.status >= 200 && request.status < 300) {
                        let response: AxiosResponse<T> = {
                            data: request.response ? request.response : request.responseText,
                            status: request.status,
                            statusText: request.statusText,
                            headers: parseHeaders(request.getAllResponseHeaders()),
                            config,
                            request
                        }
                        if (config.transformResponse) {
                            response = config.transformResponse(response);
                        }
                        resolve(response);
                    } else {
                        reject(`Error:Request failed with status code ${request.status}`);
                    }
                }
            }
            // if (headers) {
            //     for (let key in headers) {
            //         request.setRequestHeader(key, headers[key]);
            //     }
            // }
            if (headers) {
                for (let key in headers) {
                    //common表示所有的请求方法都生效 或者说key是一个方法名
                    if (key === 'common' || allMethods.includes(key)) {
                        if (key === 'common' || key === config.method) {
                            for (let key2 in headers[key]) {
                                request.setRequestHeader(key2, headers[key][key2]);
                            }
                        }
                    } else {
                        request.setRequestHeader(key, headers[key]);
                    }
                }
            }
            let body: string | null;
            if (data) {
                body = JSON.stringify(data)
            }
            //网络链接失败
            request.onerror = () => {
                reject('net::ERR_INTERNET_DISCONNECTED')
            }
            if (timeout) {
                request.timeout = timeout;
                request.ontimeout = () => {
                    reject(`ERROR:timeout of ${timeout}ms exceeded`)
                }
            }
            if (config.cancelToken) {
                config.cancelToken.then((message: string) => {
                    request.abort();
                    reject(message);
                })
            }
            request.send();
        })
    }
}
