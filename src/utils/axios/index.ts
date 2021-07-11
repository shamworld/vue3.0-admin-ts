/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2021-07-11 17:04:41
 * @LastEditors: Roy
 * @LastEditTime: 2021-07-11 23:43:37
 * @Deprecated: 否
 * @FilePath: /vue3.0-admin-ts/src/utils/axios/index.ts
 */
import Axios from './Axios'
import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from './types'
import { CancelToken, isCancel } from './cancel'

//可以创建一个axios的实例 axios其实就是一个函数

function createInstance(): AxiosInstance {
  let context: Axios<any> = new Axios();//this指针上下文
  //让request方法里的this永远指向context也就是new Axios()
  let instance = Axios.prototype.request.bind(context);
  //把Axios类的实例和类的原型上的方法都拷贝到了instance上，也就是request方法上
  instance = Object.assign(instance, Axios.prototype, context);

  return instance as AxiosInstance;
}

let axios = createInstance();
axios.CancelToken = new CancelToken();
axios.isCancel = isCancel;


export default axios;


export * from './types'

// import axios, { AxiosResponse } from 'axios'

const baseURL = ''

interface User {
  name: string
  password: string
}

const user: User = {
  name: 'roy',
  password: '123456'
}
// axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
//   config.headers && (config.headers.name += '1');
//   return config;
// }, (error: any): any => Promise.reject(error));

// axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
//   config.headers && (config.headers.name += '2');
//   return config;
// }, (error: any): any => Promise.reject(error));

// // axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
// //   return new Promise((resolve) => {
// //     setTimeout(() =>{
// //       config.headers.name += '3';
// //       resolve(config);
// //     },3000)
// //   })
// // }, (error: any): any => Promise.reject(error));

// axios.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
//   response.data.name += '1';
//   return response;
// })

// axios.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
//   response.data.name += '2';
//   return response;
// })
const CancelToken1 = axios.CancelToken;
const isCancel1 = axios.isCancel;
const source = CancelToken1.source();

axios<User>({
  method: 'post',
  url: baseURL + '/get',
  headers: {
    'context-type': 'application/json'
  },
  cancelToken: source.token,
  params: user
})
  .then((response: AxiosResponse<User>) => {
    console.log(response)
    return response.data
  }).then((data: User) => {
    console.log(data)
  })
  .catch((err: any) => {
    if (isCancel1(err)) {

      console.log(err)
    }
  })
source.cancel('用户取消了请求');