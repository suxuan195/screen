<template>
    <div class="leftCenterChart">
        <div class="item" v-for="(item, index) in state.cardList" :key="index + 'item'">
            <h2>{{ item.title }}</h2>
            <ul>
                <li v-for="(it, itIndex) in  item.child" :key="itIndex + 'row'" @click="itemClick(index, itIndex)">
                    <h3>{{ it.title }}</h3>
                    <p>{{ it.num }}<i>{{ it.unit }}</i></p>
                </li>
            </ul>
        </div>
        <!-- 省属下级全级次企业 -->
        <economizeEnterprises :showModel="state.showModel" :title="state.title" />
    </div>
</template>
    
<script setup>
import { reactive, onMounted } from 'vue'
import economizeEnterprises from "../popup/economizeEnterprises.vue";
import emitBus from "@utils/bus";
const state = reactive({
    cardList: [
        {
            title: '省属下级全级次企业',
            child: [
                {
                    title: '正常运行企业数',
                    num: '203',
                    unit: '个'
                },
                {
                    title: '正常运行率',
                    num: '25',
                    unit: '%'
                },
                {
                    title: '企业平均会议数',
                    num: '11',
                    unit: '次'
                }
            ]
        },
        {
            title: '省属集团企业',
            child: [
                {
                    title: '正常运行企业数',
                    num: '22',
                    unit: '个'
                },
                {
                    title: '正常运行率',
                    num: '76',
                    unit: '%'
                },
                {
                    title: '企业平均会议数',
                    num: '18',
                    unit: '次'
                }
            ]
        }, {
            title: '市属全级次企业',
            child: [
                {
                    title: '正常运行企业数',
                    num: '15',
                    unit: '个'
                },
                {
                    title: '正常运行率',
                    num: '2',
                    unit: '%'
                },
                {
                    title: '企业平均会议数',
                    num: '7',
                    unit: '次'
                }
            ]
        }
    ],
    showModel: false,
    title: ''
})
const itemClick = (index, itIndex) => {
    if (index === 0 && itIndex === 0 || index === 1 && itIndex === 0 || index === 2 && itIndex === 0) {
        state.title = state.cardList[index].title
        state.showModel = true
    }
}
onMounted(() => {
    emitBus.on("closeModel", () => {
        state.showModel = false;
    });
})
</script>
<style lang="scss" scoped>
.leftCenterChart {
    background-image: url('@images/IntelligentEnergyManagement/chart_bg.png');
    background-size: 100% 100%;
    width: 432px;
    height: 344px;
    padding: 16px;
    box-sizing: border-box;

    .item {
        h2 {
            font-size: 18px;
            font-weight: normal;
            line-height: 18px;
            letter-spacing: 0px;
            background: linear-gradient(180deg, #FFFFFF 14%, #54B8FE 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            z-index: 0;
        }

        ul {
            display: flex;
            justify-content: space-between;

            li {
                margin-bottom: 25px;
                margin-top: 20px;

                h3 {
                    font-size: 14px;
                    font-weight: normal;
                    line-height: 14px;
                    letter-spacing: 0px;
                    color: #FFFFFF;
                }

                p {
                    margin-top: 8px;
                    font-size: 24px;
                    font-weight: normal;
                    line-height: 24px;
                    letter-spacing: 0px;
                    color: #00CCFF;

                    i {
                        font-size: 14px;
                        font-weight: normal;
                        line-height: 14px;
                        text-align: right;
                        letter-spacing: 0px;
                        color: #FFFFFF;
                    }
                }
            }

            li:first-child {
                cursor: pointer;
            }

            li:not(:last-child) {
                position: relative;

                &::after {
                    content: '';
                    right: -35px;
                    position: absolute;
                    height: 40px;
                    top: 0;
                    width: 2px;
                    background-image: url('@images/tripleAndLarge/会议覆盖运行情况线条.png');
                    background-size: 100% 100%;
                }
            }
        }
    }
}
</style>