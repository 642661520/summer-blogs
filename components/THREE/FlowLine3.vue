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
import { name } from '../../package.json';
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
camera.position.set(0, 40, 40);
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

// 创建纹理加载器
const textureLoader = new THREE.TextureLoader();

// 加载纹理
const texture = textureLoader.load(`/${name}/img/flow3.png`);
texture.colorSpace = THREE.SRGBColorSpace;

texture.repeat.set(0.1, 0.1);
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

const extrudeSettings = {
  steps: 1,
  depth: 10,
  bevelEnabled: true,
  bevelThickness: 0,
  bevelSize: 0,
  bevelOffset: 0,
};

const multiPolygons: THREE.Mesh<
  THREE.ExtrudeGeometry,
  THREE.MeshBasicMaterial[],
  THREE.Object3DEventMap
>[] = [];

fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000.json').then(async (res) => {
  const featureCollection: GeoFeatureCollection = await res.json();
  featureCollection.features.forEach(feature => {
    feature.geometry.coordinates.forEach(coordinates => {
      const shape = new THREE.Shape();
      coordinates[0].forEach((coordinate, index) => {
        const point = projection(coordinate);
        if (!point) return;
        const [x, y] = point;
        if (index === 0) {
          shape.moveTo(x, y);
        } else {
          shape.lineTo(x, y);
        }
      });
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

      const material = new THREE.MeshBasicMaterial({
        color: 0x2abfe0,
        transparent: true,
        opacity: 0.7,
      });
      const mesh = new THREE.Mesh(geometry, [
        material,
        new THREE.MeshBasicMaterial({
          color: 0x2abfe0,
          map: texture,
          transparent: true,
          // opacity: 0.5,
        }),
      ]);
      mesh.rotateY(Math.PI / 2);
      mesh.rotateX(Math.PI / 2);
      mesh.rotateZ(Math.PI / 2);
      mesh.translateZ(-0.49);
      scene.add(mesh);
      multiPolygons.push(mesh);

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
  const { x, y } = texture.offset;
  texture.offset.set(x - 0.1, y - 0.1);
  controls.update();
  // 渲染场景
  renderer.render(scene, camera);
}
animate();

</script>