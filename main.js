import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css';  

// Scena
const scene = new THREE.Scene();

// Create our sphere
const geometry = new THREE.SphereGeometry(3, 80, 80);
const material = new THREE.MeshStandardMaterial({
  color:"#e88200"
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Camara
const camera = new THREE.PerspectiveCamera(45, 800/600, 0.1, 100);
camera.position.z = 15;
scene.add(camera);


// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Light
const light = new THREE.PointLight(0xffffff, 1 , 100);
light.position.set(0, 10, 10);
scene.add(light);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene,camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping  = true;
controls.enablePan      = false;
controls.enableZoom     = false;
controls.autoRotate     = true;
controls.autoRotateSpeed= 5; 

// Resize
window.addEventListener('resize', () => {

  // Update Sizes
  sizes.width = window.innerWidth,
  sizes.height = window.innerHeight

  // Update Camara
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height);

});

const loop = () => {
  controls.update();
  renderer.render(scene,camera);
  window.requestAnimationFrame(loop);
}

loop();