<script setup lang="ts">
import { NInputNumber, NSpace } from 'naive-ui';
import { ref, reactive } from 'vue';

const parentStyle = reactive({
  FlexDirection: 'row',
  FlexWrap: 'nowrap',
})
const count = ref(3);
const FlexDirectionOptions = [
  {
    label: 'row',
    value: 'row'
  },
  {
    label: 'column',
    value: 'column'
  },
  {
    label: 'row-reverse',
    value: 'row-reverse'
  },
  {
    label: 'column-reverse',
    value: 'column-reverse'
  }
]
</script>
<template>
  <NSpace>
    <NSpace>
      <div class="my-label">子元素个数:</div>
      <NInputNumber v-model:value="count" :min="1" />
    </NSpace>
    <NSpace>
      flex-direction:
      <MyRadioGroup v-model:value="parentStyle.FlexDirection" :options="FlexDirectionOptions" />
    </NSpace>
    <NSpace>
      flex-wrap:
      <MyRadioGroup v-model:value="parentStyle.FlexWrap"
        :options="[{ label: 'nowrap', value: 'nowrap' }, { label: 'wrap', value: 'wrap' }]" />
    </NSpace>
  </NSpace>


  <div class="flex-box" :style="parentStyle">
    <div v-for="item in count">{{ item }}</div>
  </div>
</template>
<style lang="scss">
.flex-box {
  display: flex;
  border: 1px solid black;
  border-radius: 5px;
  margin: 10px;
  min-width: 300px;

  >div {
    width: 100px;
    height: 100px;
    background-color: black;
    // padding: 10px;
    box-sizing: border-box;
    border: 10px solid white;
    color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 80px;
    font-size: 24px;
  }
}
</style>