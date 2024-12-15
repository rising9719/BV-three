import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export const loadModel = (
  url: string,
  onLoad: (model: THREE.Group) => void,
  onProgress?: (event: ProgressEvent) => void,
) => {
  
  const loader = new OBJLoader();

  
  loader.load(
    url,
    (object) => {
      // Center the model on X-Y plane
      const box = new THREE.Box3().setFromObject(object);
      // const center = box.getCenter(new THREE.Vector3());
      // object.position.set(-center.x , -center.y, 0);
      const aspect = window.innerWidth / window.innerHeight;
      const fov = 360;
      const halfHeight = Math.tan(fov/360* Math.PI)* window.innerHeight/2;
      const halfWidth = halfHeight*aspect;
      object.position.set(0, 0, halfWidth);
       // Keep Z at 0 for X-Y plane
      
      // Scale the model to fit the scene
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y);
      const scale = 4 / maxDim;
      object.scale.multiplyScalar(scale);
     

      // Add material properties for better lighting
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshPhongMaterial({
            color: 0xf5c6da, // Model color
            // specular: 0xf5c6da,
            // shininess: 50,
            side: THREE.DoubleSide,
            flatShading: false
          });
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      
      // Ensure model lies flat on X-Y plane
      object.rotation.x = -Math.PI / 2;
      object.rotation.y = -Math.PI;
      
      onLoad(object);
    },
    onProgress,
  );

 
};