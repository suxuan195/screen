// message.js
import { ElMessage } from 'element-plus'

export default class ShowMessage {
    static success(options) {
        this.message('success', options)
    }

    static warning(options) {
        this.message('warning', options)
    }

    static info(options) {
        this.message('info', options)
    }

    static error(options) {
        this.message('error', options)
    }

    static message(type, options) {
        const messageDom = document.getElementsByClassName('el-message')[0]
        if (messageDom === undefined) {
            ElMessage[type](options)
        } else {
            ElMessage.closeAll()
            ElMessage[type](options)
        }
    }
}