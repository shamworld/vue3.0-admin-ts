/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2021-05-05 21:28:36
 * @LastEditors: Roy
 * @LastEditTime: 2021-06-26 17:28:33
 * @Deprecated: 否
 * @FilePath: /multi-tab-master/src/router/routes.ts
 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout'

// 使用require.context()自动获取模块
const modules: RouteRecordRaw[] = []
const moduleFiles = require.context('./modules', false, /\.ts$/)
moduleFiles.keys().forEach((key) => modules.push(moduleFiles(key).default))
modules.sort((moduleA, moduleB) => {
  const orderA = moduleA.meta!.order as number
  const orderB = moduleB.meta!.order as number
  return orderA - orderB
})

const routes: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login'),
    meta: {
      noKeepAlive: true
    }
  },
  {
    name: 'index',
    path: '/',
    component: Layout,
    redirect: '/workbench',
    children: [
      {
        name: 'workbench',
        path: 'workbench',
        component: () => import('@/views/workbench'),
        meta: {
          type: 'item',
          label: '工作台',
          icon: 'workbench'
        }
      },
      ...modules,
      {
        name: 'elementPlus',
        path: 'elementPlus',
        component: {},
        meta: {
          type: 'item',
          label: 'Element Plus',
          icon: 'element-plus',
          onClick: () => window.open('https://element-plus.gitee.io/#/zh-CN', '_blank')
        }
      }
    ]
  }
]

export default routes
