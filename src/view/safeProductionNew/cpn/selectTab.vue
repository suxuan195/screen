<template>
    <div class="select">
        <div class="top" :style="{ width: props.width }">
            <span>{{ selectValue }}</span>
            <el-icon>
                <ArrowDown />
            </el-icon>
            <ul :style="{ width: props.width }">
                <li v-for="(item, index) in props.optionList" :key="index + '11'" @click="selectClick(item)">
                    {{ item.label }}</li>
            </ul>
        </div>

    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
const selectValue = ref('')
const props = defineProps({
    width: {
        type: String,
        default: '420px'
    },
    optionList: {
        type: Array,
        default() {
            return []
        }
    }
})
// 声明一个跟 ref 同名的变量即可，来保存元素
const emit = defineEmits(['selectChange'])
const selectClick = (val) => {
    selectValue.value = val.label
    emit('selectChange', val.value)
}
onMounted(() => {
  console.log(props.optionList,'props.optionList',props.optionList[0].label)
    selectValue.value = props.optionList.length && props.optionList[0].label
})
</script>

<style lang="scss" scoped>
.select {
    .top {
        padding: 4px 8px;
        width: 240px;
        height: 16px;
        line-height: 16px;
        background-color: #1766A1;
        display: flex;
        justify-content: space-between;
        border-radius: 16px;
        cursor: pointer;
        position: relative;
        z-index: 100;

        &:hover {
            ul {
                display: block;
            }
        }

        >span {
            font-size: 12px;
            font-weight: 500;
            text-align: right;
            letter-spacing: 0em;
            color: #FFFFFF;
        }

        .el-icon {
            color: #FFFFFF;
        }

        ul {
            display: none;
            position: absolute;
            top: 25px;
            left: 0;
            z-index: 100;
            padding: 4px 8px;
            height: 50px;
            max-height: 50px;
            overflow: auto;
            background-color: #1766A1;

            li {
                cursor: pointer;
                color: #FFFFFF;
                font-size: 12px;
                line-height: 24px;
            }
        }
    }
}
</style>
