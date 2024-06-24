import "./style.css";
import * as THREE from "three";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { FBXLoader } from "three-stdlib";

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

camera.position.set(0, 5, 10);

// let boneModel = [];
let archerModel;
let archerMixer;
// let catModel;

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(25, 25, 25);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const dogTexture = new THREE.TextureLoader().load("/textures/Image_0.png");

function loadModel(path, character, randomizer) {
  const loader = new FBXLoader();

  loader.load(
    path,
    function (model) {
      // if (randomizer) {
      //   model.scale.set(0.2, 0.2, 0.2);
      //   const [x, y, z] = Array(3)
      //     .fill()
      //     .map(() => THREE.MathUtils.randFloatSpread(100));
      //   model.position.set(x, y, z);
      //   boneModel.push(model);
      // }
      if (character === "archer") {
        model.scale.set(0.05, 0.05, 0.05);
        model.children[2].material.map = dogTexture;
        // model.rotation.x = -2;
        // catModel = model;
        archerModel = model;
        archerMixer = new THREE.AnimationMixer(model);
        const action = archerMixer.clipAction(model.animations[0]);
        action.play();
      }
      // if (character === "dog") {
      //   model.rotation.y = 3;

      //   archerModel = model;
      // }
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

loadModel("/models/AnimatedDog.fbx", "archer");
// loadModel("/models/cat_figure.glb", "cat");

// Array(200)
//   .fill()
//   .map(() => loadModel("/models/cat_plushie.glb", "bone", "randomize"));

function animate() {
  if (
    archerModel &&
    // catModel &&
    !document.getElementById("content")
    // boneModel.length === 400
  ) {
    document.body.innerHTML += `
    <div id="content">
        <h1>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel repellat
          nam quis corporis, reprehenderit optio sed placeat adipisci sit natus
          reiciendis, sint neque perferendis deleniti laudantium ipsum ea maiores
          veritatis.
        </h1>
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam saepe
          neque rerum dignissimos distinctio accusamus, tenetur, deleniti sit
          minima laborum in voluptatem magni temporibus quidem atque commodi
          soluta provident pariatur.
        </h1>
        <h1>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum
          laudantium eligendi fugit enim aliquam libero. Officiis quo, praesentium
          natus reiciendis quidem vel unde modi aliquam, voluptatem quae corrupti,
          porro aliquid!
        </h1>
      </div>
    `;
    document
      .getElementById("loadingPage")
      .parentNode.removeChild(document.getElementById("loadingPage"));
    document.body.appendChild(renderer.domElement);
  }
  requestAnimationFrame(animate);
  if (
    archerModel &&
    archerMixer &&
    document.getElementById("content")
    // boneModel.length === 400
  ) {
    archerMixer.update(0.01);

    archerModel.position.z = 0;
    // catModel.position.z = 0;

    // boneModel.forEach((bone, i) => {
    //   bone.rotation.x += parseFloat("0.00" + i);
    //   bone.rotation.y += parseFloat("0.00" + i);
    //   bone.rotation.z += parseFloat("0.00" + i);
    // });

    renderer.render(scene, camera);
  }
}

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = 10 - t * 0.01;
  // archerModel.rotation.x += 0.01;
  // archerModel.rotation.y += 0.05;
  // archerModel.rotation.z += 0.01;
  // catModel.rotation.x += 0.01;
  // catModel.rotation.z += 0.05;
  // catModel.rotation.z += 0.01;
}

document.body.onscroll = moveCamera;

animate();
