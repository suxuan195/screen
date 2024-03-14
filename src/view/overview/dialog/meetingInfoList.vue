<template>
    <div class="meetingInfoList">
        <h2>{{ props.title }}</h2>
        <ul class="metting_list">
            <li v-for="(item, index) in  props.mettingList" :key="index + item.name">
                <h3>{{ item.name }}</h3>
                <div v-if="item.optionList && item.optionList.length"
                    :style="{ 'width': item.descP ? item.descP : '540px' }" class="row">
                    <div v-for="(it, itIndex) in  item.optionList" :key="itIndex + 'optionList'" class="namesList">
                        <span class="name">{{ it.name }}</span>
                        <i class="position">{{ it.position }}</i>{{ item.optionList.length === itIndex + 1 ? '' : '、' }}
                    </div>
                </div>
                <p :class="item.download ? 'active' : ''" :style="{ 'width': item.descP ? item.descP : '540px' }" v-else
                    class="row">{{
                        item.desc }}
                    <i class="icon" v-if="item.download"><img src="@images/overview/下载.png" alt="" srcset=""></i>
                </p>
            </li>
        </ul>
    </div>
</template>
    
<script setup>
import { reactive, defineProps } from 'vue'
const props = defineProps({
    title: {
        type: String,
        default: "会议信息"
    },
    mettingList: {
        type: Array,
        default() {
            return []
        }
    }
})

</script>
    
<style lang="scss" scoped>
.meetingInfoList {
    h2 {
        font-size: 18px;
        font-weight: normal;
        line-height: 18px;
        letter-spacing: 0em;
        background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #90D1FF 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
        margin-bottom: 8px;
    }

    .metting_list {
        display: flex;
        flex-wrap: wrap;

        li {
            display: flex;

            h3 {
                font-size: 14px;
                font-weight: normal;
                display: flex;
                align-items: center;
                letter-spacing: 0px;
                color: #FFFFFF;
                width: 200px;
                opacity: 1;
                padding: 6px 0 6px 24px;
                background: linear-gradient(0deg, rgba(0, 155, 255, 0.00) 0%, rgba(0, 155, 255, 0.30) 100%);
                box-sizing: border-box;
                border: 1px solid;
                border-image: linear-gradient(180deg, rgba(91, 239, 255, 0.00) 0%, rgba(32, 153, 245, 0.80) 100%);
            }

            .row {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                width: 540px;
                background: rgba(32, 153, 245, 0.12);
                font-size: 14px;
                font-weight: normal;
                padding: 6px 0 6px 24px;
                box-sizing: border-box;
                color: #fff;
                position: relative;

                .icon {
                    cursor: pointer;
                    position: absolute;
                    right: 30px;

                    img {
                        width: 20px;
                        height: 20px;
                    }
                }

                .namesList {
                    display: inline-flex;
                    align-items: center;

                    .name {}

                    .position {
                        margin-left: 3px;
                        width: 60px;
                        border-radius: 10px;
                        padding: 3px 7px;
                        background: radial-gradient(68% 67% at 50% 50%, rgba(0, 22, 52, 0.15) 0%, #1766A1 100%);
                        border: 1px solid rgba(32, 153, 245, 1);
                    }
                }


            }


            .active {
                color: #71D2FF;
            }
        }
    }
}
</style>