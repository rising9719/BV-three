<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as THREE from 'three';
import { createScene, createRenderer } from '../utils/scene';
import { createCamera } from '../utils/camera';
import { createLights, updateLightPosition, configureSoftShadows} from '../utils/lights';
import { loadModel } from '../utils/modelLoader';

const containerRef = ref<HTMLDivElement>();

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
// let camera: THREE.OrthographicCamera;
let renderer: THREE.WebGLRenderer;
let model: THREE.Group;
let directionalLight: THREE.DirectionalLight;
let specularLight: THREE.DirectionalLight;
let animationFrameId: number;
let shadowMaterial: THREE.MeshStandardMaterial;

const init = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  shadowMaterial = new THREE.MeshStandardMaterial({color: 0xff0000})
  
  scene = createScene();
  camera = createCamera(width, height);
  renderer = createRenderer(width, height);
  containerRef.value?.appendChild(renderer.domElement);
  
  
  const allLights = createLights();
  directionalLight = allLights.directionalLight;
  specularLight = allLights.specularLight;
  let ambientLight = allLights.ambientLight;
  console.log(directionalLight, ambientLight);
  scene.add(directionalLight);
  scene.add(specularLight)
  scene.add(ambientLight);

  // Load the OBJ model
  loadModel(
    '/src/assets/model.obj',
    (loadedModel) => {
      model = loadedModel;
      model.traverse((obj) => {
        if(obj.isMesh){
          obj.castShadow = true;
          obj.receiveShadow = true;
        }
      })
      scene.add(model);
    },
    (progress) => {
      console.log('Loading progress:', (progress.loaded / progress.total) * 100, '%');
    },
    (error) => {
      console.error('Error loading model:', error);
    }
  );

  const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({
    color: 0xf5c6da,
    roughness: 1,
    metalness: 0,
    side: THREE.DoubleSide
    })
  );
  scene.add(plane)
};

const animate = () => {
  animationFrameId = requestAnimationFrame(animate);
  renderer.render(scene, camera);
  renderer.render(scene, camera, {
    material : shadowMaterial, 
    lights : []
  });
};

const handleMouseMove = (event: MouseEvent) => {
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  
  updateLightPosition(renderer, directionalLight, specularLight, mouseX,mouseY );
};

const handleResize = () => {
  if (!camera || !renderer) return;
  
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

onMounted(() => {
  init();
  animate();
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('resize', handleResize);
  renderer.dispose();
});
</script>

<template>
  <div ref="containerRef" class="three-container"></div>
</template>

<style scoped>
.three-container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
</style>