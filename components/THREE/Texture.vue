<template>
  <div ref="dom" :style="style">
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { onMounted, ref } from 'vue';
import { TGALoader } from 'three/addons/loaders/TGALoader.js';

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
camera.position.set(0, 0, 5);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

// 创建纹理加载器
const textureLoader = new THREE.TextureLoader();
const tGALoader = new TGALoader();




const texture1 = tGALoader.load('https://threejs.org/examples/textures/crate_grey8.tga');
texture1.colorSpace = THREE.SRGBColorSpace;

const texture2 = tGALoader.load('https://threejs.org/examples/textures/crate_color8.tga');
texture2.colorSpace = THREE.SRGBColorSpace;

// 加载纹理
const texture = textureLoader.load('https://threejs.org/examples/textures/crate.gif');
texture.colorSpace = THREE.SRGBColorSpace;

// 创建材质
const material = new THREE.MeshBasicMaterial({
  map: texture1,
});
// 创建几何体
const geometry = new THREE.BoxGeometry(2, 2, 2);
// 创建网格
const cube = new THREE.Mesh(geometry, material);
cube.position.set(-3, 0, 0);
scene.add(cube);

const geometry2 = new THREE.BoxGeometry(2, 2, 2);
const material2 = new THREE.MeshBasicMaterial({
  map: texture2,
});
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.set(3, 0, 0);
scene.add(cube2);




onMounted(() => {
  if (dom.value) {
    // 将渲染器的dom元素添加到页面中
    dom.value.appendChild(renderer.domElement);
  }
});

function animate() {
  requestAnimationFrame(animate);
  // 旋转立方体
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  // 渲染场景
  renderer.render(scene, camera);
}
animate();

</script>