<script setup lang="ts">
import { NButton } from 'naive-ui'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const dom = ref()
const isFull = ref(false)
const isWebFull = ref(false)
const handleClickFull = async () => {
  if (document.fullscreenElement === dom.value) {
    document.exitFullscreen()
  } else {
    dom.value.requestFullscreen()
  }
}
const handleClickWebFull = () => {
  dom.value.classList.toggle('web-full-screen')
  isWebFull.value = dom.value.classList.contains('web-full-screen')
}
const fullscreenchange = () => {
  isFull.value = document.fullscreenElement === dom.value
}
onMounted(() => {
  dom.value.addEventListener("fullscreenchange", fullscreenchange)
})
onBeforeUnmount(() => {
  dom.value.removeEventListener("fullscreenchange", fullscreenchange)
})
</script>
<template>
  <Teleport :disabled="!isWebFull"  to="html">
    <div ref="dom" :style="{ background: isFull ? '#fff' : '' }">
    <slot></slot>
    <NButton @click="handleClickWebFull">{{ isWebFull ? '退出最大化' : '最大化' }}</NButton>
    <NButton @click="handleClickFull">{{ isFull ? '退出全屏' : '全屏' }}</NButton>
  </div>
</Teleport>

</template>
<style lang="scss">
.web-full-screen {
  position: fixed;
  border-radius: 0;
  z-index: 100000;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
}
</style>