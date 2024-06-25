import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { FBXLoader } from "three-stdlib";

const scene = new THREE.Scene();
scene.background = new THREE.Color("lightgreen");

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.set(0, 5, 10);

let dogModel;
let dogMixer;
let catModel;
let catMixer;

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(25, 25, 25);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const dogTexture = new THREE.TextureLoader().load("./Image_0.png");

function loadModel(path, character, format) {
  let loader;
  if (format === "fbx") {
    loader = new FBXLoader();
  } else if (format === "glb") {
    loader = new GLTFLoader();
  } else {
    console.error("Unsupported format:", format);
    return;
  }

  loader.load(
    path,
    function (geometry) {
      let model;
      if (format === "fbx") model = geometry;
      else if (format === "glb") model = geometry.scene;
      else return;

      if (character === "dog") {
        model.scale.set(0.05, 0.05, 0.05);
        model.children[2].material.map = dogTexture;
        dogModel = model;
        dogMixer = new THREE.AnimationMixer(model);
        const action = dogMixer.clipAction(model.animations[0]);
        action.play();
      }
      if (character === "cat") {
        model.scale.set(0.3, 0.3, 0.3);
        catModel = model;
        catMixer = new THREE.AnimationMixer(model);
        geometry.animations.forEach((clip) => {
          catMixer.clipAction(clip).play();
        });
      }
      scene.add(model);
    },
    function (xhr) {},
    function (error) {
      console.error("An error happened", error);
    }
  );
}

loadModel("./AnimatedDog.fbx", "dog", "fbx");
loadModel("./an_animated_cat.glb", "cat", "glb");

function animate() {
  if (dogModel && catModel && !document.getElementById("content")) {
    document.body.innerHTML += `
    <div id="content">
        <div id="firstHeader">
         <h1 class="headers">Are You Looking For a Cute Kitten?</h1>
        </div>
        <div id="secondHeader">
       <h1 class="headers"> Or a Playful Puppy</h1>
        </div>
        
      </div>
    `;
    document
      .getElementById("loadingPage")
      .parentNode.removeChild(document.getElementById("loadingPage"));
    document.body.appendChild(renderer.domElement);
  }
  requestAnimationFrame(animate);
  if (
    dogModel &&
    dogMixer &&
    catModel &&
    catMixer &&
    document.getElementById("content")
  ) {
    dogMixer.update(0.01);

    dogModel.position.z = 10;
    dogModel.position.y = 1;
    // catModel.position.y = 2;
    // catModel.position.x = 1;
    // catModel.position.z = 0;
    // catModel.position.y = 4;
    catMixer.update(0.01);

    // catModel.rotation.z = Math.PI + 0.2;
    // catModel.rotation.x += 0.02;

    catModel.rotation.y = Math.PI + 0.4;

    renderer.render(scene, camera);
  }
}

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = 10 - t * 0.01;
}

document.body.onscroll = moveCamera;

animate();
