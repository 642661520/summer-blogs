<template>
  <div ref="dom" :style="style">
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
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
camera.position.set(0, 0, 5);

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

// 创建射线
const raycaster = new THREE.Raycaster();

// 创建鼠标指针
const pointer = new THREE.Vector2();

// 用于判断鼠标是否在画布内
const inDom = ref(false);

// 储存原始颜色
const originColor = ref<Number>();
// 储存选中的网格
const selectedMesh = ref<THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap>>();


onMounted(() => {
  const div = dom.value;
  if (div) {
    // 将渲染器的dom元素添加到页面中
    div.appendChild(renderer.domElement);

    // 监听鼠标移动事件
    div.addEventListener('pointermove', (event) => {
      // 计算鼠标指针位置
      pointer.x = (event.offsetX / div.clientWidth) * 2 - 1;
      pointer.y = - (event.offsetY / div.clientHeight) * 2 + 1;
    });
    div.addEventListener('mouseenter', () => {
      inDom.value = true;
    });
    div.addEventListener('mouseleave', () => {
      inDom.value = false;
    });
  }
});

function animate() {
  // console.log(pointer);
  requestAnimationFrame(animate);
  // 更新射线
  raycaster.setFromCamera(pointer, camera);
  // 判断射线是否与网格相交
  const intersects = raycaster.intersectObjects(scene.children);

  // 如果有相交的网格并且鼠标在画布内
  if (intersects.length > 0 && inDom.value) {
    // 设置鼠标样式
    dom.value && (dom.value.style.cursor = 'pointer');

    // 获取第一个相交的网格
    const intersect = intersects[0];
    // 如果选中的网格不是当前相交的网格
    if (selectedMesh.value != intersect.object) {
      // 将之前选中的网格恢复原始颜色
      selectedMesh.value?.material.color.set(originColor.value as number);
      if (intersect.object instanceof THREE.Mesh) {
        // 更新选中当前网格
        selectedMesh.value = intersect.object;
        // 保存原始颜色
        originColor.value = intersect.object.material.color.getHex();
        // 设置选中网格颜色
        intersect.object.material.color.set(0xffff00);
      }
    }
  } else {
    // 如果没有相交的网格或者鼠标不在画布内
    // 恢复原始颜色
    selectedMesh.value?.material.color.set(originColor.value as number);
    // 清空选中网格
    selectedMesh.value = undefined;
    // 恢复鼠标样式
    dom.value && (dom.value.style.cursor = 'auto');
  }

  // 旋转立方体
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  // 渲染场景
  renderer.render(scene, camera);

}
animate();

</script>