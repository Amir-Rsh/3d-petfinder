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

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(25, 25, 25);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const dogTexture = new THREE.TextureLoader().load(
  "/public/textures/Image_0.png"
);
const catTexture = new THREE.TextureLoader().load(
  "/public/textures/model1.jpg"
);
const pillowTexture = new THREE.TextureLoader().load(
  "/public/textures/model.jpg"
);

function loadModel(path, character) {
  const loader = new FBXLoader();

  loader.load(
    path,
    function (model) {
      if (character === "dog") {
        model.scale.set(0.05, 0.05, 0.05);
        model.children[2].material.map = dogTexture;
        dogModel = model;
        dogMixer = new THREE.AnimationMixer(model);
        const action = dogMixer.clipAction(model.animations[0]);
        action.play();
      }
      if (character === "cat") {
        model.scale.set(0.1, 0.1, 0.1);
        console.log(model.children[0].material[0].map);
        model.children[0].material[0].map = pillowTexture;
        model.children[0].material[1].map = catTexture;

        catModel = model;
      }
      scene.add(model);
    },
    function (xhr) {},
    function (error) {
      console.error("An error happened", error);
    }
  );
}

loadModel("/public/models/AnimatedDog.fbx", "dog");
loadModel("/public/models/model.fbx", "cat");

function animate() {
  if (dogModel && catModel && !document.getElementById("content")) {
    document.body.innerHTML += `
    <div id="content">
        <h1 id="firstHeader">
         <span class="headers">Are You Looking For a Cute Kitten?</span>
        </h1>
        <h1 id="secondHeader">
       <span class="headers"> Or a Playful Puppy</span>
        </h1>
        
      </div>
    `;
    setTimeout(() => {
      document
        .getElementById("loadingPage")
        .parentNode.removeChild(document.getElementById("loadingPage"));
      document.body.appendChild(renderer.domElement);
    }, 3000);
  }
  requestAnimationFrame(animate);
  if (dogModel && dogMixer && catModel && document.getElementById("content")) {
    dogMixer.update(0.01);

    dogModel.position.z = 10;
    dogModel.position.y = 1;
    // catModel.position.y = 2;
    catModel.position.x = 1;
    catModel.position.z = 0;
    catModel.position.y = 4;

    catModel.rotation.z = Math.PI + 0.2;
    // catModel.rotation.x += 0.02;

    catModel.rotation.y = Math.PI - 0.4;

    renderer.render(scene, camera);
  }
}

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = 10 - t * 0.01;
}

document.body.onscroll = moveCamera;

animate();
