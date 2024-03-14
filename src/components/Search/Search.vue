<template>
    <div class="search">
        <ul class="form">
            <li v-for="(item, index) in  props.formList" :key="index + item.label">
                <div v-if="item.showType == 'input'" class="item">
                    <h2 class="label">{{ item.label }}：</h2>
                    <el-input v-model="item.value" :placeholder="item.placeholader" />
                </div>
                <div v-else-if="item.showType == 'select'" class="item">
                    <h2 class="label">{{ item.label }}：</h2>
                    <div class="selectBox">
                        <p @click="slectChange(item)">{{ !item.value ? item.placeholader : item.value }}<el-icon>
                                <ArrowDown />
                            </el-icon></p>
                        <ul class="explan" v-show="item.explanShow">
                            <li v-for="(it, itIndex) in  item.optionList" :key="itIndex" @click="selectItem(item, it)">{{
                                it.label }}</li>
                        </ul>
                    </div>
                </div>
                <div v-else-if="item.showType == 'switch'" class="item">
                    <h2 class="label">{{ item.label }}：</h2>
                    <el-switch v-model="item.value" inline-prompt active-text="是" inactive-text="否"
                        @change="switchChange($event, item)" />
                </div>
                <div v-else-if="item.showType == 'state'" class="item">
                    <h2 class="label">{{ item.label }}：</h2>
                    <ul class="state_box">
                        <li v-for="(it, itIndex) in  item.optionList" :class="item.activeIndex === itIndex ? 'active' : ''"
                            :key="itIndex" @click="stateChange(item, it, itIndex)">{{
                                it.label }}
                            <img :src="item.activeIndex === itIndex ? active : no_active" alt="" srcset="">
                        </li>
                    </ul>
                </div>
                <div v-else-if="item.showType === 'date'" class="item">
                    <h2 class="label">{{ item.label }}：</h2>
                    <div class="date">
                        <el-date-picker v-model="item.value" type="date" placeholder="请选择时间" />
                        <span class="text">至</span>
                        <el-date-picker v-model="item.value1" type="date" placeholder="请选择时间" />
                    </div>
                </div>
                <div v-else-if="item.showType === 'dateSingle'" class="item">
                    <h2 class="label">{{ item.label }}：</h2>
                    <el-date-picker v-model="item.value" type="date" placeholder="请选择时间" class="dateSingle">
                        <template #append>
                            <i class="el-input__icon el-icon-date"></i>
                        </template>
                    </el-date-picker>
                </div>
            </li>
        </ul>
        <div class="buttons">
            <div class="query" @click="query">查询</div>
            <div class="reset" @click="reset">重置</div>
            <div class="reset" @click="close" v-if="props.isClose">关闭</div>
        </div>
    </div>
</template>
<script setup>
import no_active from '@images/tripleAndLarge/非选中.png'
import active from '@images/tripleAndLarge/选中状态.png'
const props = defineProps({
    formList: {
        type: Array,
        default() {
            return []
        }
    },
    isClose: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['query', 'reset', 'close'])
const query = () => {
    emit('query')
}
const reset = () => {
    emit('reset')
    props.formList.forEach(item => {
        if (item.showType === 'date') {
            item.value = ''
            item.value1 = ''
        } else if (item.showType === 'state') {
            item.activeIndex = 0
        } else if (item.showType === 'switch') {
            item.value = true
        } else {
            item.value = ''
        }
    })
}
const close = () => {
    emit('close')
}
const slectChange = (val) => {
    val.explanShow = true
}
const selectItem = (item, it) => {
    item.value = it.label
    item.explanShow = false
}
const stateChange = (item, it, index) => {
    item.activeIndex = index
    item.value = it.label
}
const switchChange = (event, val) => {
    val.value = event
}
</script>
    
<style lang="scss" scoped>
.search {
    display: flex;

    :deep(.form) {
        display: flex;

        li {

            display: flex;
            align-items: center;

            .item {
                display: flex;
                align-items: center;

                .el-switch {
                    .el-switch__core {
                        width: 40px;
                        height: 16px;
                        line-height: 16px;
                        border-radius: 15px;
                        background: radial-gradient(68% 67% at 50% 50%, rgba(0, 22, 52, 0.15) 0%, #1766A1 100%);

                        .el-switch__action {
                            width: 12px;
                            height: 12px;
                            margin-right: 5px;
                        }
                    }
                }

                .el-switch.is-checked {
                    .is-text {
                        color: #0093FF;
                    }

                    .el-switch__action {
                        background: #0093FF;
                    }
                }

                .state_box {
                    display: flex;

                    li {
                        padding: 6px 14px;
                        box-sizing: border-box;
                        opacity: 1;
                        cursor: pointer;
                        border-top: 1px solid #11518C;
                        border-bottom: 1px solid #1D80CF;
                        border-left: 1px solid;
                        border-right: 1px solid;
                        border-image: linear-gradient(180deg, rgba(0, 155, 255, 0.1) 40%, rgba(0, 155, 255, 0.8) 100%) 2 2 2 2;
                        background: linear-gradient(to bottom, rgba(12, 66, 111) 30%, rgba(15, 38, 70, 1) 100%);
                        border-color: #0c223a;
                        font-size: 12px;
                        font-weight: normal;
                        line-height: 16px;
                        letter-spacing: 0em;
                        color: #FFFFFF;
                        position: relative;
                        white-space: nowrap;
                        border-radius: 4px;

                        img {
                            position: absolute;
                            bottom: 0;
                            right: 0;
                            width: 18px;
                            height: 16px;
                            border-radius: 4px;
                        }
                    }

                    .active {
                        background: radial-gradient(68% 67% at 50% 50%, rgba(0, 22, 52, 0.15) 0%, #1766A1 100%);
                    }
                }

                .date {
                    .text {
                        padding: 0 5px;
                        font-size: 14px;
                        font-weight: normal;
                        line-height: normal;
                        text-align: right;
                        letter-spacing: 0em;
                        background: linear-gradient(180deg, #FFFFFF 28%, #C4E6FF 75%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        text-fill-color: transparent;
                    }

                    .el-input {
                        width: 170px;
                    }
                }

                .dateSingle {
                    width: 170px;
                }

                .dateSingle .el-input__icon {
                    /* 调整图标位置 */
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 10px;
                }
            }

            .el-select {
                .el-input {
                    width: 180px;
                }
            }

            .label {
                min-width: 70px;
                font-size: 14px;
                font-weight: normal;
                line-height: normal;
                text-align: right;
                letter-spacing: 0em;
                background: linear-gradient(178deg, #FFFFFF 31%, #C4E6FF 72%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
            }

            .selectBox {
                position: relative;

                .el-icon {
                    position: absolute;
                    right: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #35A8FF;
                }

                p {
                    cursor: pointer;
                    padding: 0 12px;
                    width: 180px;
                    height: 32px;
                    box-sizing: border-box;
                    border-radius: 4px;
                    border-top: 1px solid #11518C;
                    border-bottom: 1px solid #1D80CF;
                    border-left: 1px solid;
                    border-right: 1px solid;
                    border-image: linear-gradient(180deg, rgba(0, 155, 255, 0.1) 40%, rgba(0, 155, 255, 0.8) 100%) 2 2 2 2;
                    background: linear-gradient(to bottom, rgba(12, 66, 111) 30%, rgba(15, 38, 70, 1) 100%);
                    border-color: #0c223a;
                    //     background: linear-gradient(0deg, rgba(0, 155, 255, 0.00) 0%, rgba(0, 155, 255, 0.30) 100%);
                    // box-sizing: border-box;
                    // border-image: linear-gradient(180deg, rgba(91, 239, 255, 0.00) 0%, rgba(32, 153, 245, 0.80) 100%);
                    font-size: 14px;
                    font-weight: normal;
                    line-height: 32px;
                    letter-spacing: 0em;
                    color: #B5B6BF;
                }

                .explan {
                    position: absolute;
                    z-index: 100;
                    width: 180px;
                    height: 130px;
                    max-height: 130px;
                    overflow: auto;
                    background: rgb(18, 50, 86);

                    li {
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: normal;
                        line-height: 14px;
                        letter-spacing: 0px;
                        line-height: 22px;
                        padding: 5px 8px;
                        color: #B5B6BF;
                    }
                }
            }

            .el-input {
                width: 280px;
                height: 32px;

                .el-input__wrapper {
                    width: 100%;
                    height: 100%;
                    border-top: 1px solid #11518C;
                    border-bottom: 1px solid #1D80CF;
                    border-left: 1px solid;
                    border-right: 1px solid;
                    border-image: linear-gradient(180deg, rgba(0, 155, 255, 0.1) 40%, rgba(0, 155, 255, 0.8) 100%) 2 2 2 2;
                    background: linear-gradient(to bottom, rgba(12, 66, 111) 30%, rgba(15, 38, 70, 1) 100%);
                    padding: 2px 11px;
                    box-sizing: border-box;
                    box-shadow: none;
                }

                .el-input__inner::placeholder {
                    font-size: 14px;
                    color: #B5B6BF;
                }

                .el-input__inner:focus {
                    border-color: transparent;
                    /* 将边框颜色设置为透明 */
                    box-shadow: none;
                    /* 移除阴影效果 */
                    /* 移除阴影效果 */
                }

                .el-input__inner {
                    color: #FFFFFF;
                }
            }
        }

        li:not(:last-child) {
            margin-right: 24px;
        }
    }

    .buttons {
        display: flex;
        margin-left: 32px;

        div {
            cursor: pointer;
            width: 60px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 4px;
            font-size: 14px;
            box-sizing: border-box;
            color: rgba(96, 188, 255, 0.8);
            border: 1px solid #1D83CF;

            &:hover {
                background: rgba(0, 147, 255, 0.8);
                color: #FFFFFF;
            }
        }

        .reset {
            margin-left: 12px;
            color: rgba(96, 188, 255, 0.8);
            border: 1px solid #1D83CF;
        }
    }
}
</style>