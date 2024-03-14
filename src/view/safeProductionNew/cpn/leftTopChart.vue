<template>
    <div class="leftTopChart">
        <div class="accumulate-container">
          <div class="accumulate" v-for="(item,index) in accumulateList" :key="index">
            <div class="title">
              <div class="ttf title-font">{{item.title}}</div>
              <selectTab v-if="item.title == '季度累计'" :optionList="optionList"
                         width="80px" @selectChange="selectChange" />
            </div>
            <div class="accumulate-item">
              <div class="item">
                <h2>伤亡人数</h2>
                <div class="line"></div>
                <p style="color: #F6BB3B;">{{item.casualties}}<i>人</i></p>
              </div>
              <div class="item">
                <h2>死亡人数</h2>
                <div class="line"></div>
                <p style="color: #F1606C">{{item.deaths}}<i>人</i></p>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import selectTab from './selectTab.vue';
import {ref, reactive} from 'vue'
    const accumulateList = reactive([
      {
        title:'年度累计',
        casualties:'7',
        deaths:'0'
      },
      {
        title:'季度累计',
        casualties:'1',
        deaths:'0'
      },
      {
        title:'当月累计',
        casualties:'1',
        deaths:'0'
      }
    ])
    const optionList = reactive([
      {
        label: '第一季度',
        value: 0
      },
      {
        label: '第二季度',
        value: 1
      },
      {
        label: '第三季度',
        value: 2
      },
      {
        label: '第四季度',
        value: 3
      }
    ])
    const selectChange = (e) =>{
      console.log(e)
      switch (e){
        case 0:
          accumulateList[1].casualties = '1'
          break;
        case 1:
          accumulateList[1].casualties = '2'
          break;
        case 2:
          accumulateList[1].casualties = '3'
          break;
        case 3:
          accumulateList[1].casualties = '1'
          break;
        default:
          accumulateList[1].casualties = '1'
      }
    }
</script>

<style lang="scss" scoped>
.leftTopChart {
    background: url("@images/propertyManagement/item-bg.png") 0% 0% / 100% 100% no-repeat;
    width: 432px;
    height: 365px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .accumulate-container {
      display: flex;
      flex-direction: column;
        .accumulate{
          display: flex;
          flex-direction: column;
          .accumulate-item{
            display: flex;
            align-items: center;
          }
        }
      .title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title-font{
          font-size: 18px;
          background: linear-gradient(to bottom, #ffffff, #54B8FE);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
        .item {
            background: url("@images/safeProduction/弧形框.png") 0% 0% / 100% 100% no-repeat;
            width: 192px;
            height: 88px;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;

            h2 {
                font-size: 16px;
                font-weight: normal;
                line-height: 16px;
                letter-spacing: 0em;
                color: #ECECEC;
                z-index: 0;
            }

            .line {
                width: 152px;
                height: 2px;
                opacity: 1;
                margin: 8px 0;
                background: linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.51) 26%, #7B90FF 50%, rgba(123, 144, 255, 0.57) 71%, rgba(255, 255, 255, 0.00) 100%);
            }

            p {
                font-size: 22px;
                font-weight: normal;
                line-height: 22px;
                letter-spacing: 0em;

                z-index: 0;

                i {
                    margin-left: 5px;
                    font-size: 12px;
                    font-weight: normal;
                    line-height: 12px;
                    letter-spacing: 0em;
                    color: #ECECEC;
                    z-index: 1;
                }
            }
        }
    }
}
</style>
