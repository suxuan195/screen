<template>
    <div class="applicationSystemNav">
        <p></p>
        <div>
            <span @click="handleClick" >{{props.total}}</span>
            <i>人</i>
        </div>
    </div>
    <applicationTable title="平台注册用户总量" :tableColumns="state.columns" :tableData="state.data" :showModel="showModel" @close-dialog="closeDialog"></applicationTable>
</template>
    
<script setup>
import applicationTable from "../../../components/applicationPlatform/applicationTable.vue"
import { onMounted,defineProps, reactive,ref } from 'vue';
  const props = defineProps({
  
    imageUrl: {
      type: String,
    },
    total:{
        type:String
    }
 
  });
  const state=reactive({
    columns: [
        { label: '用户名', prop: 'name' },
        { label: '所属组织机构', prop: 'age' },
        { label: '注册时间', prop: 'time' },
      ],
      data: [
        { name: 'John Doe', age: 30,time:'' },
        { name: 'Jane Doe', age: 25 ,time:''},
        
      ],
  })

  onMounted(() => {
    // console.log(props.imageUrl,'--imageUrl');
  })
  const showModel = ref(false);
  const handleClick=()=>{
    // console.log(11);
    showModel.value =true ;
}

function closeDialog(){
    showModel.value=false;
 }

</script>
    
<style lang="scss" scoped>
.applicationSystemNav {
    // width: 432px;
    // height: 100px;
    width: 520px;
    height: 150px;
    // height: 120px;
    // background-image: url('@images/IntelligentEnergyManagement/centerBottom_bg.png');
    background-image: url("@images/IntelligentEnergyManagement/top1.png");
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: rgba(40, 44, 79,0.7);
    p {
        width: 72px;
        height: 72px;
        background-image: url('../../../images/enterpriseServiceManagment//活跃用户.png');
        // background-image: url('@images/enterpriseServiceManagment/活跃用户.png"');
        background-size: 100% 100%;
        margin-right: 32px;
        margin-left:30px;
    }


    div {
        span {
            font-size: 40px;
            font-weight: normal;
            line-height: 40px;
            text-align: center;
            letter-spacing: 0.1em;
            background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 52%, #90D1FF 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            text-shadow: 0px 4px 10px rgba(166, 178, 255, 0.91);
            z-index: 0;

        }

        i {
            font-size: 14px;
            font-weight: normal;
            line-height: 14px;
            text-align: right;
            letter-spacing: 0px;
            color: #FFFFFF;
            z-index: 1;
        }
    }
}
</style>