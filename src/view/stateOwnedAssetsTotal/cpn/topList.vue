<template>
    <div class="topList">
        <div v-for="(item, index) in state.list" :key="index + '11'" class="item">
            <span class="title">{{ item.title }}：</span>
            <span class="value">{{ item.value }}</span>
            <i>亿元</i>
        </div>
    </div>
</template>
    
<script setup>
import { reactive } from 'vue';
const state = reactive({
    list: [
        {
            title: "上年同期",
            value: 22.8
        },
        {
            title: "本年实际",
            value: 22.8
        },
        {
            title: "管控目标",
            value: 22.8
        }
    ]
})
</script>
    
<style lang="scss" scoped>
.topList {
    display: flex;

    .item {
        width: 122px;
        height: 36px;
        line-height: 36px;
        background-image: url('@images/riskWarning/两金.png');
        background-size: 100% 100%;
        padding-left: 10px;

        .title,
        i {
            font-size: 12px;
            font-weight: 500;
            line-height: 20px;
            text-transform: uppercase;
            letter-spacing: 0px;
            color: #DBF9FF;
        }

        .value {
            font-size: 16px;
            font-weight: 500;
            line-height: 20px;
            text-align: right;
            letter-spacing: 0px;
            color: #00CCFF;
            margin-right: 4px;
        }
    }

    .item:not(:last-child) {
        margin-right: 20px;
    }
}
</style>