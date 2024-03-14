<template>
  <popup :width="1580" :height="518" :showModel="props.showModel" title="负责人社保福利情况">
    <div class="box">
      <leftNavList :list="data.companyList" height="380px" max-height="380px" @item-click="itemClick" />
      <div class="right_chart">
        <el-table :data="data.tableData" style="width: 100%" class="custom-table" max-height="400" :cell-style="cellStyle"
          :header-cell-style="headerCellStyle">
          <el-table-column prop="name" label="姓名" width="194" align="center" />
          <el-table-column prop="payment" label="缴费基数" width="0" />
          <!-- <el-table-column prop="name" label="个人缴费基数" width="60" />
          <el-table-column prop="name" label="企业缴费基数" width="60" /> -->
          <el-table-column label="基本养老保险" width="" align="center">
            <el-table-column label="个人缴费" width="181" align="center">
              <el-table-column prop="retirement_person_ratio" label="比例%" width="80" align="center" />
              <el-table-column prop="retirement_person_basic" label="金额(元)" width="100" align="center" />
            </el-table-column>
            <el-table-column label="企业缴费" width="161" align="center">
              <el-table-column prop="retirement_enterprise_ratio" label="比例%" width="80" align="center" />
              <el-table-column prop="retirement_enterprise_basic" label="金额(元)" width="80" align="center" />
            </el-table-column>
          </el-table-column>

          <el-table-column label="基本失业保险" align="center">
            <el-table-column label="个人缴费" width="161" align="center">
              <el-table-column prop="unemployment_person_ratio" label="比例%" width="80" align="center" />
              <el-table-column prop="unemployment_person_basic" label="金额(元)" width="80" align="center" />
            </el-table-column>
            <el-table-column label="企业缴费" width="161" align="center">
              <el-table-column prop="unemployment_enterprise_ratio" label="比例%" width="80" align="center" />
              <el-table-column prop="unemployment_enterprise_basic" label="金额(元)" width="80" align="center" />
            </el-table-column>
          </el-table-column>
          <el-table-column label="基本医疗保险" align="center">
            <el-table-column label="个人缴费" width="161" align="center">
              <el-table-column prop="medical_person_ratio" label="比例%" width="80" align="center" />
              <el-table-column prop="medical_person_basic" label="金额(元)" width="80" align="center" />
            </el-table-column>
            <el-table-column label="企业缴费" width="161" align="center">
              <el-table-column prop="medical_enterprise_ratio" label="比例%" width="80" align="center" />
              <el-table-column prop="medical_enterprise_basic" label="金额(元)" width="80" align="center" />
            </el-table-column>
          </el-table-column>
          <el-table-column label="基本工伤保险" align="center">
            <el-table-column label="企业缴费" width="161" align="center">
              <el-table-column prop="industrial_person_ratio" label="比例%" width="80" align="center" />
              <el-table-column prop="industrial_person_basic" label="金额(元)" width="80" align="center" />
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </popup>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import popup from "@components/popup/pop.vue";
import leftNavList from "../../leftNavList/leftNavList.vue";
import {tableData1,} from './dataTale'
// tableData2,tableData3,tableData4
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
  tableData:tableData1,
  // tableData: [
  //   {
  //     date: "2016-05-03",
  //     name: "张1",
  //     payment:"20448",  //缴费基数
  //     state: "California",
  //     city: "Los Angeles",
  //     address: "No. 189, Grove St, Los Angeles",
  //     zip: "CA 90036",
  //   },
  //   {
  //     date: "2016-05-02",
  //     name: "张2",
  //     payment:"20448",  //缴费基数
  //     state: "California",
  //     city: "Los Angeles",
  //     address: "No. 189, Grove St, Los Angeles",
  //     zip: "CA 90036",
  //   },
  //   {
  //     date: "2016-05-03",
  //     name: "张3",
  //     payment:"20448",  //缴费基数
  //     state: "California",
  //     city: "Los Angeles",
  //     address: "No. 189, Grove St, Los Angeles",
  //     zip: "CA 90036",
  //   },
  //   {
  //     date: "2016-05-02",
  //     name: "张4",
  //     payment:"20448",  //缴费基数
  //     state: "California",
  //     city: "Los Angeles",
  //     address: "No. 189, Grove St, Los Angeles",
  //     zip: "CA 90036",
  //   },
  //   {
  //     date: "2016-05-03",
  //     name: "张5",
  //     payment:"20448",  //缴费基数
  //     state: "California",
  //     city: "Los Angeles",
  //     address: "No. 189, Grove St, Los Angeles",
  //     zip: "CA 90036",
  //   },
  //   {
  //     date: "2016-05-02",
  //     name: "张6",
  //     payment:"20448",  //缴费基数
  //     state: "California",
  //     city: "Los Angeles",
  //     address: "No. 189, Grove St, Los Angeles",
  //     zip: "CA 90036",
  //   },
  //   {
  //     date: "2016-05-03",
  //     name: "张7",
  //     payment:"20000",  //缴费基数
  //     state: "California",
  //     city: "Los Angeles",
  //     address: "No. 189, Grove St, Los Angeles",
  //     zip: "CA 90036",
  //   },
  //   {
  //     date: "2016-05-02",
  //     name: "张8",
  //     payment:"20000",  //缴费基数
  //     state: "California",
  //     city: "Los Angeles",
  //     address: "No. 189, Grove St, Los Angeles",
  //     zip: "CA 90036",
  //   },
  // ],
  companyList: [
    {
      // title: '中国平安保险股份有限公司'
      title:'金川集团股份有限公司'
    },
    {
      // title: '中国平安保险股份有限公司'
      title:'酒泉钢铁(集团)有限公司'
    },
    {
      // title: '中国平安保险股份有限公司'
      title:'白银有色集团股份有限公司'
    },
    {
      // title: '中国平安保险股份有限公司'
      title: '甘肃省农垦集团有限责任公司'

    },
    // {
    //   title: '中国平安保险股份有限公司'
    // },
    // {
    //   title: '中国平安保险股份有限公司'
    // },
    // {
    //   title: '中国平安保险股份有限公司'
    // },
    // {
    //   title: '中国平安保险股份有限公司'
    // }
    // ,
    // {
    //   title: '中国平安保险股份有限公司'
    // }
    // ,
    // {
    //   title: '中国平安保险股份有限公司'
    // }
    // ,
    // {
    //   title: '中国平安保险股份有限公司'
    // }
    // ,
    // {
    //   title: '中国平安保险股份有限公司'
    // }
  ],
});
const props = defineProps({
  showModel: {
    type: Boolean,
    default: false,
  },
});
onMounted(()=>{
  data.tableData=[]
  for(let i=0;i<8;i++){
    if(tableData1[i]){
      data.tableData.push(tableData1[i])
    }
  }
})
const itemClick = (index) => {
  // console.log(index);
  data.tableData=[]
  for(let i=(Number(index)+1)*8-8;i<8*(Number(index)+1);i++){
    if(tableData1[i]){
      data.tableData.push(tableData1[i])
    }
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
