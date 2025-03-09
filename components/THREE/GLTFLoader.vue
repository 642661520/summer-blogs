<template>
  <div ref="dom" :style="style">
  </div>
</template>

<script setup lang="ts">
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/examples/jsm/Addons.js';
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
  camera.position.set(0, 7, 7);
  camera.lookAt(0, 0, 0);

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);

  const gltfLoader = new GLTFLoader();
  gltfLoader.load('https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb', (gltf) => {
    console.log(gltf);
    scene.add(gltf.scene);
  });

  // lights

  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
  hemisphereLight.position.set(0, 20, 0);
  scene.add(hemisphereLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 3);
  dirLight.position.set(0, 20, 10);
  scene.add(dirLight);


  onMounted(() => {
    if (dom.value) {
      // 将渲染器的dom元素添加到页面中
      dom.value.appendChild(renderer.domElement);
    }
  });

  function animate() {
    requestAnimationFrame(animate);

    // 渲染场景
    renderer.render(scene, camera);
  }
  animate();

</script>