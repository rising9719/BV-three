import * as THREE from 'three';

export interface SceneLights {
  // pointLight: THREE.PointLight;
  ambientLight: THREE.AmbientLight;
  directionalLight: THREE.DirectionalLight;
  specularLight: THREE.DirectionalLight;
}

export const createLights = (): SceneLights => {
  // Create point light above the scene
  // const pointLight = new THREE.PointLight(0xc99bae,5, 100);
  // pointLight.position.set(0, 0, 3); // Start position above the model
      
  const directionalLight = new THREE.DirectionalLight(0xffb6f1, 1);
  const specularLight = new THREE.DirectionalLight(0xa6a6a6, 0.25);
  directionalLight.position.set(-6,6,3);
  // specularLight.position.set(-6,6,2);
  
  // Add ambient light for better overall illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
  
  return { directionalLight: directionalLight, ambientLight: ambientLight, specularLight: specularLight };
};

export const updateLightPosition = (
  renderer: THREE.WebGL1Renderer,
  light: THREE.DirectionalLight,
  specularLight: THREE.DirectionalLight,
  mouseX: number,
  mouseY: number,
  height: number = 5,
  shadowOffset: number = 20
) => {
  const radius = 3;
  const angle = Math.atan2(mouseY, mouseX) + Math.PI/2;

  light.position.x = -mouseX*shadowOffset; 
  light.position.y = mouseY*shadowOffset;
  light.position.z = -height;
  
  specularLight.position.x = radius * Math.sin(angle);
  specularLight.position.y = radius * Math.cos(angle);
  specularLight.position.z = -height;

  configureSoftShadows(renderer, light)
};

export const configureSoftShadows = (
  renderer: THREE.WebGLRenderer, 
  light: THREE.DirectionalLight
) => {
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;

  light.castShadow = true;

  // High-resolution shadow map
  light.shadow.mapSize.width = 4000;  
  light.shadow.mapSize.height = 4000;

  // Shadow camera settings
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 50;
  light.shadow.camera.top = 20;
  light.shadow.camera.bottom = -20;
  light.shadow.camera.left = -20;
  light.shadow.camera.right = 20;

  // Bias to prevent shadow artifacts
  light.shadow.bias = -0.0005;

  // Blur softness
  light.shadow.radius = 1; // Increase this value for softer shadows
};