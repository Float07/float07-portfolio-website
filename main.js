import './style.css'

import * as THREE from 'three';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene,camera);


const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry,material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(5,5,5);
const ambientLight = new THREE.AmbientLight(0xFFFFFF)
scene.add(pointLight, ambientLight);


function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star)
}
Array(200).fill().forEach(addStar);


const spaceTexture = new THREE.TextureLoader().load('/resources/space.jpg');
scene.background = spaceTexture

//Create and add a cube with my picture
const meTexture = new THREE.TextureLoader().load('/resources/me.jpg');

const me = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: meTexture})
);
me.position.z = -5;
me.position.x = 2;

scene.add(me);

//Add Neptune
const venusTexture = new THREE.TextureLoader().load('/resources/venusmap.jpg');
const venusBump = new THREE.TextureLoader().load('/resources/venusnormal.jpg');

const venus = new THREE.Mesh(
  new THREE.SphereGeometry(3, 64, 64),
  new THREE.MeshStandardMaterial({map: venusTexture, normalMap: venusBump})
);
venus.position.setZ(30);
venus.position.setX(-10);

scene.add(venus);



function moveCamera() {
  const scrollPosition = document.body.getBoundingClientRect().top;
  venus.rotation.x += 0.05;
  venus.rotation.y += 0.075;
  venus.rotation.z += 0.05;

  me.rotation.y += 0.01;
  me.rotation.z += 0.01;

  camera.position.z = scrollPosition*-0.01;
  camera.position.x = scrollPosition*-0.0002;
  camera.rotation.y = scrollPosition*-0.0002;
}
document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01
  torus.rotation.y += 0.0045
  torus.rotation.z += 0.01

  venus.rotation.y += 0.01

  renderer.render(scene, camera);
}

animate();