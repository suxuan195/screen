<template>
    <div class="leftTopBox">
        <div class="topBox">
            <img :src="props.imgUrl" alt="">
            <ul>
                <li><span>企业名称</span><i class="value">{{ title }}</i></li>
                <li>
                    <span>所属行业</span><i class="value">制造业</i>
                </li>
                <li> <span>经营收入</span><i class="value">1132.6</i><i class="unit">亿元</i></li>
            </ul>
        </div>
        <ScrollTable :tableData="state.tableData" :options="state.options" :height="110" style="padding: 0;"
            :hasIndex="true" hasIndexTitle="序列">
        </ScrollTable>
    </div>
</template>
    
<script setup>
import { reactive } from 'vue';
import defaultUrl from '@images/jGEnterpriseManagement/产业布局分析图.png';
const props = defineProps({
    imgUrl: {
        type: String,
        default() {
            return defaultUrl
        }
    },
    title: {
        type: String,
        default: ''
    }
})
const state = reactive({
    options: [
        { prop: "sequence", label: "行业名称" },
        { prop: "proportion", label: "投资金额/万元" },
    ],
    tableData: [
        {
            sequence: "投资类",
            companytName: "甘肃省公路航空旅游投资集I",
            proportion: "95.90 ",
        },
        {
            sequence: "投资类",
            companytName: "甘肃省建设投资（控股）集I",
            proportion: "95.90",
        },
        {
            sequence: "投资类",
            companytName: "金川集团股份有限公司",
            proportion: "95.90",
        },
        {
            sequence: "投资类",
            companytName: "酒泉钢铁（集团）有限责任",
            proportion: "95.90",
        },
        {
            sequence: "投资类",
            companytName: "酒泉钢铁（集团）有限责任",
            proportion: "95.90",
        },
        {
            sequence: "投资类",
            companytName: "酒泉钢铁（集团）有限责任",
            proportion: "95.90",
        },
    ],
})
</script>
    
<style lang="scss" scoped>
.leftTopBox {
    width: 432px;
    height: 218px;
    background-image: url('@images/IntelligentEnergyManagement/chart_bg.png');
    background-size: 100% 100%;
    padding: 8px 12px;
    box-sizing: border-box;
    margin-bottom: 54px;

    .topBox {
        display: flex;

        img {
            width: 130px;
            height: 90px;
        }
    }

    ul {
        margin-left: 8px;

        li {
            padding-left: 8px;
            width: 256px;
            height: 28px;
            line-height: 28px;
            margin-bottom: 4px;
            background-size: 100% 100%;
            background-image: url('@images/jGEnterpriseManagement/企业名称框.png');
            white-space: nowrap;

            span {
                font-size: 14px;
                font-weight: 500;
                line-height: 20px;
                text-transform: uppercase;
                letter-spacing: 0px;
                color: #DBF9FF;
            }

            .value {
                font-size: 14px;
                font-weight: 500;
                line-height: 20px;
                text-align: right;
                letter-spacing: 0px;
                color: #00CCFF;
                padding-left: 4px;
            }

            .unit {
                font-size: 12px;
                font-weight: 500;
                line-height: 20px;
                letter-spacing: 0px;
                color: #DBF9FF;
                padding-left: 4px;
            }
        }
    }
}
</style>