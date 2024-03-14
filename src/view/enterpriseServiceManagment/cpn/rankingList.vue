<template>
    <ul class="rankingList">
        <li v-for="(item, index) in  props.list" :key="index + '11'">
            <div class="flex">
                <i :style="{ 'background-color': state.colorList[index] }"></i>
                <el-tooltip :content="item">
                    <h2 @click="view(item)">{{ item }}</h2>
                </el-tooltip>
            </div>
            <p :style="{ 'background-color': hexToRgb(state.colorList[index], 0.2), 'color': state.colorList[index] }">TOP{{
                index + 1 }}</p>
        </li>
    </ul>
    <teleport to="#screen">
        <readTextDialog ref="readTextDialogRef"></readTextDialog>
    </teleport>
    <teleport to="#screen">
        <downTableDialog ref="downTableDialogRef"></downTableDialog>
    </teleport>
    <teleport to="#screen">
        <useTableDialog ref="useTableDialogRef"></useTableDialog>
    </teleport>
</template>
    
<script setup>
import { reactive, ref, inject } from 'vue';
import { hexToRgb } from "@/utils";
import readTextDialog from '../dialog/readTextDialog.vue';
import downTableDialog from '../dialog/downTableDialog.vue';
import useTableDialog from '../dialog/useTableDialog.vue';
const title = inject('title');
const readTextDialogRef = ref(null);
const state = reactive({
    colorList: ['#1866E5', '#F6BB3B', '#A2A256', '#09BAE0', '#F1606C']
})
const props = defineProps({
    list: {
        type: Array,
        default: () => []
    },
})

const view = (item) => {
    if (title == '热门咨询阅读TOP5') {
        readTextDialogRef.value.getText(item)
    }
}

</script>
    
<style lang="scss" scoped>
.rankingList {
    li {
        display: flex;
        justify-content: space-between;
        border-bottom: 0.5px dashed rgba(219, 249, 255, 0.5);
        padding: 10px 0;

        .flex {
            display: flex;
            align-items: center;
        }

        i {
            margin-right: 8px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            display: block;
        }

        h2 {
            font-size: 12px;
            font-weight: 500;
            line-height: 16px;
            letter-spacing: 0px;
            color: #FFFFFF;
            width: 340px;
            cursor: pointer;

            white-space: nowrap;
            /* 文本不换行 */
            overflow: hidden;
            /* 超出部分隐藏 */
            text-overflow: ellipsis;
            /* 超出部分显示省略号 */
        }

        p {
            font-size: 12px;
            width: 40px;
            height: 16px;
            text-align: center;
            line-height: 16px;
            border-radius: 2px;
        }
    }
}
</style>