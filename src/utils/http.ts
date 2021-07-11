/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2021-06-26 22:07:29
 * @LastEditors: Roy
 * @LastEditTime: 2021-07-11 17:43:20
 * @Deprecated: 否
 * @FilePath: /vue3.0-admin-ts/src/utils/http.ts
 */
import axios, { AxiosRequestConfig } from 'axios'
import { RootObject } from '../model/resultData'
import DataStorage from '@/utils/storage'

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000
  // withCredentials: true // send cookies when cross-domain requests
})
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    const storage = new DataStorage()
    config.headers['token'] = storage.getItem('token')
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)
// axios.interceptors.response.use(
//   (resp: AxiosResponse<RootObject>) => {
//     const {  data } = resp
//     const { code, msg } = data
//     if (code && code !== 0) {
//       return Promise.reject(data)
//     }
//     return resp
//   },
//   (e: AxiosError) => {
//
//   }
// )

const request = async <T = any>(config: AxiosRequestConfig): Promise<RootObject<T>> => {
  try {
    const { data } = await http.request<RootObject<T>>(config)
    data.code === 0
      ? console.log(data.msg) // 成功消息提示
      : console.error(data.msg) // 失败消息提示
    return data
  } catch (err) {
    const msg = err.message || '请求失败'
    console.error(msg) // 失败消息提示
    return {
      code: -1,
      msg,
      data: null as any
    }
  }
}

export default request
