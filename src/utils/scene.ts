import * as THREE from 'three';


export const createScene = (): THREE.Scene => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffb6f1); // Light gray background
  return scene;
};

export const createRenderer = (width: number, height: number): THREE.WebGLRenderer => {
  const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true 
  });
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  return renderer;
};