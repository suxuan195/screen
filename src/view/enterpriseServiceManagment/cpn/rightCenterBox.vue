<template>
    <div class="rightCenterBox">
        <ul class="list">
            <li v-for="(item, index) in state.list" :key="index + '11'" :style="{
                width: `${item.width}`, height: `${item.height}`,
                backgroundImage: `url(${item.backgroundImage})`,
                left: `${item.left}`, top: `${item.top}`
            }">
                <el-tooltip :content="list[index]">
                    <span :style="item.style">{{
                        list[index]
                    }}
                    </span>
                </el-tooltip>
            </li>
        </ul>
    </div>
</template>
    
<script setup >
import { reactive } from 'vue';
import smallCloud from '@images/enterpriseServiceManagment/词云小.png'
import bigCloud from '@images/enterpriseServiceManagment/词云大.png'
import transparentCloud from '@images/enterpriseServiceManagment/词云小半透明.png'
import { useKeywords } from '../hooks';
const { list } = useKeywords();
const smaillWH = {
    width: '122.18px',
    height: ' 28px',
}
const bigWH = {
    width: '174.55px',
    height: '34.91px',
}
const bgColor = {
    backgroundClip: 'text',
    textFillColor: 'transparent',
    WebkitBackgroundClip: 'text',
    webkittextfillcolor: 'transparent'
}
const fontSize12 = {
    fontSize: '12px'
}
const fontSize20 = {
    fontSize: '20px'
}
const state = reactive({
    list: [
        {
            ...smaillWH,
            title: '你干嘛',
            backgroundImage: smallCloud,
            top: '20px',
            left: '45px',
            style: {
                background: 'linear-gradient(180deg, #FFFFFF 10%, #FFFFFF 48%, #7DAFFF 71%)',
                textShadow: '0px 4px 12px #7DAFFF',
                ...fontSize12,
                ...bgColor
            }
        },
        {
            title: '这是关键词内容',
            backgroundImage: smallCloud,
            ...smaillWH,
            top: '10px',
            left: '279.49px',
            style: {
                background: 'linear-gradient(180deg, #FFFFFF 10%, #FFFFFF 48%, #C6EBF4 71%)',
                textShadow: '0px 4px 12px #C6EBF4',
                ...fontSize12,
                ...bgColor,
            }
        },
        {
            title: '这是关键词内容',
            backgroundImage: transparentCloud,
            ...smaillWH,
            top: '58px',
            left: '15px',
            style: {
                background: 'linear-gradient(180deg, #FFFFFF 10%, #FFFFFF 48%, #59A9C5 71%)',
                textShadow: '0px 4px 12px #59A9C5',
                ...fontSize12,
                ...bgColor,
            }
        },
        {
            title: '这是关键词内容',
            backgroundImage: transparentCloud,
            ...smaillWH,
            top: '40px',
            left: '172.49px',
            style: {
                background: 'linear-gradient(180deg, #FFFFFF 10%, #FFFFFF 48%, #FFBCC2 71%)',
                textShadow: '0px 4px 12px #FFBCC2',
                ...fontSize12,
                ...bgColor
            }
        },
        {
            title: '哎吆，你干嘛',
            backgroundImage: bigCloud,
            ...bigWH,
            left: '157.27px',
            top: '71.09px',
            style: {
                background: 'linear-gradient(180deg, #FFFFFF 10%, #FFFFFF 48%, #EDDBB4 71%)',
                textShadow: '0px 4px 12px rgba(194, 164, 98, 0.91)',
                ...fontSize20,
                ...bgColor
            }
        },
        {
            title: '哎吆，你干嘛',
            backgroundImage: bigCloud,
            ...bigWH,
            left: '84.27px',
            top: '113.09px',
            style: {
                background: 'linear-gradient(180deg, #FFFFFF 10%, #FFFFFF 48%, #C6EBF4 71%)',
                textShadow: '0px 4px 12px #5CB2C7',
                ...fontSize20,
                ...bgColor
            }
        },
        {
            title: '这是关键词内容',
            backgroundImage: smallCloud,
            ...smaillWH,
            left: '293.49px',
            top: '120px',
            style: {
                background: 'linear-gradient(180deg, #FFFFFF 10%, #FFFFFF 48%, #59A9C5 71%)',
                textShadow: '0px 4px 12px #59A9C5',
                ...fontSize12,
                ...bgColor
            }
        },
        {
            title: '这是关键词内容',
            backgroundImage: smallCloud,
            ...smaillWH,
            left: '16px',
            top: '164px',
            style: {
                background: 'linear-gradient(180deg, #FFFFFF 10%, #FFFFFF 48%, #FFBCC2 71%)',
                textShadow: '0px 4px 12px #FFBCC2',
                ...fontSize12,
                ...bgColor
            }
        },
        {
            title: '这是关键词内容',
            backgroundImage: transparentCloud,
            ...smaillWH,
            left: '240.49px',
            top: '162px',
            style: {
                background: 'linear-gradient(180deg, #FFFFFF 10%, #FFFFFF 48%, #7DAFFF 71%)',
                textShadow: '0px 4px 12px #7DAFFF',
                ...fontSize12,
                ...bgColor
            }
        },
    ]
})




</script>
    
<style lang="scss" scoped>
.rightCenterBox {
    width: 432px;
    height: 206px;
    background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
    margin-bottom: 54px;

    .list {
        position: relative;

        li {
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;

            span {
                padding: 0 12px;
                text-align: center;
                white-space: nowrap;
                /* 文本不换行 */
                overflow: hidden;
                /* 超出部分隐藏 */
                text-overflow: ellipsis;
                /* 超出部分显示省略号 */
            }
        }
    }
}
</style>