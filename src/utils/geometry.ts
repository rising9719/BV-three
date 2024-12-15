// import * as THREE from 'three';

// export const createEmojiScene = () => {
//   // Create pink background plane
//   const planeGeometry = new THREE.PlaneGeometry(10, 6);
//   const planeMaterial = new THREE.MeshPhongMaterial({
//     color: 0xff69b4,
//     side: THREE.DoubleSide
//   });
//   const plane = new THREE.Mesh(planeGeometry, planeMaterial);

//   // Create face base (circle)
//   const faceGeometry = new THREE.CircleGeometry(2, 32);
//   const faceMaterial = new THREE.MeshPhongMaterial({
//     color: 0xff69b4,
//     side: THREE.DoubleSide,
//     depthWrite: true,
//     depthTest: true
//   });
//   const face = new THREE.Mesh(faceGeometry, faceMaterial);
//   face.position.z = 0.1;

//   // Create smile (curved line)
//   const smileCurve = new THREE.EllipseCurve(
//     0, -0.5,
//     1, 0.5,
//     0, Math.PI,
//     false,
//     0
//   );
//   const smilePoints = smileCurve.getPoints(50);
//   const smileGeometry = new THREE.BufferGeometry().setFromPoints(smilePoints);
//   const smileMaterial = new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 2 });
//   const smile = new THREE.Line(smileGeometry, smileMaterial);
//   smile.position.z = 0.2;

//   // Create eyes
//   const eyeGeometry = new THREE.CircleGeometry(0.2, 32);
//   const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
  
//   const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
//   leftEye.position.set(-0.7, 0.3, 0.2);
  
//   const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
//   rightEye.position.set(0.7, 0.3, 0.2);

//   // Group all elements
//   const emojiGroup = new THREE.Group();
//   emojiGroup.add(plane);
//   emojiGroup.add(face);
//   emojiGroup.add(smile);
//   emojiGroup.add(leftEye);
//   emojiGroup.add(rightEye);

//   return emojiGroup;
// };