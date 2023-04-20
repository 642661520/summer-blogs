<script setup lang="ts">
// import lengthUnit from '../components/lengthUnit.vue'
</script>

<template>
  <div class="wrapper">
    <!-- <div class="box1"> width: 50%; height: 50%; </div> -->
    <div class="box"> width: 50%; height: 50%; </div>
  </div>
</template>
<style lang="scss">
.wrapper {
  width: 420px;
  height: 220px;
  background-color: #bfa;
  border: 10px solid salmon;
  margin-bottom: 200px;

  .box {
    // margin-top:50%;
    // margin-left: 50%;
    padding-top: 50%;
    // width: 50%;
    // height: 50%;
    background-color: chocolate;
    transform: translate(50%,50%);
  }
}
</style>