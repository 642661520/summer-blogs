<template>
  <div ref="dom" :style="style">
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js';
import { onMounted, ref } from 'vue';

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
camera.position.set(3, 3, 3);
// 设置相机朝向
camera.lookAt(0, 0, 0);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);

// 创建材质
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
});

// 创建网格
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

const tween = new TWEEN.Tween(cube.position)
  .to({ x: 1, y: 0, z: 0 }, 2000)

const tween2 = new TWEEN.Tween(cube.position)
  .to({ x: 1, y: 1, z: 0 }, 2000)

const tween3 = new TWEEN.Tween(cube.position)
  .to({ x: 1, y: 1, z: 1 }, 2000)

const tween4 = new TWEEN.Tween(cube.position)
  .to({ x: 1, y: 0, z: 1 }, 2000)

const tween5 = new TWEEN.Tween(cube.position)
  .to({ x: 0, y: 0, z: 1 }, 2000)

const tween6 = new TWEEN.Tween(cube.position)
  .to({ x: 0, y: 0, z: 0 }, 2000)
tween.chain(tween2)
tween2.chain(tween3)
tween3.chain(tween4)
tween4.chain(tween5)
tween5.chain(tween6)
tween6.chain(tween)

tween.start();


onMounted(() => {
  if (dom.value) {
    // 将渲染器的dom元素添加到页面中
    dom.value.appendChild(renderer.domElement);
  }
});

function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
  // 渲染场景
  renderer.render(scene, camera);
}
animate();

</script>