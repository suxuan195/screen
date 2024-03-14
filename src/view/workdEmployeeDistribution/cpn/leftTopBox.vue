<template>
    <div class="chartBox">
        <div class="chart">
            <div class="list">
                <div class="item" v-for="(item, index) in state.list" :key="index">
                    <div class="num">
                        <span v-for="(v, i) in item.value" :key="i">{{ v }}</span>
                    </div>
                    <div class="title ttf">
                        {{ item.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
        
<script setup>
import { reactive } from "vue";
const state = reactive({
    bar: ["当月数据", "年度数据"],
    tag: 0,
    list: [
        {
            name: "工资发放总额（亿元）",
            value: '6573939',
        },
        {
            name: "职工总人数（人）",
            value: '327508',
        },
        {
            name: "人均工资（万元）",
            value: '0970000',
        },
    ],
    tableHeader: [],
    tableData: []
});

const selcetBar = (e) => {
    state.tag = e;
};
</script>
        
<style lang="scss" scoped>
.chartBox {
    width: 888px;
    height: 364px;
    margin-bottom: 50px;
    background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;

    .chart {
        position: relative;

        .list {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 364px;
            color: #fff;

            .item {
                width: 238px;
                height: 158px;
                margin: 0 32px;
                display: flex;
                flex-direction: column;
                // justify-content: center;
                align-items: center;
                background: url("@images/employeeAllocation/ct-bg.png") 0% 0% / 100% 100% no-repeat;
                cursor: pointer;

                .num {
                    margin-top: 31px;
                    margin-bottom: 4px;

                    span {
                        display: inline-block;
                        width: 24px;
                        height: 28px;
                        line-height: 28px;
                        background: url("@images/employeeAllocation/num-bg.png") 0% 0% / 100% 100% no-repeat;
                        margin: 0 2px;
                        text-align: center;
                    }
                }

                .title {
                    font-size: 14px;
                }
            }
        }

        .bar {
            position: absolute;
            right: 10px;
            top: 21px;
            font-size: 12px;
            display: flex;
            z-index: 9;

            .item {
                color: #fff;
                margin-left: 15px;
                height: 18px;
                line-height: 18px;
                text-align: center;
                width: 82px;
                cursor: pointer;
                border-radius: 15px;
                box-sizing: border-box;

                &:hover {
                    background: #1766a1;
                    border: 1px solid #166cff;
                }
            }

            .item.active {
                background: #1766a1;
                border: 1px solid #166cff;
            }
        }
    }
}
</style>
        