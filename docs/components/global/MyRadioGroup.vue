<script setup lang="ts">
import { NButton, NButtonGroup } from 'naive-ui';
import { SelectMixedOption } from 'naive-ui/es/select/src/interface';
import { Type } from 'naive-ui/es/button/src/interface';
withDefaults(defineProps<{
  options: SelectMixedOption[],
  value: string | null | number,
  selectType?: Type,
  unselectType?: Type,
}>(), {
  selectType: 'primary',
  unselectType: 'default'
});
defineEmits<{
  (e: 'update:value', value: string | null | number): void
}>()
</script>
<template>
  <NButtonGroup>
    <NButton :type="value === item.value ? selectType : unselectType" v-for="item,index in options" :key="index"
      @click="$emit('update:value', item.value)">{{ item.label }}</NButton>
  </NButtonGroup>
</template>