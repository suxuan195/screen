<template>
    <popup :width="1000" :height="518" :showModel="props.showModel" title="负责人收入组成">
      <div class="box">
        <leftNavList :list="data.companyList" height="380px" max-height="380px" @item-click="itemClick" />
        <div class="right_chart">
          <el-table :data="data.tableData" style="width: 100%" class="custom-table" max-height="400" :cell-style="cellStyle"
            :header-cell-style="headerCellStyle">
            <el-table-column prop="name" label="姓名" width="194" align="center" />
            <el-table-column prop="work" label="基本年薪" width="100" align="center" />
            <el-table-column prop="money" label="绩效薪资" width="200"   align="center" />
            <el-table-column prop="incentive" label="任期激励收入" width="200"   align="center" />
          </el-table>
        </div>
      </div>
    </popup>
  </template>
  
  <script setup>
  import { reactive } from "vue";
  import popup from "@components/popup/pop.vue";
  // import leftNavList from "../../leftNavList/leftNavList.vue";
  import {tableData6,tableData7} from './cicle'
  const cellStyle = {
    background: 'rgba(18,50,86)',
    color: 'white',
    border: '2px solid #193362',
  }
  const headerCellStyle = {
    borderTop: '2px solid #11518C',
    borderBottom: '2px solid #1D80CF', borderLeft: '2px solid',
    borderRight: '2px solid',
    borderImage: 'linear-gradient(180deg,  rgba(0, 155, 255, 0.1) 40%, rgba(0, 155, 255, 0.8) 100%) 2 2 2 2' /* 先设置透明的左边框 */
  }
  
  const data = reactive({
    tableData:tableData6,
    companyList: [
      {
        title:'金川集团股份有限公司'
      },
      {
        title:'酒泉钢铁（集团）有限责任公司'
      },
    ],
  
  });
  const props = defineProps({
    showModel: {
      type: Boolean,
      default: false,
    },
  });
  
  const itemClick = (index) => {
    // console.log(index);
    if(index==0){
      data.tableData= tableData6
    }
    if(index==1){
      data.tableData= tableData7
    }
   
  }
  </script>
  
  <style lang="scss" scoped>
  /* 修改滚动条的样式 */
  .left_scroll::-webkit-scrollbar {
    width: 2px;
    /* 设置滚动条的宽度 */
    background: linear-gradient(108deg,
        rgba(43, 139, 200, 0.18) 12%,
        rgba(50, 96, 126, 0.3) 85%);
    backdrop-filter: blur(40px);
    border-radius: 10px;
  }
  
  /* 修改滚动条滑块的样式 */
  .left_scroll::-webkit-scrollbar-thumb {
    width: 2px;
    height: 50px;
    border-radius: 10px;
    opacity: 1;
    background: #d8d8d8;
  }
  
  /* 修改滚动条鼠标悬停时滑块的样式 */
  .left_scroll::-webkit-scrollbar-thumb:hover {
    background-color: #555;
    /* 设置鼠标悬停时滑块的背景色 */
  }
  
  .box {
    padding-top: 36px;
    display: flex;
  
    .el-scrollbar {
      border-radius: 10px;
      border: 1px solid #4cb3f3;
      width: 200px;
      box-sizing: border-box;
      padding: 10px 0;
  
      li {
        display: flex;
        align-items: center;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        color: #9e9e9e;
        width: 100%;
        padding: 0 12px;
        box-sizing: border-box;
        position: relative;
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: inline-block;
  
        &:hover {
          background: #008cff;
          color: #ffffff;
  
          &::after {
            position: absolute;
            content: "";
            width: 3px;
            height: 32px;
            z-index: 100;
            left: 0px;
            background: linear-gradient(180deg, #ffffff 0%, #008cff 100%);
          }
        }
      }
    }
  
    :deep(.right_chart) {
      margin-left: 24px;
  
      .el-table--border .el-table__inner-wrapper::after {
        background-color: rgba(49, 78, 102);
      }
  
      .el-table__border-left-patch {
        background-color: rgba(49, 78, 102);
      }
  
      .el-table--border::after {
        background-color: rgba(49, 78, 102);
      }
  
      .custom-table {
  
        &::before,
        &::after {
          display: none !important;
        }
  
        .el-table__inner-wrapper {
  
          &::before,
          &::after {
            display: none !important;
          }
  
          .el-table__border-left-patch {
            display: none;
          }
        }
  
        .el-table__header {
          th {
            background: #103252;
            border-color: #0c223a;
            color: #ffffff;
            font-family: PingFang SC;
            font-size: 14px;
            font-weight: normal;
            line-height: normal;
            text-align: center;
            letter-spacing: 0em;
          }
        }
      }
    }
  }
  </style>
  