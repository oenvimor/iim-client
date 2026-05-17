<script setup>
import Menu from './component/Menu.vue'
import { useNotifyStore } from '@/store/notify'
import { isElectronMode } from '@/utils/common'

const notifyStore = useNotifyStore()

defineProps({
  index: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <section class="container flex-center">
    <section
      class="el-container im-container"
      :class="{
        'small-screen': !notifyStore.isFullScreen,
      }"
    >
      <aside
        class="el-aside"
        :class="{
          'pd-t15': isElectronMode(),
        }"
      >
        <Menu :index="index" />
      </aside>
      <main class="el-main">
        <slot></slot>
      </main>
    </section>
  </section>
</template>
<style lang="less" scoped>
.container {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #f0f2f6 0%, #f7f8fa 40%, #f4f5f8 100%);

  .im-container {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: transparent;

    .el-aside {
      width: 60px;
      background: rgba(0, 0, 0, 0.01);
      border-right: 1px solid rgba(0, 0, 0, 0.05);
    }

    &.small-screen {
      position: fixed;
      width: 1000px;
      height: 650px;
      border-radius: 12px;
      border: 1px solid rgba(0, 0, 0, 0.06);
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
      transition: all 0.5s;
    }
  }
}

html[data-theme='dark'] {
  .container {
    background: linear-gradient(135deg, #0a0a12 0%, #0d0d18 40%, #0c0c16 100%);

    .im-container {
      background: transparent;

      .el-aside {
        background: rgba(255, 255, 255, 0.02);
        border-right: 1px solid rgba(255, 255, 255, 0.05);
      }
    }
  }

  .small-screen {
    border-color: rgba(255, 255, 255, 0.06);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
  }
}
</style>
