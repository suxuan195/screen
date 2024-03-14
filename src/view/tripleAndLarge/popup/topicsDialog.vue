<template>
    <div class="topicsDialog">
        <popup :width="1550" :height="689" title="议题" :showModel="props.showModel">
            <div class="contentBox">
                <div class="left" :style="{ 'width': isShow ? '280px' : '0', 'padding': isShow ? '12px' : '0' }">
                    <div class="title">
                        <h2 class="ttf">组织机构</h2>
                        <div class="refresh" @click="refresh">
                            <el-icon :class="{ 'refresh_active': isLoading }">
                                <Refresh />
                            </el-icon>
                            <span> 刷新</span>
                        </div>
                    </div>
                    <div class="input">
                        <el-input v-model="searchVaue" class="w-50 m-2" placeholder="请输入关键字搜索" :suffix-icon="Search" />
                    </div>
                    <div class="explan_retract">
                        <div style="display: flex;">
                            <div class="all_explan" :class="e_active === 1 ? 'active' : ''" @click="explanClick(1)">全展开
                            </div>
                            <div class="retract" :class="e_active === 2 ? 'active' : ''" @click="explanClick(2)">全收起</div>
                        </div>
                        <div class="fullName" @click="isChecked = !isChecked" :class="{ 'isChecked': isChecked }">
                            全称
                            <img :src="isChecked ? active : no_active" alt="" srcset="">
                        </div>
                    </div>
                    <div class="tree">
                        <div class="title"><el-icon>
                                <CaretBottom />
                            </el-icon>
                            <img src="@images/tripleAndLarge/国徽.png" alt="" srcset="">
                            <span>甘肃国资监管信息平台</span>
                        </div>
                        <el-scrollbar height="400px" max-height="400px" noresize>
                            <ul v-show="e_active === 1">
                                <li v-for="(item, index) in  state.enterpriseList" :key="index">
                                    <img src="@images/tripleAndLarge/企业.png" alt="" srcset="">
                                    <span>{{ item.title }}</span>
                                </li>
                            </ul>
                        </el-scrollbar>
                    </div>

                </div>
                <div class="explan" @click="explan" :style="{ 'left': isShow ? '280px' : '0' }">
                    <el-icon v-if="!isShow">
                        <DArrowRight />
                    </el-icon>
                    <el-icon v-else>
                        <DArrowLeft />
                    </el-icon>
                </div>
                <div class="right" :style="{ 'width': isShow ? 'calc(1530px - 330px)' : '100%' }">
                    <search class="marginBox" :formList="state.formList" />
                    <ul class="echarts_box">
                        <li>
                            <h2 class="ttf">涉及法律审核的议题情况</h2>
                        </li>
                        <li>
                            <h2 class="ttf">
                                议题分类占比
                            </h2>
                        </li>
                        <li>
                            <h2 class="ttf">
                                议题表决情况
                            </h2>
                        </li>
                    </ul>
                    <div class="search_box">
                        <div>
                            <h2 class="ttf">议题分类列表</h2>
                        </div>
                        <div class="input">
                            <el-input v-model="enterpriseValue" class="w-50 m-2" placeholder="请输入企业名称"
                                :suffix-icon="Search" />
                        </div>
                    </div>
                    <customTable :tableHeader="state.tableHeader" :tableData="state.tableData" maxHeight="230px" />
                </div>
            </div>
        </popup>
    </div>
</template>
    
<script setup>
import { ref, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import popup from "@components/popup/pop.vue";
import search from "@components/search/search.vue";
import customTable from "@components/customTable/customTable.vue";
import no_active from '@images/tripleAndLarge/非选中.png'
import active from '@images/tripleAndLarge/选中状态.png'
import active1 from '@images/tripleAndLarge/事项总数.png'
import active2 from '@images/tripleAndLarge/重大决策.png'
import active3 from '@images/tripleAndLarge/重要人事任免.png'
import active4 from '@images/tripleAndLarge/重大项目安排.png'
import active5 from '@images/tripleAndLarge/重大项目安排.png'
const props = defineProps({
    showModel: {
        type: Boolean,
        default: false
    }
})
const state = reactive({
    formList: [
        {
            placeholader: '请输入企业名称',
            value: '',
            value1: '',
            label: '议题时间',
            showType: 'date'
        },
        {
            showType: 'state',
            label: '单位类型',
            value: '',
            activeIndex: 0,
            optionList: [
                {
                    label: '省属企业集团'
                },
                {
                    label: "市（州）国资监管机构"
                }
            ]
        },
        {
            showType: 'switch',
            value: '',
            label: '统计数量包含下载',
        }
    ],
    tableHeader: [
        {
            label: '企业名称',
            prop: 'exception'
        },
        {
            label: '会议总数',
            prop: 'meeting_Name',
            className: 'active',
            iconShow: true,
            icon: active1
        },
        {
            label: '议题总数',
            prop: 'mettingTypes',
            className: 'active',
            iconShow: true,
            icon: active1

        },
        {
            label: '重大决策',
            prop: 'topicName',
            className: 'active',
            iconShow: true,
            icon: active2
        },
        {
            label: '重要人事任免',
            prop: 'enterpriseName',
            className: 'active',
            iconShow: true,
            icon: active3
        },
        {
            label: '重大项目安排',
            prop: "exceptionDescription",
            className: 'active',
            iconShow: true,
            icon: active4
        },
        {
            label: '大额度资金运作',
            prop: 'rectificationTime',
            className: 'active',
            iconShow: true,
            icon: active5
        }
    ],
    tableData: [
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '研究集团公司拟注册发研究集团公司拟注册发',
            enterpriseName: '中国海洋石油有限公司',
            exceptionDescription: '决策顺序异常：议题的决策顺序异常：议题的',
            rectificationTime: '-'
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '研究集团公司拟注册发研究集团公司拟注册发',
            enterpriseName: '中国海洋石油有限公司',
            exceptionDescription: '决策顺序异常：议题的决策顺序异常：议题的',
            rectificationTime: '-'
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '研究集团公司拟注册发研究集团公司拟注册发',
            enterpriseName: '中国海洋石油有限公司',
            exceptionDescription: '决策顺序异常：议题的决策顺序异常：议题的',
            rectificationTime: '-'
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '研究集团公司拟注册发研究集团公司拟注册发',
            enterpriseName: '中国海洋石油有限公司',
            exceptionDescription: '决策顺序异常：议题的决策顺序异常：议题的',
            rectificationTime: '-'
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '研究集团公司拟注册发研究集团公司拟注册发',
            enterpriseName: '中国海洋石油有限公司',
            exceptionDescription: '决策顺序异常：议题的决策顺序异常：议题的',
            rectificationTime: '-'
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '研究集团公司拟注册发研究集团公司拟注册发',
            enterpriseName: '中国海洋石油有限公司',
            exceptionDescription: '决策顺序异常：议题的决策顺序异常：议题的',
            rectificationTime: '-'
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '研究集团公司拟注册发研究集团公司拟注册发',
            enterpriseName: '中国海洋石油有限公司',
            exceptionDescription: '决策顺序异常：议题的决策顺序异常：议题的',
            rectificationTime: '-'
        },
        {
            exception: '决策顺序异常',
            meeting_Name: '2023年5月23日党委会',
            mettingTypes: '党委会',
            topicName: '研究集团公司拟注册发研究集团公司拟注册发',
            enterpriseName: '中国海洋石油有限公司',
            exceptionDescription: '决策顺序异常：议题的决策顺序异常：议题的',
            rectificationTime: '-'
        }
    ],
    enterpriseList: [
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
        {
            title: "中国冶金科工股份有限公司"
        },
    ]
})
const searchVaue = ref('')
const enterpriseValue = ref('')
const isShow = ref(true)
const e_active = ref(1)
const isChecked = ref(false)
const isLoading = ref(false)
const explan = () => {
    isShow.value = !isShow.value
}
const explanClick = (val) => {
    e_active.value = val
}
const refresh = () => {
    isLoading.value = true;
    // 执行刷新操作
    setTimeout(() => {
        isLoading.value = false;
    }, 3000);
}
</script>
    
<style lang="scss" scoped>
.topicsDialog {
    display: flex;

    .contentBox {
        margin-top: 20px;
        display: flex;
        position: relative;

        .explan {
            position: absolute;
            z-index: 100;
            top: 100px;
            width: 18px;
            height: 40px;
            cursor: pointer;
            line-height: 40px;
            text-align: center;
            border-radius: 0px 4px 4px 0px;
            box-sizing: border-box;
            border-width: 1px 1px 1px 0px;
            border-style: solid;
            border-color: #4CB3F3;
            // backdrop-filter: blur(10px);
            color: #fff;

        }
    }

    .left {
        height: 581px;
        border-radius: 10px;
        background: linear-gradient(154deg, rgba(129, 206, 255, 0.08) 24%, rgba(129, 206, 255, 0.19) 85%);
        box-sizing: border-box;
        border: 1px solid #4CB3F3;
        position: relative;
        padding: 12px;
        overflow: hidden;

        .title {
            display: flex;
            justify-content: space-between;

            h2 {
                font-size: 18px;
                font-weight: normal;
                line-height: 18px;
                letter-spacing: 0px;
                background: linear-gradient(180deg, #FFFFFF 14%, #54B8FE 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
            }

            .refresh {
                cursor: pointer;
                display: flex;
                align-items: center;

                span {
                    font-size: 14px;
                    font-weight: normal;
                    line-height: 16px;
                    letter-spacing: 0em;
                    color: rgba(96, 188, 255, 0.8);
                }

                .el-icon {
                    color: #60BCFF;
                }

                .refresh_active {
                    transition: transform .5s ease;
                    animation: rotate 1.2s linear infinite;
                }

                @keyframes rotate {
                    to {
                        transform: rotate(360deg);
                    }
                }
            }

        }

        :deep(.input) {
            margin-top: 12px;

            .el-input {

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

                .el-input__inner {
                    color: #fff;
                }

                .el-input__inner::placeholder {
                    color: #fff;
                    font-size: 14px;
                }
            }

            .el-icon {
                color: #fff;
            }
        }


        .explan_retract {
            margin-top: 8px;
            display: flex;
            justify-content: space-between;

            .active {
                font-size: 14px;
                line-height: 16px;
                color: #fff !important;
                background: rgba(0, 147, 255, 0.8);
            }

            .all_explan,
            .retract {
                cursor: pointer;
                font-size: 14px;
                width: 60px;
                text-align: center;
                line-height: 24px;
                padding: 4px 9px;
                height: 24px;
                border-radius: 4px 0px 0px 4px;
                opacity: 1;
                border: 1px solid #1D83CF;
                color: rgba(96, 188, 255, 0.8);

            }

            .fullName {
                cursor: pointer;
                width: 52px;
                height: 24px;
                text-align: center;
                line-height: 24px;
                border-radius: 4px;
                padding: 4px 9px;
                opacity: 1;
                background: linear-gradient(0deg, rgba(0, 155, 255, 0.00) 0%, rgba(0, 155, 255, 0.30) 100%);
                border: 1px solid;
                border-image: linear-gradient(180deg, rgba(28, 133, 212, 0.21) 0%, rgba(32, 153, 245, 0.40) 100%) 1;
                font-size: 14px;
                font-weight: normal;
                letter-spacing: 0em;
                color: #B5B6BF;
                position: relative;

                img {
                    width: 18px;
                    height: 16px;
                    right: 0;
                    bottom: 0;
                    position: absolute;
                }
            }

            .fullName.isChecked {
                color: #fff;
            }
        }

        .tree {
            margin-top: 20px;

            .title {
                display: flex;
                justify-content: flex-start;
                align-items: center;

                .el-icon {
                    color: #fff;
                    font-size: 18px;
                    margin-right: 5px;
                }

                img {
                    width: 18px;
                    height: 18px;
                    margin-right: 5px;
                }

                span {
                    color: #fff;
                    font-size: 14px;
                }
            }

            ul {
                margin-top: 26px;
                margin-left: 38px;

                li {
                    margin-bottom: 26px;
                    display: flex;
                    align-items: center;

                    img {
                        width: 18px;
                        height: 18px;
                        margin-right: 4px;
                    }

                    span {
                        font-size: 14px;
                        font-weight: normal;
                        line-height: 14px;
                        color: #fff;
                    }
                }
            }
        }

    }

    .right {
        margin-left: 34px;

        .echarts_box {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;

            li {
                width: 370px;
                height: 224px;
                background: linear-gradient(116deg, rgba(129, 206, 255, 0.08) 14%, rgba(129, 206, 255, 0.19) 85%);
                box-sizing: border-box;
                border-radius: 10px;
                border: 1px solid #4CB3F3;
                backdrop-filter: blur(10px);

                padding: 12px;
                box-sizing: border-box;

                h2 {
                    font-size: 18px;
                    font-weight: normal;
                    line-height: 18px;
                    letter-spacing: 0px;
                    background: linear-gradient(180deg, #FFFFFF 14%, #54B8FE 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                }
            }

        }

        .search_box {
            margin-top: 23px;
            margin-bottom: 17px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            h2 {
                font-size: 18px;
                font-weight: normal;
                line-height: 18px;
                letter-spacing: 0px;
                background: linear-gradient(180deg, #FFFFFF 14%, #54B8FE 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
            }

            :deep(.input) {

                .el-input {
                    width: 200px;
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

                    .el-input__inner {
                        color: #fff;
                    }

                    .el-input__inner::placeholder {
                        color: #fff;
                        font-size: 14px;
                    }
                }

                .el-icon {
                    color: #fff;
                }
            }
        }
    }
}
</style>