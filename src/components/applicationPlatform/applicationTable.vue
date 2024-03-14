
<template>
  <Dialog :width="1127" :height="456" :showModel="state.showModel" :title="title" @close="handleClose">
    <CustomTableWrap :tableData="props.tableData">
      <template v-for="(item, index) in props.tableColumns" :key="index">
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
  tableColumns: {
    type: Array,
    required: true,
  },
  tableData: {
    type: Array,
    required: true,
  },
  showModel: {
    type: Boolean
  },
  title: {
        type: String,
        default:'title'
    },
})
const showModel = ref(false);
const state = reactive({
  showModel: false,

});
watch(() => props.showModel, async (newValue) => {
  state.showModel = newValue
})
const handleClose = () => {
  // console.log(22);
  state.showModel = false;
  emit('close-dialog')
}
</script>
    
<style lang="scss" scoped></style>
    