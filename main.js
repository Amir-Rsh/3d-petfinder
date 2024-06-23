import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color("salmon");

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(0, 1, 0);

let dogMixer;
let catMixer;
let boneModel = [];
let dogModel;
let catModel;

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(25, 25, 25);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

function loadModel(path, animal, randomizer) {
  const loader = new GLTFLoader();

  loader.load(
    path,
    function (gltf) {
      const model = gltf.scene;

      if (randomizer) {
        model.scale.set(0.2, 0.2, 0.2);
        const [x, y, z] = Array(3)
          .fill()
          .map(() => THREE.MathUtils.randFloatSpread(100));
        model.position.set(x, y, z);
        boneModel.push(model);
      }
      if (animal === "cat") {
        model.scale.set(0.05, 0.05, 0.05);
        catMixer = new THREE.AnimationMixer(gltf.scene);
        gltf.animations.forEach((clip) => {
          catMixer.clipAction(clip).play();
          model.rotation.y = 106;
        });
        catModel = model;
      }
      if (animal === "dog") {
        dogModel = model;
        dogMixer = new THREE.AnimationMixer(gltf.scene);
        gltf.animations.forEach((clip) => {
          dogMixer.clipAction(clip).play();
        });
      }
      scene.add(model);
    },
    function (xhr) {
      // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.error("An error happened", error);
    }
  );
}

loadModel("/models/dogString.glb", "dog");
loadModel("/models/an_animated_cat.glb", "cat");

Array(200)
  .fill()
  .map(() => loadModel("/models/dog_treat.glb", "bone", "randomize"));

function animate() {
  requestAnimationFrame(animate);
  if (dogModel) {
    dogModel.position.z = -2;
  }
  if (catModel) catModel.position.z = 0;

  boneModel.forEach((bone, i) => {
    bone.rotation.x += parseFloat("0.00" + i);
    bone.rotation.y += parseFloat("0.00" + i);
    bone.rotation.z += parseFloat("0.00" + i);
  });
  const delta = clock.getDelta();
  if (dogMixer) dogMixer.update(delta);
  if (catMixer) catMixer.update(delta);

  renderer.render(scene, camera);
}

const clock = new THREE.Clock();

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.004;
}

document.body.onscroll = moveCamera;

animate();
