/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2021-07-11 17:13:27
 * @LastEditors: Roy
 * @LastEditTime: 2021-07-11 23:43:08
 * @Deprecated: 否
 * @FilePath: /vue3.0-admin-ts/src/utils/axios/types.ts
 */

import AxiosInterceptorManager from './AxiosInterceptorManager'

export type Methods = 'get' | 'GET' | 'POST' | 'post'

export interface AxiosRequestConfig {
  url?: string;
  method?: Methods;
  params?: any;
  headers?: Record<string, any>;
  data?: Record<string, any>;
  timeout?: number;
  transformReuqes?: (data: Record<string, any>, headers: any) => any;
  transformResponse?: (data: Record<string, any>) => any;
  cancelToken?: any;
}

//Promise的泛型T代表次promise变成成功之后resolve的值
export interface AxiosInstance {
  <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  CancelToken?: any;
  isCancel?: any;
}

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers?: Record<string, any>;
  config?: AxiosRequestConfig;
  request?: XMLHttpRequest;
}
