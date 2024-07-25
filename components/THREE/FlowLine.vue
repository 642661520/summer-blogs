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

const lines: THREE.Line[] = [];

fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000.json').then(async (res) => {
  const featureCollection: GeoFeatureCollection = await res.json();
  featureCollection.features.forEach(feature => {
    feature.geometry.coordinates.forEach(coordinates => {
      const points: THREE.Vector3[] = [];
      const color = new THREE.Color(0x49ffff);
      const colors: number[] = [];
      coordinates[0].forEach((coordinate, index) => {
        const point = projection(coordinate);
        if (!point) return;
        const [x, y] = point;
        points.push(new THREE.Vector3(x, 0.01, y));
        const opacity = 1 - (index / coordinates[0].length);
        colors.push(color.r, color.g, color.b, opacity);
      });

      const bufferGeometry = new THREE.BufferGeometry().setFromPoints(points);
      bufferGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));
      const line = new THREE.Line(
        bufferGeometry,
        new THREE.LineBasicMaterial({
          // color: 0x49ffff,
          linewidth: 20,
          transparent: true,
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


function animate() {
  requestAnimationFrame(animate);

  lines.forEach(line => {
    let colors = [...line.geometry.attributes.color.array];
    for (let i = 0; i < colors.length / 100; i += 4) {
      const [a, b, c, d, ...other] = colors;
      colors = [...other, a, b, c, d];
    }
    line.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));
    line.geometry.attributes.color.needsUpdate = true;
  });
  controls.update();
  // 渲染场景
  renderer.render(scene, camera);
}
animate();

</script>