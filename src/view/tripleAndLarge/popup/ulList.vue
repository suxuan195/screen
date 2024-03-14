<template>
    <ul class="uList">
        <li v-for="(item, index) in  props.ulList" :key="index + 'ul'">
            <span>{{ item.label }}</span>
            <i> {{ item.value }}</i>
        </li>
    </ul>
</template>
    
<script setup>
const props = defineProps({
    ulList: {
        type: Array,
        default() {
            return []
        }
    }
})
</script>
    
<style lang="scss" scoped>
.uList {
    display: flex;
    margin-bottom: 11px;

    li {
        font-size: 18px;
        font-weight: normal;
        line-height: 22px;
        text-align: right;
        letter-spacing: 0em;
        color: #027CD6;
        z-index: 1;
        margin-right: 24px;

        span {
            font-size: 14px;
            font-weight: normal;
            line-height: normal;
            text-align: center;
            letter-spacing: 0em;
            color: #FFFFFF;
            z-index: 0;
        }
    }
}
</style>