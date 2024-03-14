<template>
    <Dialog :width="1332" :height="560" :showModel="showModel" title="组织机构行业分布情况统计表" @close="close">
        <div class="table-wrap">
            <custom-table class="mb20" :tableData="state.tableData" maxHeight="410px" :tableHeader="state.tableHeader"
                :hasIndex="true"></custom-table>
            <div class="pagination">
                <el-pagination v-model:current-page="state.page" v-model:page-size="state.size"
                    :page-sizes="[10, 20, 30, 40, 50]" background layout="total, sizes, prev, pager, next"
                    :total="state.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
        </div>
    </Dialog>
</template>
      
<script setup>
import Dialog from "@components/Dialog/index.vue";
import { ref, reactive } from "vue";
import { useList } from "../hooks/centerBottomData";
import customTable from '../../../components/customTable/customTable.vue'
const { list, getList } = useList();
const showModel = ref(false);
const form = reactive({
    name: "",
    code: "",
});
const state = reactive({
    tableData: [{
        name: '研究集团公司本部融资事项',
        price: '2023年9月15日党委常委会',
        date: '中国电力建设股份有限公司'
    }, {
        name: '研究集团公司本部融资事项',
        price: '2023年9月15日党委常委会',
        date: '中国电力建设股份有限公司'
    }, {
        name: '研究集团公司本部融资事项',
        price: '2023年9月15日党委常委会',
        date: '中国电力建设股份有限公司'
    }, {
        name: '研究集团公司本部融资事项',
        price: '2023年9月15日党委常委会',
        date: '中国电力建设股份有限公司'
    }, {
        name: '研究集团公司本部融资事项',
        price: '2023年9月15日党委常委会',
        date: '中国电力建设股份有限公司'
    }, {
        name: '研究集团公司本部融资事项',
        price: '2023年9月15日党委常委会',
        date: '中国电力建设股份有限公司'
    }, {
        name: '研究集团公司本部融资事项',
        price: '2023年9月15日党委常委会',
        date: '中国电力建设股份有限公司'
    }, {
        name: '研究集团公司本部融资事项',
        price: '2023年9月15日党委常委会',
        date: '中国电力建设股份有限公司'
    }, {
        name: '研究集团公司本部融资事项',
        price: '2023年9月15日党委常委会',
        date: '中国电力建设股份有限公司'
    }, {
        name: '研究集团公司本部融资事项',
        price: '2023年9月15日党委常委会',
        date: '中国电力建设股份有限公司'
    }],
    tableHeader: [
        {
            label: "单位名称",
            width: "0",
            prop: "name",
            sortable: true
        },
        {
            label: "组织形式",
            width: "0",
            prop: "price",
            sortable: true
        },
        {
            label: "资产总额（亿元)",
            width: "0",
            prop: "date",
            sortable: true
        },
        {
            label: "行业类别",
            width: "0",
            prop: "date",
            sortable: true
        },
    ],
    total: 10,
    page: 1,
    size: 10,
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
};
defineExpose({
    setList,
    showModel,
});
</script>
      
<style lang="scss" scoped>
.table-wrap {
    padding: 25px;
}

.form {
    margin-bottom: 20px;

    :deep(.el-form-item__label) {
        color: #fff;
        font-size: 14px;
    }

    :deep(.el-input__inner) {
        color: #fff;
    }

    :deep(.el-input__wrapper) {
        width: 280px;
        height: 32px;
        line-height: 32px;
        border-radius: 4px;
        background: linear-gradient(0deg,
                rgba(0, 155, 255, 0) 0%,
                rgba(0, 155, 255, 0.3) 100%);

        box-sizing: border-box;
        border: none;
        box-shadow: 0 0 0 1px #0093ff inset;
        border-image: linear-gradient(180deg,
                rgba(91, 239, 255, 0) 0%,
                rgba(32, 153, 245, 0.8) 100%);
    }

    .el-button {
        height: 32px;
        line-height: 32px;
        background-color: transparent;
        font-size: 14px;

        &:hover {
            background-color: #0093ff;
        }
    }

    .el-form-item {
        margin-right: 20px;
    }
}

.mb20 {
    margin-bottom: 20px;
}

.pagination {
    float: right;

    :deep(.el-pagination__total) {
        color: #fff;
        font-size: 14px;
    }

    :deep(.el-select .el-input__wrapper) {
        background-color: transparent;
        border-radius: 4px;
        height: 28px;
        line-height: 28px;
        border: none;
        box-shadow: 0 0 0 1px #0093ff inset;
    }

    :deep(.el-select .el-input__inner) {
        color: #fff;
    }

    :deep(.btn-prev) {
        background-color: transparent !important;
        color: #fff;

        &:hover {
            background-color: #0093ff !important;
        }
    }

    :deep(.btn-next) {
        background-color: transparent !important;
        color: #fff;

        &:hover {
            background-color: #0093ff !important;
        }
    }

    :deep(.el-pager li) {
        background-color: transparent !important;
        color: #fff;
        border-radius: 4px;
        font-size: 14px;
    }

    :deep(.el-pager li.is-active) {
        background-color: #0093ff !important;
    }

    :deep(.el-pagination .el-select .el-input) {
        width: 100px;
    }
}
</style>
<style>
.el-select-dropdown__item {
    font-size: 14px !important;
}
</style>
      