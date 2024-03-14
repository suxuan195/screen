<template>
    <div class="leftTopBox">
        <div class="list">
            <div :class="`item it${index}`" v-for="(item, index) in state.list" :key="index + '11'">
                <h2>{{ item.name }}</h2>
                <p>{{ item.value }}<i>{{ item.unit }}</i></p>
            </div>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import { reactive } from 'vue'
const state = reactive({
    list: [
        {
            name: "党委会成员人数",
            value: "60",
            unit: "人",
        },
        {
            name: "董事会成员人数",
            value: "70",
            unit: "人",
        },
        {
            name: "监事会成员人数",
            value: "80",
            unit: "人",
        },
    ]
})
</script>
<style lang="scss" scoped>
.leftTopBox {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
    width: 432px;
    height: 382px;
    padding: 16px;
    box-sizing: border-box;
    margin-bottom: 40px;

    .list {
        width: 400px;
        height: 350px;
        background: url("@images/enterpriseInfo/bg.png") no-repeat;
        background-position: center center;
        background-size: contain;
        position: relative;

        .item {
            // width: 210px;
            // height: 72px;
            // background: url("@images/overview/line2r.png") 0% 0% / 100% 100% no-repeat;
            position: absolute;
            padding-left: 30px;
            padding-top: 6px;
            box-sizing: border-box;

            h2 {
                font-size: 16px;
                font-weight: normal;
                line-height: 20px;
                letter-spacing: 0px;
                color: #FFFFFF;
                margin-bottom: 4px;
            }

            p {
                font-size: 32px;
                font-weight: normal;
                line-height: 36px;
                letter-spacing: 0px;
                color: #00CCFF;

                i {
                    padding-left: 8px;
                    font-size: 12px;
                    font-weight: normal;
                    line-height: 12px;
                    text-align: center;
                    letter-spacing: 0.2em;
                    background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #90D1FF 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                    text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
                }
            }
        }

        .it0 {
            right: 70px;
            top: 25px;
        }

        .it1 {
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }

        .it2 {
            right: 70px;
            bottom: 28px;
        }
    }
}
</style>