<script lang="ts" setup>
interface Props {
  width?: number
  center?: boolean
  fullscreen?: boolean
  title?: string
  showClose?: boolean
  draggable?: boolean
  iconClose?: Component
  hiddenHeader?: boolean
  dialogClass?: string
}

withDefaults(defineProps<Props>(), {
  center: false,
  fullscreen: false,
  showClose: false,
  title: '',
  width: 400,
  hiddenHeader: false,
  dialogClass: '',
  iconClose: undefined
})

const emits = defineEmits<{ close: [] }>()

const slots: any = useSlots()

const model = defineModel<boolean>()
</script>

<template>
  <el-dialog
    v-model="model"
    :modal-class="'common-dialog' + dialogClass"
    :header-class="`common-dialog__header ${hiddenHeader ? 'is-hidden-header' : ''}`"
    body-class="common-dialog__body"
    :width
    :align-center="center"
    :fullscreen
    :title
    :show-close
    :draggable
    :overflow="false"
    :close-icon="iconClose"
    @close="emits('close')"
  >
    <template v-if="!slots.header" #header>
      <slot name="header" />
    </template>
    <slot name="content" />
    <template v-if="!slots.footer" #footer?>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<style lang="scss">
.common-dialog {
  padding: 16px;

  & > .el-overlay-dialog {
    & > .el-dialog {
      background-color: transparent;
      box-shadow: none;
      padding: 0;
    }
  }
  &__header {
    padding: 0 !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:is(.is-hidden-header) {
      display: none;
    }

    & > .el-dialog__headerbtn {
      position: relative;
      width: auto;
      height: auto;
      aspect-ratio: 1;
    }
  }
}
</style>
