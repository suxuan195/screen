<template>
    <div class="mainTitle ttf">
        <p>{{ props.title }}</p>
        <div class="more" v-if="props.isShow" @click="showModelClick">更多</div>
        <div v-if=isPicker class="picker">
            <el-date-picker v-model="value1" type="month" @change="change" :clearable='false' />
        </div>
    </div>
</template>
    
<script setup>
import { ref } from 'vue'
const props = defineProps({
    title: {
        type: String,
        default: '默认'
    },
    isShow: {
        type: Boolean,
        default: false
    },
    isPicker: {
        type: Boolean,
        default: false
    },
})
const value1 = ref(`${new Date().getFullYear()}-${new Date().getMonth()}`)
const emit = defineEmits(['showModelClick', 'change'])
const showModelClick = () => {
    emit('showModelClick')
}
const change = () => {
    emit('change')
}

</script>
    
<style lang="scss" scoped>
.mainTitle {
    box-sizing: border-box;
    background: url("@images/title.png") 0% 0% / 100% 100% no-repeat;
    width: 420px;
    height: 46px;
    padding-left: 75px;
    display: flex;
    position: relative;

    p {
        white-space: nowrap;
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
        text-shadow: 0px 4px 10px 0px rgba(166, 178, 255, 0.91);
    }



    .more {
        cursor: pointer;
        position: absolute;
        right: 10px;
        font-size: 18px;
        font-weight: normal;
        line-height: 16px;
        letter-spacing: 0px;
        text-align: right;
        color: rgba(214, 239, 255, 0.6);

        &:hover {
            color: rgba(214, 239, 255, 1);
        }
    }

    .back {
        position: absolute;
        right: 10px;
        font-size: 16px;
        color: rgba(214, 239, 255);
        cursor: pointer;

        &:hover {
            color: #fff;
        }
    }

    :deep(.picker) {
        position: absolute;
        right: 10px;

        .el-input {
            width: 100px;
            height: 24px;

            .el-input__wrapper {
                background: linear-gradient(185deg, rgba(0, 46, 98, 0) 43%, rgba(31, 134, 255, 0.5) 81%), radial-gradient(39% 57% at 7% 100%, #24FFED 0%, rgba(21, 105, 193, 0) 100%);
                border-radius: 15px;

                .el-icon {
                    color: #ffffff;
                }

                .el-input__inner {
                    color: #ffffff;
                }
            }
        }
    }
}
</style>