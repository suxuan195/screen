import { defineStore } from 'pinia'
export const loginStore = defineStore('login', {
    state: () => {
        return {
            userIofn: {
                name: ''
            }
        }
    },
    actions: {
        setUserInfo(info) {
            Object.assign(this.userIofn, info);
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'login_store',
                storage: window.localStorage
            }
        ]
    }
})