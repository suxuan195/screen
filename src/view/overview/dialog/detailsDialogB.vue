<template>
    <Dialog :width="1564" :height="890" :showModel="showModel" title="明细信息" @close="close">
        <div class="details">
            <h2>甘肃省新业资产经营有限责任公司</h2>
            <h3>经理层办公会区</h3>
            <meetingInfoList title="议题信息" :mettingList="state.meetingList" />
            <meetingInfoList title="决策信息" :mettingList="state.meetingList2" class="mt32" />
            <meetingInfoList title="会议信息" :mettingList="state.meetingList3" class="mt32" />
            <meeting-topics-list />
        </div>
    </Dialog>
</template>
      
<script setup>
import Dialog from "@components/Dialog/index.vue";
import { ref, reactive } from "vue";
import { useList } from "../hooks/centerBottomData";
import customTable from '../../../components/customTable/customTable.vue'
import meetingInfoList from "./meetingInfoList.vue";
import meetingTopicsList from "./meetingTopicsList.vue";
const { list, getList } = useList();
const showModel = ref(false);
const form = reactive({
    name: "",
    code: "",
});
const state = reactive({
    tableData: [],
    tableHeader: [
        {
            label: "企业名称",
            width: "0",
            prop: "name",
            sortable: true
        },
        {
            label: "净利润（亿元)",
            width: "0",
            prop: "price",
            sortable: true
        },
        {
            label: "时间",
            width: "0",
            prop: "date",
            sortable: true
        },
    ],
    total: 10,
    page: 1,
    size: 10,
    meetingList: [
        {
            name: "议题名称",
            desc: '--'
        },
        {
            name: "通过情况",
            desc: '--'
        },
        {
            name: "议题编码",
            desc: '--'
        },
        {
            name: "是否听取意见",
            desc: '--'
        },
        {
            name: "列席人",
            descP: '1280px'
        },
        {
            name: "审议结果",
            descP: '1280px'
        },
        {
            name: "议题决议",
            descP: '1280px'
        },
        {
            name: "专项名称",
            desc: '---'
        },
        {
            name: "任务来源",
            desc: '---',
        },
    ],
    meetingList2: [
        {
            name: "对应事项清单和决策顺序",
            desc: '--',
            descP: '1280px'
        },
        {
            name: '实际决策顺序',
            desc: '--',
            descP: '1280px'
        }
    ],
    meetingList3: [
        {
            name: "会议名称",
            desc: '总经理办公会2023年第八次会议',
        },
        {
            name: '会议编码',
            desc: 'JL20230008',
        },
        {
            name: '主持人',
            desc: '谢春生',
        },
        {
            name: '主持人',
            desc: '2023年07月12日',
        },
        {
            name: '参会人',
            desc: '2023年07月12日',
            optionList: [
                {
                    name: '谢春生',
                    position: "外部董事"
                },
                {
                    name: '白凤宝',
                    position: '党委委员'
                }
            ],
            descP: '1280px'
        },
        {
            name: '会议通知',
            desc: '--',
        },
        {
            name: '会议纪要',
            desc: '甘肃新业公司总经办2023年第八次会议纪要.pdf',
            download: true
        },
    ]
});
const onSearch = () => {
    getList(form);
};

const handleSizeChange = (val) => {
    state.size = val;
    getList(form);
};
const handleCurrentChange = (val) => {
    state.page = val;
    getList(form);
};
const onReset = () => {
    form.name = "";
    //   form.code = "";
    getList(form);
};

const setList = (name) => {
    form.code = name;
    getList(form);
    state.tableData = list;
};
const close = () => {
    showModel.value = false;
    state.tableData = [];
};
defineExpose({
    setList,
    showModel,
});
</script>
      
<style lang="scss" scoped>
.details {
    padding: 0 40px;
    margin-top: 36px;
    overflow: auto;
    max-height: 800px;

    h2 {
        font-size: 32px;
        font-weight: normal;
        line-height: 40px;
        text-align: center;
        letter-spacing: 0px;
        background: linear-gradient(180deg, #FFFFFF 14%, #54B8FE 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
    }

    h3 {
        margin-top: 8px;
        margin-bottom: 32px;
        font-size: 16px;
        font-weight: normal;
        line-height: 24px;
        text-align: center;
        letter-spacing: 0em;
        color: #FFFFFF;
    }

    .mt32 {
        margin-top: 32px;
    }
}

.details::-webkit-scrollbar {
    display: none;
}
</style>
      