/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2021-05-05 21:28:36
 * @LastEditors: Roy
 * @LastEditTime: 2021-06-26 17:23:43
 * @Deprecated: 否
 * @FilePath: /multi-tab-master/src/setting.ts
 */
import { SettingProps } from './typings'

const Setting: SettingProps = {
  // 系统图标名（需要在svg图标中有对应文件）
  ICON_NAME: 'leaf',

  // 系统图标色（需要在variables.scss中定义并导出）
  ICON_COLOR: 'SUCCESS',

  // 系统名
  SYSTEM_NAME: '多页签系统模板',

  // 主题列表
  THEME_LIST: [
    { name: 'default', color: '#409EFF' },
    { name: 'green', color: '#00B3A1' },
    { name: 'pink', color: '#FB7299' },
    { name: 'purple', color: '#DA70D6' },
    { name: 'brown', color: '#F4A460' }
  ],

  // 右上角dropdown菜单项
  DROP_DOWN_LIST: [
    { key: 'github', label: '项目地址' },
    { key: 'logout', label: '退出登录', divided: true }
  ]
}

export default Setting
