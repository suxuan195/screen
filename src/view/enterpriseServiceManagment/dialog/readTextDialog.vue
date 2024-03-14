<template>
    <Dialog :width="1127" :height="600" :showModel="showModel" :title="title" @close="close">
        <div class="content">
            <el-scrollbar height="510px">
                <p>
                    {{ detailText }}
                </p>
            </el-scrollbar>
        </div>
    </Dialog>
</template>
    
<script setup>
import Dialog from "@components/Dialog/index.vue";
import { ref, inject } from "vue";
const title = inject('title');
import { useRead } from "../hooks";
const { getDetail, detailText } = useRead();
const showModel = ref(false);

const getText = (name) => {
    console.log(name);
    getDetail(name)
    showModel.value = true;
}

const close = () => {
    showModel.value = false;
};
defineExpose({
    showModel,
    getText
});
</script>
    
<style lang="scss" scoped>
.content {
    p {
        color: #fff;
        font-size: 18px;
        line-height: 32px;
        text-indent: 2em;
        letter-spacing: 1px; 
    }

    padding: 20px 30px;

}
</style>
    