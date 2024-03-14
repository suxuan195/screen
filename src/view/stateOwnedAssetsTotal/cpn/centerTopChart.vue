<template>
    <div class="chartBox">
        <div class="chart">
            <h2>单位<i>（亿元）</i></h2>
            <div class="list">
                <div class="item" v-for="(item, index) in state.list" :key="index">
                    <div class="num" v-for="(v, i) in item.value" :key="i + '11'" :class="v != '.' ? 'bgCircle' : ''"
                        :style="{ 'width': v == '.' ? '6px' : '24px' }">
                        <i>{{ v }}</i>
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
import { reactive, onMounted } from "vue";
const state = reactive({
    bar: ["当月数据", "年度数据"],
    tag: 0,
    list: [
        {
            name: "本年累计",
            value: '07300.00',
        },
        {
            name: "本月数",
            value: '07300.00',
        },
        {
            name: "上年同期",
            value: '07300.00',
        },
    ],
});
// const init = () => {
//   state.list.forEach((item) => {
//     item.value = item.value.toString().padStart(5, "0");
//   });
// };
onMounted(() => {
    // init();
});

const selcetBar = (e) => {
    state.tag = e;
};
</script>
        
<style lang="scss" scoped>
.chartBox {
    width: 864px;
    height: 364px;
    margin-bottom: 50px;
    background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
    padding: 16px;
    box-sizing: border-box;

    .chart {
        position: relative;

        .list {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            margin-top: 70px;

            .item {
                width: 240px;
                height: 160px;
                margin: 0 20px;
                background: url("@images/employeeAllocation/ct-bg.png") 0% 0% / 100% 100% no-repeat;
                padding-top: 30px;
                text-align: center;
                box-sizing: border-box;

                .num {
                    display: inline-block;
                    width: 24px;
                    height: 28px;
                    line-height: 28px;
                    background-size: 100% 100%;
                    margin: 0 2px;
                    text-align: center;
                }

                .bgCircle {
                    background: url('@images/employeeAllocation/num-bg.png');
                }

                .title {
                    margin-top: 12px;
                    font-size: 14px;
                    text-align: center;
                }
            }
        }

        h2 {
            font-size: 12px;
            font-weight: 500;
            line-height: 16px;
            color: #FFFFFF;
        }

    }
}
</style>
        