import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

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

let dogMixer, catMixer;
let toyModels = [];
let dogModel, catModel;

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(25, 25, 25);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Loading screen element
const loadingScreen = document.getElementById("loading-screen");
const mainContent = document.getElementById("main-content");

function loadModel(path, animal, randomizer) {
  const loader = new GLTFLoader();
  return new Promise((resolve, reject) => {
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
          toyModels.push(model);
        }
        if (animal === "cat") {
          model.scale.set(0.05, 0.05, 0.05);
          // catMixer = new THREE.AnimationMixer(gltf.scene);
          // gltf.animations.forEach((clip) => {
          //   catMixer.clipAction(clip).play();
          // });
          model.rotation.y = THREE.MathUtils.degToRad(-40);
          catModel = model;
        }
        if (animal === "dog") {
          dogModel = model;
          // dogMixer = new THREE.AnimationMixer(gltf.scene);
          // gltf.animations.forEach((clip) => {
          //   dogMixer.clipAction(clip).play();
          // });
        }
        scene.add(model);
        resolve();
      },
      undefined,
      function (error) {
        console.error("An error happened", error);
        reject(error);
      }
    );
  });
}

async function loadModels() {
  const promises = [
    loadModel("/models/dogString.glb", "dog"),
    loadModel("/models/an_animated_cat.glb", "cat"),
    ...Array(200)
      .fill()
      .map(() => loadModel("/models/cat_plushie.glb", "toy", true)),
  ];

  await Promise.all(promises);

  // Hide loading screen and show main content
  loadingScreen.style.display = "none";
  mainContent.classList.remove("hidden");
  mainContent.classList.add("visible");

  // Enable scrolling
  document.body.classList.remove("disable-scroll");
}

// Disable scrolling initially
document.body.classList.add("disable-scroll");

loadModels();

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize);

function animate() {
  requestAnimationFrame(animate);
  // const delta = clock.getDelta();
  // if (dogMixer) dogMixer.update(delta);
  // if (catMixer) catMixer.update(delta);

  if (dogModel) {
    dogModel.position.z = -2;
  }
  if (catModel) {
    catModel.position.z = 0;
  }

  toyModels.forEach((toy, i) => {
    toy.rotation.x += parseFloat("0.00" + i);
    toy.rotation.y += parseFloat("0.00" + i);
    toy.rotation.z += parseFloat("0.00" + i);
  });

  renderer.render(scene, camera);
}

// const clock = new THREE.Clock();

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.005;
}

document.body.onscroll = moveCamera;

animate();
