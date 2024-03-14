<template>
    <div>
        <ul class="topList">
            <li v-for="(item, index) in  state.cardList" :key="index + 'card'">
                <div v-for="(it, itIndex) in  item.liList" :key="itIndex + 'it'" class="childItem">
                    <div class="img" :style="{ marginLeft: itIndex === 1 ? '48px' : '' }">
                        <img :src="it.img" alt="" srcset="">
                    </div>
                    <div class="content" @click="tabClick(index, itIndex)"
                        :style="{ 'cursor': it.cursor ? 'pointer' : '' }">
                        <h2>{{ it.tilte }}</h2>
                        <p>{{ it.num }}<i>{{ it.unit }}</i></p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
    
<script setup>
import { reactive } from 'vue'
import bg1 from '@images/tripleAndLarge/决策制度.png'
import bg2 from '@images/tripleAndLarge/完备率.png'
import bg3 from '@images/tripleAndLarge/事项清单.png'
import bg4 from '@images/tripleAndLarge/完备率.png'
import bg5 from '@images/tripleAndLarge/召开会议.png'
import bg6 from '@images/tripleAndLarge/审议议题.png'
const state = reactive({
    cardList: [
        {
            liList: [{
                img: bg1,
                tilte: '决策制度',
                num: '503',
                unit: '个',
                cursor: true,
            }, {
                img: bg2,
                tilte: '完备率',
                num: '37.93',
                unit: '%'
            }],

        },
        {
            liList: [{
                img: bg3,
                tilte: '事项清单',
                num: '5,705',
                unit: '个',
                cursor: true
            }, {
                img: bg4,
                tilte: '完备率',
                num: '93.10',
                unit: '%',
            }],

        },
        {
            liList: [
                {
                    img: bg5,
                    tilte: '召开会议',
                    num: '6,334',
                    unit: '个',
                    cursor: true
                }
            ],

        }, {
            liList: [
                {
                    img: bg6,
                    tilte: '审议审题',
                    num: '29,092',
                    unit: '个',
                    cursor: true
                }
            ]
        }
    ],
})
const emit = defineEmits(['tabClick'])
const tabClick = (index, itIndex) => {
    emit('tabClick', index, itIndex)
}
</script>
    
<style lang="scss" scoped>
.topList {
    display: flex;


    li {
        width: 419px;
        height: 148px;
        background-image: url("@images/IntelligentEnergyManagement/top1.png");
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .img {
            width: 80px;
            height: 80px;
            margin-right: 8px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .content {
            h2 {
                font-size: 18px;
                font-weight: normal;
                line-height: 24px;
                letter-spacing: 0px;
                color: #FFFFFF;
                z-index: 0;
            }

            p {
                margin-top: 4px;
                font-size: 28px;
                font-weight: normal;
                line-height: 28px;
                letter-spacing: 0px;
                color: #00CCFF;
                z-index: 0;
                white-space: nowrap;

                i {
                    font-size: 16px;
                    font-weight: normal;
                    line-height: 20px;
                    text-align: right;
                    letter-spacing: 0px;
                    color: #FFFFFF;
                    z-index: 1;
                }
            }
        }
    }

    .childItem {
        display: flex;
        align-items: center;
    }


    li:not(:last-child) {
        margin-right: 48px;
    }
}
</style>