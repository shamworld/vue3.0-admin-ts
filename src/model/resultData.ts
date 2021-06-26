/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2021-06-26 22:09:11
 * @LastEditors: Roy
 * @LastEditTime: 2021-06-26 22:10:39
 * @Deprecated: 否
 * @FilePath: /vue3.0-admin-ts/src/model/ResultData.ts
 */
export interface RootObject<T> {
  code: number
  msg: string
  data: T
}
