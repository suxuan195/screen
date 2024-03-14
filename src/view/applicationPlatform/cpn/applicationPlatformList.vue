<template>
    <Dialog :width="1127" :height="456" :showModel="state.showModel" :title="title" @close="handleClose">
        <CustomTableWrap :tableData="props.tableData">
            <template v-for="(item, index) in props.options" :key="index">
                <el-table-column show-overflow-tooltip :prop="item.prop" :label="item.label" align="center" />
            </template>
        </CustomTableWrap>
    </Dialog>
</template>
      
  <script setup>
  import Dialog from "@components/Dialog/index.vue";
  import { ref, reactive ,watch} from "vue";
  const emit = defineEmits(['close-dialog'])
  const props = defineProps({
    showModel: {
        type: Boolean
    },
    tableData: {
        type: Array
    },
    options: {
        type: Array
    },
    title: {
        type: String,
        default:'title'
    },
  })
  const state = reactive({
    showModel: false,
  });
  watch(() => props.showModel, async (newValue) => {
    state.showModel = newValue
  })
  const handleClose = () => {
    state.showModel = false;
    emit('close-dialog')
  }
  </script>
      
<style lang="scss" scoped></style>
      