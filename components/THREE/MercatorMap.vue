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

  fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json').then(async (res) => {
    const featureCollection: GeoFeatureCollection = await res.json();
    featureCollection.features.forEach(feature => {
      feature.geometry.coordinates.forEach(coordinates => {
        const shape = new THREE.Shape();
        const points: THREE.Vector3[] = [];
        coordinates[0].forEach((coordinate, index) => {
          const point = projection(coordinate);
          if (!point) return;
          const [x, y] = point;
          points.push(new THREE.Vector3(x, 0.01, y));
          if (index === 0) {
            shape.moveTo(x, y);
          } else {
            shape.lineTo(x, y);
          }
        });
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(points),
          new THREE.LineBasicMaterial({
            color: 0x285987,
            linewidth: 20,
          })
        );
        scene.add(line);
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({ color: 0x203f63, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotateY(Math.PI / 2);
        mesh.rotateX(Math.PI / 2);
        mesh.rotateZ(Math.PI / 2);
        scene.add(mesh);
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
    controls.update();
    // 渲染场景
    renderer.render(scene, camera);
  }
  animate();

</script>