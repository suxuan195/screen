<template>
    <div class="rightTopBox">
        <img src="@images/enterpriseServiceManagment/金字塔.png" alt="">
        <ul class="list">
            <li v-for="(item, index) in  list" :key="index + '22'">
                <span class="title">{{ item.name }}</span>
                <span class="percentage">{{ item.percentage }}</span>
            </li>
        </ul>
    </div>
    <teleport to="#screen">
        <userEventTableDialog ref="userEventTableDialogRef"></userEventTableDialog>
    </teleport>
</template>
    
<script setup lang='ts'>
import userEventTableDialog from '../dialog/userEventTableDialog.vue'
import { useEvent } from '../hooks';
const { list } = useEvent();
</script>
    
<style lang="scss" scoped>
.rightTopBox {
    width: 432px;
    height: 206px;
    background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    margin-bottom: 54px;

    >img {
        width: 200px;
        height: 206px;
    }

    .list {
        position: relative;
        margin-left: 25px;
        width: 100%;

        li {
            display: flex;
            justify-content: space-between;
            font-size: 16px;
            font-weight: 500;
            border-bottom: 1px dashed #979797;
            padding: 4px 0;

        }

        li:nth-child(1) {
            background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #FF7B86 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            text-shadow: 0px 4px 10px rgba(173, 63, 72, 0.91);
            width: 250px;
            position: absolute;
            left: -80px;


        }

        li:nth-child(2) {
            background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #D98323 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            text-shadow: 0px 4px 10px #AF6E25;
            width: 240px;
            position: absolute;
            top: 30px;
            left: -70px;
        }

        li:nth-child(3) {
            background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #4B9CFE 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            text-shadow: 0px 4px 10px #0062D9;
            width: 230px;
            position: absolute;
            top: 60px;
            left: -60px;
        }

        li:nth-child(4) {
            background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #4BCBFE 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            text-shadow: 0px 4px 10px #018BC2;
            width: 210px;
            position: absolute;
            top: 95px;
            left: -40px;
        }

        li:nth-child(5) {
            background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #8981CA 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            text-shadow: 0px 4px 10px #5C52B2;
            width: 190px;
            position: absolute;
            top: 130px;
            left: -20px;
        }
    }
}
</style>