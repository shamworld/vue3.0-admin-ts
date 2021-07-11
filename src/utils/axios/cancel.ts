/*
 * @message: 描述
 * @Author: Roy
 * @Email: @163.com
 * @Github: @163.com
 * @Date: 2021-07-11 23:26:03
 * @LastEditors: Roy
 * @LastEditTime: 2021-07-11 23:29:25
 * @Deprecated: 否
 * @FilePath: /vue3.0-admin-ts/src/utils/axios/cancel.ts
 */

export class Cancel {
    message: string;
    constructor(message: string) {
        this.message = message
    }
}

export function isCancel(error: any): boolean {
    return error instanceof Cancel;
}

export class CancelToken {
    public resolve: any;
    source() {
        return {
            token: new Promise((resolve) => {
                this.resolve = resolve;
            }),
            cancel: (message: string) => {
                this.resolve(new Cancel(message));
            }
        }
    }
}