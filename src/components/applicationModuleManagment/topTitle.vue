<template>
    <div class="top">
        <h2 class="ttf">{{ props.title }}</h2>
        <ul class="tab" v-if="isDateShow">
            <li :class="currentIndex === index ? 'active' : ''" @click="tabClick(index)"
                v-for="(item, index) in  ['年', '月', '日']" :key="index">{{ item }}</li>
        </ul>
        <span v-if="isOtherText" class="other">告警次数</span>
    </div>
</template>
    
<script setup>
import { ref } from 'vue'
const currentIndex = ref(2)
const emit = defineEmits(['tabClick'])
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    isDateShow: {
        type: Boolean,
        default: () => {
            return true
        }
    },
    isOtherText: {
        type: Boolean,
        default: () => {
            return false
        }
    }
})
const tabClick = (index) => {
    currentIndex.value = index
    emit('tabClick', index)
}
</script>
    
<style lang="scss" scoped>
.top {
    display: flex;
    justify-content: space-between;

    h2 {
        font-size: 18px;
        font-weight: normal;
        line-height: 18px;
        letter-spacing: 0px;
        background: linear-gradient(180deg, #FFFFFF 14%, #54B8FE 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
    }

    .tab {
        display: flex;

        li {
            cursor: pointer;
            font-size: 12px;
            font-weight: normal;
            line-height: 16px;
            text-align: right;
            letter-spacing: 0em;
            color: #FFFFFF;
            width: 32px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            border-radius: 15px;
            padding: 2px 0;
        }

        .active {
            background: radial-gradient(68% 67% at 50% 50%, rgba(0, 22, 52, 0.15) 0%, #1766A1 100%);
            border-image: linear-gradient(360deg, #166CFF -3%, rgba(209, 226, 255, 0.87) 9%, rgba(129, 206, 255, 0.76) 99%) 1;

        }
    }

    .other {
        font-size: 12px;
        font-weight: normal;
        line-height: 12px;
        letter-spacing: 0px;
        color: rgba(214, 239, 255, 0.6);
    }
}
</style>