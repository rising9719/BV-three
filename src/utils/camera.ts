import * as THREE from 'three';

export const createCamera = (width: number, height: number): THREE.PerspectiveCamera => {
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  // const aspect = width / height;

  // // Create Orthographic Camera
  // const camera = new THREE.OrthographicCamera(
  //   -aspect*3,  // Left
  //   aspect*3,   // Right
  //   3,        // Top
  //   -3,       // Bottom
  //   0.1,      // Near plane
  //   1000      // Far plane
  // );
  // Position camera to look down at the X-Y plane
  camera.position.set(0, 0, -3.5);
  camera.position.x = -camera.position.x 
  camera.lookAt(0, 0, 0);
  return camera;
};