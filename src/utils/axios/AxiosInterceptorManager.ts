/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2021-07-11 20:08:13
 * @LastEditors: Roy
 * @LastEditTime: 2021-07-11 21:43:03
 * @Deprecated: 否
 * @FilePath: /vue3.0-admin-ts/src/utils/axios/AxiosInterceptorManager.ts
 */

interface OnFulfilled<V> {
    (value: V): V | Promise<V>
}
interface OnRejected {
    (error: any): any;
}


export interface Interceptor<V> {
    onFulfilled?: OnFulfilled<V>;//成功的回调
    onRejected?: OnRejected;//失败的回调
}

export interface AxiosInterceptorManager<V> {
    use(onFulfilled?: (value: V) => V | Promise<V>, onRejected?: (error: any) => any): number;
    eject(id: number): void;
}


//T AxiosRequestConfig || AxiosResponse
export default class InterceptorManager<V> {
    public interceptors: Array<Interceptor<V> | null> = [];
    //每当调用use的时候可以向拦截器管理器中添加一个拦截器
    use(onFulfilled?: OnFulfilled<V>, onRejected?: OnRejected): number {
        this.interceptors.push({
            onFulfilled,
            onRejected
        })
        return this.interceptors.length - 1;
    }
    reject(id: number) {
        if (this.interceptors[id]) {
            this.interceptors[id] = null;
        }
    }
}

;