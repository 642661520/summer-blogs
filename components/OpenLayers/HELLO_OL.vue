<script setup lang="ts">
import { onMounted, ref } from "vue";
import "ol/ol.css";
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
const map_ref = ref();
const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM({}),
    }),
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
    minZoom: 2,
  }),
});

onMounted(() => {
  // 设置Target
  map.setTarget(map_ref.value);
});
</script>

<template>
  <div ref="map_ref" style="width:100%;height:500px"></div>
</template>
