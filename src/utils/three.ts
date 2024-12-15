import * as THREE from 'three';

export const createScene = (): THREE.Scene => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  return scene;
};

export const createCamera = (width: number, height: number): THREE.PerspectiveCamera => {
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;
  return camera;
};

export const createRenderer = (width: number, height: number): THREE.WebGLRenderer => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  return renderer;
};

export const createLights = (): { pointLight: THREE.PointLight; ambientLight: THREE.AmbientLight } => {
  const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  pointLight.position.set(0, 4, 3);
  
  const ambientLight = new THREE.AmbientLight(0xffffff);
  
  return { pointLight, ambientLight };
};