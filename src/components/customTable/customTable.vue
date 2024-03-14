<template>
    <div class="customTable">
        <el-table :data="props.tableData" style="width: 100%;" :max-height="props.maxHeight" :cell-style="cellStyle"
            class="custom-table" :header-cell-style="headerCellStyle">
            <el-table-column type="index" width="80" v-if="hasIndex" label="序号" align="center" />
            <template v-for="(item, index) in props.tableHeader">
                <el-table-column v-if="item.without" :prop="item.prop" :label="item.label" :width="item.width"
                    align="center" :show-overflow-tooltip="true" :class-name="item.className" :sortable="item.sortable"
                    :key="index + 'row'">
                    <template #default="scope">
                        <div :class="scope.row[item.prop] === 1 ? 'acitveRed' : 'no_active'">
                            <div class="default">
                                <p></p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column v-else-if="item.iconShow" :prop="item.prop" :show-overflow-tooltip="true" align="center"
                    :key="index + '22'">
                    <template #header>
                        <div class="column-header" style="display: flex;align-items: center;">
                            <img :src="item.icon" alt="" srcset="" style="width: 20px;height: 20px;">
                            <p style="margin-left: 11px;"> {{ item.label }}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column v-else :prop="item.prop" :label="item.label" :width="item.width" align="center"
                    :show-overflow-tooltip="true" :class-name="item.className" :sortable="item.sortable"
                    :key="index + '11'">
                    <template v-if="item.children && item.children.length">
                        <el-table-column v-for="(it, itIndex) in  item.children" :prop="it.prop" :width="it.width"
                            align="center" :label="it.label" :show-overflow-tooltip="true" :key="itIndex + it.prop">
                        </el-table-column>
                    </template>
                </el-table-column>
            </template>
        </el-table>
    </div>
</template>
    
<script setup>
const props = defineProps({
    tableHeader: {
        type: Array,
        default: function () {
            return [];
        },
    },
    tableData: {
        type: Array,
        default: function () {
            return [];
        }
    },
    maxHeight: {
        type: String,
        default: '430px'
    },
    hasIndex: {
        type: Boolean,
        default: false
    }
})
const cellStyle = {
    background: 'rgba(18,50,86)',
    color: 'white',
    border: '2px solid #193362',
}
const headerCellStyle = {
    borderTop: '2px solid #11518C',
    borderBottom: '2px solid #1D80CF',
    borderLeft: '2px solid',
    borderRight: '2px solid',
    borderImage: 'linear-gradient(180deg,  rgba(0, 155, 255, 0.1) 40%, rgba(0, 155, 255, 0.8) 100%) 2 2 2 2' /* 先设置透明的左边框 */
}
</script>
    
<style lang="scss" scoped>
.customTable {
    :deep(.custom-table) {
        background: rgba(32, 153, 245, 0.12);

        &::before,
        &::after {
            display: none !important;
        }

        .el-table__inner-wrapper {

            &::before,
            &::after {
                display: none !important;
            }

            .el-table__border-left-patch {
                display: none;
            }
        }

        .acitveRed {
            width: 20px;
            height: 20px;
            background: rgba(35, 124, 3, 0.1);
            border-radius: 50%;
            margin: auto;
            position: relative;

            .default {
                width: 11.7px;
                height: 11.7px;
                text-align: center;
                line-height: 11.7px;
                border: 2px solid #54DA25;
                box-shadow: 0px 4px 10px 0px rgba(161, 255, 128, 0.48);
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);

                p {
                    width: 3.4px;
                    height: 3.4px;
                    text-align: center;
                    line-height: 3.4px;
                    border-radius: 50%;
                    background: #237C03;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }
        }

        .no_active {
            width: 20px;
            height: 20px;
            opacity: 1;
            background: rgba(255, 51, 51, 0.1);
            border-radius: 50%;
            margin: auto;
            position: relative;

            .default {
                width: 11.7px;
                height: 11.7px;
                text-align: center;
                line-height: 11.7px;
                opacity: 1;
                border: 2px solid #FF3333;
                box-shadow: 0px 4px 10px 0px rgba(161, 255, 128, 0.48);
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);

                p {
                    width: 3.4px;
                    height: 3.4px;
                    text-align: center;
                    line-height: 3.4px;
                    opacity: 1;
                    border-radius: 50%;
                    background: #780000;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }
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

        .el-table__header {
            th {
                background: linear-gradient(to bottom,
                        rgba(12, 66, 111) 30%,
                        rgba(15, 38, 70, 1) 100%);
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
            background-color: rgba($color: rgba(32, 153, 245, 0.12),
                    $alpha: 0.9) !important;
        }

        .el-table__body tr.current-row>td {
            background-color: rgba($color: rgba(32, 153, 245, 0.12),
                    $alpha: 0.9) !important;
        }

        /* 这里可以根据需要调整边框线的样式 */
    }

    :deep(.active) {
        .el-tooltip {
            color: #32D6F9;
        }
    }

    :deep(.hrefActive) {
        .el-tooltip {
            cursor: pointer;
            color: #32D6F9;
            text-decoration: underline;
        }
    }
}
</style>