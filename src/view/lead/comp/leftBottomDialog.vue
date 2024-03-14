<template>
    <Popup :width="1279" :height="518" :showModel="showModel" title="项目分布情况" class="popup1">
        <div class="main">
            <div class="tableX">
                <!-- show-summary sum-text="汇总"  -->
                <el-table :data="props.tableData" style="width: 100%" max-height="400" :summary-method="getSummaries"
                    tooltip-effect="light" :cell-style="{
                        background: 'rgba(18,50,86)',
                        color: 'white',
                        border: '2px solid #193362',
                    }" class="custom-table" :header-cell-style="{
    borderTop: '2px solid #11518C',
    borderBottom: '2px solid #1D80CF', borderLeft: '2px solid',
    borderRight: '2px solid',
    borderImage: 'linear-gradient(180deg,  rgba(0, 155, 255, 0.1) 40%, rgba(0, 155, 255, 0.8) 100%) 2 2 2 2' /* 先设置透明的左边框 */
}">
                    >
                    <el-table-column type="index" width="80" label="序号" align="center" />
                    <el-table-column prop="institutionName" show-overflow-tooltip label="机构名称" align="center" width="200" />
                    <el-table-column prop="entryName" align="center" show-overflow-tooltip label="项目名称" width="100" />
                    <!-- <el-table-column prop="projectType" align="center" show-overflow-tooltip label="项目类型" width="100" /> -->
                    <el-table-column prop="projectDominName" align="center" show-overflow-tooltip label="项目所属行业领域名称"
                        width="200" />
                    <el-table-column prop="projectCountry" align="center" show-overflow-tooltip label="项目所在国家地区及城市"
                        width="200" />
                    <el-table-column prop="duration" align="center" show-overflow-tooltip label="工期(月)" width="200" />
                    <el-table-column prop="totalInvestment" align="center" show-overflow-tooltip label="投资总额(万元)"
                        width="150" />
                    <el-table-column prop="approvedAmount" align="center" show-overflow-tooltip label="国资委批复金额(万)"
                        width="200" />
                    <el-table-column prop="commencementDate" align="center" show-overflow-tooltip label="项目开工日期"
                        width="150" />
                    <el-table-column prop="productionDate" align="center" show-overflow-tooltip label="项目投产日期"
                        width="150" />
                </el-table>
            </div>
        </div>
    </Popup>
</template>
    
<script setup>
import Popup from "@/components/popup/pop.vue";
import moment from "moment"
import { reactive } from "vue";
const props = defineProps({
    showModel: {
        type: Boolean,
        default: false,
    },
    slide: {
        type: Array,
        default() {
            return []
        }
    },
    tableData: {
        type: Array,
        default() {
            return []
        }
    }
});
const state = reactive({
    tag: 0,
    tableData: [
        {
            name: "沙漠水资XXXX源环境保护项目",
            location: "欧洲",
            country: "乌克兰",
            type: "股权产权投资",
            count: 556,
            state: "正在施工建设",
        },
        {
            name: "沙漠水资XXXX源环境保护项目",
            location: "欧洲",
            country: "乌克兰",
            type: "股权产权投资",
            count: 556,
            state: "正在施工建设",
        },
        {
            name: "沙漠水资XXXX源环境保护项目",
            location: "欧洲",
            country: "乌克兰",
            type: "股权产权投资",
            count: 556,
            state: "正在施工建设",
        },
        {
            name: "沙漠水资XXXX源环境保护项目",
            location: "欧洲",
            country: "乌克兰",
            type: "股权产权投资",
            count: 556,
            state: "正在施工建设",
        },
        {
            name: "沙漠水资XXXX源环境保护项目",
            location: "欧洲",
            country: "乌克兰",
            type: "股权产权投资",
            count: 556,
            state: "正在施工建设",
        },
        {
            name: "沙漠水资XXXX源环境保护项目",
            location: "欧洲",
            country: "乌克兰",
            type: "股权产权投资",
            count: 556,
            state: "正在施工建设",
        },

        {
            name: "沙漠水资XXXX源环境保护项目",
            location: "欧洲",
            country: "乌克兰",
            type: "股权产权投资",
            count: 556,
            state: "正在施工建设",
        },
        {
            name: "沙漠水资XXXX源环境保护项目",
            location: "欧洲",
            country: "乌克兰",
            type: "股权产权投资",
            count: 556,
            state: "正在施工建设",
        },
        {
            name: "沙漠水资XXXX源环境保护项目",
            location: "欧洲",
            country: "乌克兰",
            type: "股权产权投资",
            count: 556,
            state: "正在施工建设",
        },
        {
            name: "沙漠水资XXXX源环境保护项目",
            location: "欧洲",
            country: "乌克兰",
            type: "股权产权投资",
            count: 556,
            state: "正在施工建设",
        },
        {
            name: "沙漠水资XXXX源环境保护项目",
            location: "欧洲",
            country: "乌克兰",
            type: "股权产权投资",
            count: 556,
            state: "正在施工建设",
        },
    ],
});
const getSummaries = (param) => {
    const { columns, data } = param
    const sums = []
    columns.forEach((column, index) => {
        if (index === 0) {
            sums[index] = '总计'
            return
        } else if (index === 3) {
            const values = data.map((item) => Number(item[column.property]))
            sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr)
                if (!Number.isNaN(value)) {
                    return prev + curr
                } else {
                    return prev
                }
            }, 0)
        } else {
            sums[index] = ''
        }
    })

    return sums
}
// 日期格式化方法
const formatDate = (row, column) => {
    const daterc = row[column.property];
    return daterc ? moment(daterc).format('YYYY-MM-DD') : '';
}
// onMounted(() => {
//   init();
// });
const emit = defineEmits(['clickItem'])
const clickItem = (e) => {
    state.tag = e;
    emit('clickItem', e)
};



</script>
    
<style lang="scss" scoped>
.main {
    padding: 24px;
    display: flex;
    justify-content: space-between;

    .tableX {
        width: 100%;

        :deep(.custom-table) {
            background: rgba(32, 153, 245, 0.12);



            .el-table__inner-wrapper::before {
                background: transparent;
            }

            .el-table__header {
                th {
                    background: linear-gradient(to bottom, rgba(12, 66, 111) 30%, rgba(15, 38, 70, 1) 100%);
                    border-color: #0c223a;
                    color: #ffffff;
                    font-size: 14px;
                    font-weight: normal;
                    line-height: normal;
                    text-align: center;
                    letter-spacing: 0em;
                }
            }

            .el-table__body tr:hover>td {
                background-color: rgba($color: rgba(32, 153, 245, 0.12), $alpha: .9) !important;
            }

            .el-table__body tr.current-row>td {
                background-color: rgba($color: rgba(32, 153, 245, 0.12), $alpha: .9) !important;
            }

            /* 这里可以根据需要调整边框线的样式 */
        }



    }

    .slide {
        width: 140px;
        height: 400px;

        box-sizing: border-box;

        /* 矩形 49 */
        border-radius: 10px;
        background: linear-gradient(157deg,
                rgba(129, 206, 255, 0.08) 24%,
                rgba(129, 206, 255, 0.19) 85%);

        box-sizing: border-box;
        border: 1px solid #4cb3f3;

        .list {
            padding: 12px 6px;

            .item {
                cursor: pointer;
                /* 矩形 57 */
                padding: 0 6px;
                height: 32px;
                line-height: 32px;
                color: #9e9e9e;
                white-space: nowrap;
                /* 禁止换行 */
                overflow: hidden;
                /* 溢出部分隐藏 */
                text-overflow: ellipsis;
                /* 显示省略号 */
            }

            .active.item {
                background: #008cff;
                color: #fff;
            }
        }
    }
}

:deep(.custom-table) {
    .el-table__footer {
        tr {
            td {
                background: linear-gradient(to bottom, rgba(12, 66, 111) 30%, rgba(15, 38, 70, 1) 100%);
                border-color: #0c223a;
                color: #ffffff;
            }
        }
    }
}

:deep(.el-scrollbar__wrap) {
    overflow-x: hidden !important;
}

:deep(.el-table__empty-block) {
    background-color: transparent;
}
</style>