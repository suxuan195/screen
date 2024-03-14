<template>
    <div class="topCartList">
        <ul class="box">
            <li v-for="(item, index) in countList" :key="index + '11'" class="item" @click="showModel(index)">
                <h2 class="ttf">{{ item.name }}</h2>
                <ol>
                    <li v-for="(it, itIndex) in item.fmtTotal" :key="itIndex">
                        <span v-if="it === ','" style="display: none;"></span>
                        <span v-else-if="it === '.'" style="color: #a6b2ff;">{{ it }}</span>
                        <p v-else class="num">
                            <span>{{it }}</span>
                        </p >
                    </li>
                </ol>
                <p class="unit">{{ item.unit }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup >
import { useIndex } from "../hooks/index";
const { countList } = useIndex();
const emit = defineEmits(["showModel"]);
const showModel = (e) => {
    emit("showModel", e);
};
</script>

<style lang="scss" scoped>
.topCartList {
    margin-top: 12px;

    .box {
        display: flex;
        justify-content: space-between;
        margin: 0 49px;

        .item {
            cursor: pointer;
            width: 326px;
            height: 160px;
            background-image: url("@images/IntelligentEnergyManagement/top1.png");
            background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 24px 45px;
            box-sizing: border-box;

            h2 {
                text-align: center;
                font-size: 24px;
                font-weight: normal;
                line-height: 24px;
                letter-spacing: 0.2em;
                background: linear-gradient(180deg,
                        #ffffff 0%,
                        #ffffff 52%,
                        #90d1ff 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                text-shadow: 0px 4px 10px 0px rgba(166, 178, 255, 0.91);
            }

            ol {
                display: flex;
                justify-content: center;
                margin-top: 24px;

                li {
                    display: flex;
                    align-items: flex-end;
                }

                .num {
                    width: 28px;
                    height: 34px;
                    background-image: url("@images/propertyMonitoringManagement/chang.png");
                    background-size: 100% 100%;
                    padding: 5px 6px;
                    margin-right: 2px;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 2px;
                    font-weight: normal;
                    line-height: 40px;
                    letter-spacing: 0.2em;
                    box-sizing: border-box;

                    span {
                        background: linear-gradient(180deg,
                                #ffffff 0%,
                                #ffffff 52%,
                                #90d1ff 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        text-fill-color: transparent;
                        text-shadow: 0px 4px 10px 0px rgba(166, 178, 255, 0.91);
                        font-size: 24px;
                    }
                }
            }

            .unit {
                margin-top: 16px;
                font-size: 14px;
                text-align: center;
                font-weight: normal;
                line-height: 14px;
                text-align: center;
                letter-spacing: 0.2em;
                background: linear-gradient(180deg,
                        #ffffff 0%,
                        #ffffff 52%,
                        #90d1ff 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                text-shadow: 0px 4px 10px 0px rgba(166, 178, 255, 0.91);
            }
        }
    }
}
</style>
