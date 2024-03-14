<template>
    <div class="popup" v-show="showModel" @click.self="showModel = false">
        <ul>
            <li v-for="(item, index) in  enterpriseList" :key="index + '111'" @click="select(item, index)">
                <span>{{ item }}</span>
            </li>
        </ul>
    </div>
</template>
    
<script setup>
import { ref } from "vue";
const showModel = ref(false);
const enterpriseList = [
    '金川集团股份有限公司', '酒泉钢铁（集团）有限责任公司',
    '白银有色集团股份有限公司', '甘肃省农垦集团有限责任公司',
    '甘肃省国际物流集团有限公司', '甘肃省民航机场集团有限公司',
    "甘肃省国有资产投资集团有限公司", "甘肃省建设投资（控股）集团有限公司",
    "甘肃省电力投资集团有限责任公司", "甘肃省公路航空旅游投资集团有限公司",
    "甘肃省城乡发展投资集团有限公司", "甘肃能源化工投资集团有限公司",
    "甘肃能化股份有限公司", "甘肃省铁路投资建设集团有限公司",
    "甘肃工程咨询集团股份有限公司", "甘肃文旅产业集团有限公司",
    "甘肃省水务发展集团有限公司", "甘肃新盛国资管理运营有限公司",
    "甘肃省新业资产经营有限责任公司", "白银有色产业集团有限责任公司",
    "甘肃电气装备集团有限公司", "甘肃省公路交通建设集团有限公司",
    "甘肃省长城建设集团有限责任公司", "丝绸之路国际知识产权港有限责任公司",
    "甘肃科技投资集团有限公司", "丝绸之路信息港股份有限公司", "甘肃药业投资集团有限公司",
    "兰州兰石集团有限公司"
]
const emits = defineEmits(['select'])
const select = (item, index) => {
    emits('select', item, index)
}
defineExpose({
    showModel
})
</script>

<style lang="scss" scoped>
.popup {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 1;
    background: linear-gradient(270deg,
            rgba(1, 7, 17, 0.8) 9%,
            rgba(1, 7, 17, 0.8) 89%);
    z-index: 10000;


    ul {
        margin: 0 130px;
        display: flex;
        flex-wrap: wrap;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        li {
            cursor: pointer;
            margin-right: 35px;
            margin-bottom: 26px;
            width: 288.25px;
            height: 81px;
            display: flex;
            align-items: center;
            background: url('@images/tripleAndLarge/主视觉-文字边框.png');
            background-size: 100% 100%;
            text-align: center;
            padding: 8px 24px;
            box-sizing: border-box;

            span {
                font-size: 24px;
                background: linear-gradient(180deg, #FFFFFF 10%, #FFFFFF 48%, #C6EBF4 71%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                line-height: 28px;
                text-fill-color: transparent;
                text-shadow: 0px 4px 12px #5CB2C7;
            }
        }
    }
}
</style>