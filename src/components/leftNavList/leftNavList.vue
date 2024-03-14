<template>
    <el-scrollbar :height="height" class="left_list" :max-height="maxHeight">
        <li v-for="(item, index) in  props.list" :key="index + item.title" :class="index === state.active ? 'active' : ''"
            @click="itemClick(index)">
            <span> {{ item.title }}</span>
        </li>
    </el-scrollbar>
</template>
    
<script setup>
import { reactive } from "vue";
const props = defineProps({
    list: {
        type: Array,
        default() {
            return []
        }
    },
    height: {
        type: String,
        default: '400px'
    },
    maxHeight: {
        type: String,
        default: '400px'
    }
})

const state = reactive({
    list: [],
    active: 0,
})
const emits = defineEmits(['itemClick'])
const itemClick = (index) => {
    state.active = index
    emits('itemClick', index)
}
</script>
    
<style lang="scss" scoped>
.left_list {
    width: 140px;
    border-radius: 10px;
    box-sizing: border-box;
    border: 1px solid #4CB3F3;
    backdrop-filter: blur(10px);
    padding: 12px 0;
    background: linear-gradient(157deg, rgba(129, 206, 255, 0.0784) 24%, rgba(129, 206, 255, 0.19) 85%);

    .active {
        background: #008CFF;
        color: #FFFFFF;

        &::before {
            left: -9px;
            top: 50%;
            transform: translateY(-50%);
            position: absolute;
            content: '';
            width: 5px;
            height: 32px;
            opacity: 1;
            background: linear-gradient(180deg, #FFFFFF 0%, #008CFF 100%);
        }
    }

    li {
        position: relative;
        color: #9E9E9E;
        padding-left: 12px;
        cursor: pointer;
        font-size: 14px;
        margin-left: 6px;
        list-style: none;
        margin-bottom: 8px;
        box-sizing: border-box;

        span {
            padding: 6px 0;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        &:hover {
            background: #008CFF;
            color: #FFFFFF;

            &::before {
                left: -9px;
                top: 50%;
                transform: translateY(-50%);
                position: absolute;
                content: '';
                width: 5px;
                height: 32px;
                opacity: 1;
                background: linear-gradient(180deg, #FFFFFF 0%, #008CFF 100%);
            }
        }
    }
}
</style>