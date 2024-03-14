<template>
    <div class="leftTopBox">
        <rankingList :list="list"   />
    </div>
</template>
    
<script setup>
import { provide } from 'vue'; 
import rankingList from './rankingList.vue';
import { useList } from '../hooks';
const { list } = useList();
provide('title','企业使用量TOP5')
</script>
    
<style lang="scss" scoped>
.leftTopBox {
    margin-bottom: 50px;
    width: 432px;
    height: 206px;
    background: url("@images/employeeAllocation/item-bg.png") 0% 0% / 100% 100% no-repeat;
    padding: 8px 16px;
    box-sizing: border-box;
}
</style>