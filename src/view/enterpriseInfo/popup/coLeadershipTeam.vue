<template>
    <Dialog :width="857" :height="518" :showModel="showModel" title="领导班子建设情况" @close="close">
        <div class="content">
            <leftNavList height="380px" maxHeight="380px" :list="state.list" />
            <div style="width: 640px;padding-left: 24px;">
                <custom-table :tableHeader="state.tableHeader" :tableData="state.tableData" maxHeight="405px"
                    :hasIndex="true" />
            </div>
        </div>
    </Dialog>
</template>
    
<script setup>
import { ref, reactive, onMounted } from "vue";
import Dialog from "@components/Dialog/index.vue";
import customTable from "@components/customTable/customTable.vue";
import leftNavList from "@components/leftNavList/leftNavList.vue";
const showModel = ref(false)
const state = reactive({
    list: [],
    tableHeader: [
        {
            label: '党委会成员数',
            prop: 'name1'
        },
        {
            label: '董事会成员数',
            prop: 'name2'
        },
        {
            label: '监事会成员数',
            prop: 'name3'
        }
    ],
    tableData: [
        {
            name1: '8',
            name2: '9',
            name3: '3'
        },
        {
            name1: '8',
            name2: '9',
            name3: '3'
        },
        {
            name1: '8',
            name2: '9',
            name3: '3'
        },
        {
            name1: '8',
            name2: '9',
            name3: '3'
        },
        {
            name1: '8',
            name2: '9',
            name3: '3'
        },
        {
            name1: '8',
            name2: '9',
            name3: '3'
        },
        {
            name1: '8',
            name2: '9',
            name3: '3'
        },
        {
            name1: '8',
            name2: '9',
            name3: '3'
        },
        {
            name1: '8',
            name2: '9',
            name3: '3'
        },
        {
            name1: '8',
            name2: '9',
            name3: '3'
        }
    ]
})
const close = () => {
    showModel.value = false
}
onMounted(() => {
    for (let index = 0; index < 12; index++) {
        state.list.push({
            title: '我是企业名称我是企业名称' + index
        })
    }
})
defineExpose({
    showModel
});
</script>
    
<style lang="scss" scoped>
.content {
    padding: 34px 24px;
    display: flex;
    box-sizing: border-box;

    .left_list {
        width: 140px;
        border-radius: 10px;
        box-sizing: border-box;
        border: 1px solid #4CB3F3;
        backdrop-filter: blur(10px);
        padding: 12px 0;

        .active {
            background: #008CFF;
            color: #FFFFFF;

            &::before {
                left: -10px;
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
                    left: -10px;
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
}
</style>