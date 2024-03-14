<template>
    <div class="rightTopChart">
        <div class="item" v-for="(item, index) in state.list" :key="index + '11'">
            <img :src="item.img" alt="" srcset="">
            <h2>{{ item.title }}</h2>
            <p>{{ item.value }}<i>{{ item.unit }}</i></p>
        </div>
    </div>
</template>
    
<script setup>
import { reactive } from 'vue'
import img1 from '@images//enterpriseInfo/img1.png'
import img2 from '@images//enterpriseInfo/img2.png'
import img3 from '@images//enterpriseInfo/img3.png'
import img4 from '@images//enterpriseInfo/img4.png'
const state = reactive({
    list: [{
        title: "国有独资企业数",
        value: '60',
        unit: '家',
        img: img1
    }, {
        title: "国有资本控股企业数",
        value: '60',
        unit: '家',
        img: img2
    }, {
        title: "国有全资企业数",
        value: '60',
        unit: '家',
        img: img3
    }, {
        title: "国有资本参股企业数",
        value: '60',
        unit: '家',
        img: img4
    }]
})
</script>
    
<style lang="scss" scoped>
.rightTopChart {
    width: 432px;
    height: 382px;
    margin-bottom: 40px;
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding: 30px 32px 0 32px;
    box-sizing: border-box;

    .item {
        text-align: center;

        img {
            width: 80px;
            height: 80px;
        }

        h2 {
            margin-top: 7px;
            font-size: 16px;
            font-weight: normal;
            line-height: 16px;
            letter-spacing: 1.44px;
            color: #FFFFFF;
            z-index: 1;
            position: relative;

            &::before {
                position: absolute;
                left: -10px;
                top: 50%;
                transform: translateY(-50%);
                content: '';
                width: 3px;
                height: 8px;
                border-radius: 2px;
                opacity: 1;
                background: linear-gradient(180deg, rgba(0, 204, 255, 0.00) 0%, #00F8FF 100%);
            }
        }

        p {
            margin-top: 6px;
            font-size: 32px;
            font-weight: bold;
            line-height: 36px;
            letter-spacing: 0px;
            color: #00CCFF;

            i {
                font-size: 14px;
                font-weight: normal;
                line-height: 20px;
                letter-spacing: 0px;
                color: #FFFFFF;
                padding-left: 2px;
            }
        }
    }

    .item:nth-child(1),
    .item:nth-child(3) {
        margin-right: 87px;
    }
}
</style>