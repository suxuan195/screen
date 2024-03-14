<template>
    <ul class="serverList">
        <li v-for="(item, index) in  props.navList" :key="index" @click="tabClick()">
            <span>{{ item.name }}</span>
            <div class="value">
                <p>{{ item.value }}</p>
                <span>{{ item.unit }}</span>
            </div>
        </li>
    </ul>
</template>
    
<script setup>
const props = defineProps({
    navList: {
        type: Array,
        default: () => {
            return []
        }
    },
    typeText: {
        type: String,
        default: ''
    }
})
const emits = defineEmits(['tabClick'])
const tabClick = () => {
    emits('tabClick', props.typeText)
}
</script>
    
<style lang="scss" scoped>
.serverList {
    width: 432px;
    height: 80px;
    background-image: url('@images/IntelligentEnergyManagement/centerBottom_bg.png');
    background-size: 100% 100%;
    display: flex;
    justify-content: space-around;
    padding: 8px 16px 8px 16px;
    box-sizing: border-box;

    li {
        cursor: pointer;
        flex: 1;
        box-sizing: border-box;
        padding-left: 14px;
        text-align: left;
        padding-top: 3px;

        >span {
            font-size: 14px;
            font-weight: normal;
            line-height: 14px;
            letter-spacing: 0px;
            color: #FFFFFF;
        }

        .value {
            padding-top: 8px;
            font-size: 24px;
            font-weight: normal;
            line-height: 24px;
            letter-spacing: 0px;
            color: #00CCFF;
            display: flex;
            align-items: flex-end;

            >span {
                padding-left: 4px;
                font-size: 14px;
                font-weight: normal;
                line-height: 14px;
                text-align: right;
                letter-spacing: 0px;
                color: #FFFFFF;
            }

        }
    }

    li:not(:last-child) {
        position: relative;

        &::after {
            width: 4px;
            height: 100%;
            content: "";
            position: absolute;
            right: 0;
            bottom: 0;
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.00) 0%, rgba(129, 202, 248) 40%, rgba(0, 0, 0, 0.00) 99%);
        }

        // border-right: 2px solid linear-gradient(to right, rgba(54, 177, 255, 0.00) 0%, rgba(54, 177, 255, 0.60) 50%, rgba(0, 0, 0, 0.00) 99%);
        // border-image: linear-gradient(90deg, rgba(54, 177, 255, 0.00) 0%, rgba(54, 177, 255, 0.60) 50%, rgba(0, 0, 0, 0.00) 99%);
    }
}
</style>