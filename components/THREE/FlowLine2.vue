<template>
  <div ref="dom" :style="style">
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import * as d3 from 'd3';
import { onMounted, ref } from 'vue';
import type { GeoFeatureCollection } from './type';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';

/**
 * 辅助函数 - 截取数组
 * @param {number} start 开始值
 * @param {number} percentage 截取比例
 */
function sliceArray(arr: any[], start: number, percentage: number) {
  const length = arr.length;
  const startIndex = Math.floor(length * start);
  const endIndex = Math.floor(length * (start + percentage));
  if (endIndex > length) {
    return [...arr.slice(startIndex), ...arr.slice(0, endIndex - length)];
  }
  return arr.slice(startIndex, endIndex);
}


// 墨卡托投影转换
const projection = d3.geoMercator().center([104.6, 33.25]).scale(100).translate([0, 0]);

const dom = ref<HTMLElement>();

const width = 600;

const height = 400;

const style = {
  width: `${width}px`,
  height: `${height}px`
}

// 创建场景
const scene = new THREE.Scene();
// 创建相机
const camera = new THREE.PerspectiveCamera(
  75, // 视野角度
  width / height,// 宽高比
  0.1,// 近平面
  1000// 远平面
);

// 设置相机位置
camera.position.set(0, 70, 70);
camera.lookAt(0, 0, 0);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

// 添加控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置阻尼
controls.enableDamping = true;
// 设置阻尼系数
controls.dampingFactor = 0.05;

const lines: Line2[] = [];

const pointsArr: number[][][] = [];

fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000.json').then(async (res) => {
  const featureCollection: GeoFeatureCollection = await res.json();
  featureCollection.features.forEach(feature => {
    feature.geometry.coordinates.forEach(coordinates => {
      const points: number[][] = [];
      const color = new THREE.Color(0x49ffff);
      const colors: number[] = [];
      coordinates[0].forEach((coordinate) => {
        const point = projection(coordinate);
        if (!point) return;
        const [x, y] = point;
        points.push([x, 0.01, y]);
        colors.push(color.r, color.g, color.b);
      });
      if(points.length< 100)  return;
      pointsArr.push(points);
      const lineGeometry = new LineGeometry().setPositions(points.flat());
      lineGeometry.setColors(colors);
      const line = new Line2(
        lineGeometry,
        new LineMaterial({
          color: 0xffffff,
          transparent: true,
          linewidth: 5,
          vertexColors: true,
        })
      );
      lines.push(line);
      scene.add(line);
    });
  });
});



onMounted(() => {
  if (dom.value) {
    // 将渲染器的dom元素添加到页面中
    dom.value.appendChild(renderer.domElement);
  }
});

let time = 0;
function animate() {
  time++;
  const t = time % 100 / 100;

  requestAnimationFrame(animate);
  lines.forEach((line, index) => {
    const points = pointsArr[index];

    // 按比例截取
    const newPoints =sliceArray([...points].reverse(), t, 0.3)
    if(newPoints.length  < 2) return;
    line.geometry.setPositions(newPoints.flat());

  });
  controls.update();
  // 渲染场景
  renderer.render(scene, camera);
}
animate();

</script>