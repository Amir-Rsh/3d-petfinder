import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.set(0, 5, 10);

let dogModel;
let dogMixer;
let catModel;
let catMixer;
let rabbitModel;
let rabbitMixer;
let birdModel;
let birdMixer;

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
      if (character === "rabbit") {
        model.scale.set(0.1, 0.1, 0.1);
        rabbitModel = model;
        rabbitMixer = new THREE.AnimationMixer(model);
        geometry.animations.forEach((clip) => {
          rabbitMixer.clipAction(clip).play();
        });
      }
      if (character === "bird") {
        model.scale.set(5, 5, 5);
        birdModel = model;
        birdMixer = new THREE.AnimationMixer(model);
        geometry.animations.forEach((clip) => {
          birdMixer.clipAction(clip).play();
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
loadModel("./rabbit_rigged.glb", "rabbit", "glb");
loadModel("./pigeon.glb", "bird", "glb");

function animate() {
  if (
    dogModel &&
    catModel &&
    rabbitModel &&
    birdModel &&
    !document.getElementById("dog")
  ) {
    document.getElementById("content").innerHTML += `
        <div id="cat" class="sections">
          <h1 class="headers">Are You Looking For a Cute Kitten?</h1>
        </div>
        <div id="dog" class="sections">
          <h1 id='dogHeader' class="headers">Or a Playful Puppy</h1>
        </div>
        <div id="rabbit" class="sections">
          <h1 id="rabbitHeader" class="headers">Maybe a Hopping Furball?</h1>
        </div>
        <div id="bird" class="sections">
          <h1 id="birdHeader" class="headers">How About a Distinguished Singer?</h1>
        </div>`;

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
    rabbitModel &&
    rabbitMixer &&
    birdModel &&
    birdMixer &&
    document.getElementById("dog")
  ) {
    dogMixer.update(0.01);
    dogModel.position.z = 10;
    dogModel.position.y = 1;

    catMixer.update(0.01);
    catModel.rotation.y = Math.PI + 0.4;

    rabbitModel.position.z = 22;
    rabbitModel.position.y = 3.5;
    rabbitModel.position.x = 0.5;
    rabbitModel.rotation.y = Math.PI / -4;
    rabbitMixer.update(0.01);

    birdModel.position.z = 30;
    birdModel.position.y = 3;
    birdModel.rotation.y = Math.PI / -4;
    birdMixer.update(0.01);

    renderer.render(scene, camera);
  }
}

function handleWheel(event) {
  if (event.deltaY > 0) {
    handleScrollDown();
  } else if (event.deltaY < 0) {
    handleScrollUp();
  }
}

window.addEventListener("wheel", handleWheel);

let zoomOutTarget = camera.position.z + 8;
let zoomInTarget = camera.position.z - 8;

let clock = new THREE.Clock();
let isZoomingOut = false;
let isZoomingIn = false;

function zoomOut() {
  if (!isZoomingOut) {
    zoomOutTarget = camera.position.z + 8;
    isZoomingOut = true;
    clock.start();
  }

  function animateZoom() {
    let delta = clock.getDelta();
    let step = 15 * delta;
    if (camera.position.z < zoomOutTarget) {
      camera.position.z += step;
      requestAnimationFrame(animateZoom);
    } else {
      camera.position.z = zoomOutTarget;
      isZoomingOut = false;
    }
  }

  animateZoom();
}

function zoomIn() {
  if (!isZoomingIn) {
    zoomInTarget = camera.position.z - 8;
    isZoomingIn = true;
    clock.start();
  }

  function animateZoom() {
    let delta = clock.getDelta();
    let step = 15 * delta; // Adjust the speed as necessary
    if (camera.position.z > zoomInTarget) {
      camera.position.z -= step;
      requestAnimationFrame(animateZoom);
    } else {
      camera.position.z = zoomInTarget;
      isZoomingIn = false;
    }
  }

  animateZoom();
}
window.handleScrollDown = () => {
  if (camera.position.z === 10) {
    document.body.classList.value = "new-background";

    const dogDiv = document.getElementById("dog");
    dogDiv.scrollIntoView({ behavior: "smooth" });

    zoomOut();
  }
  if (camera.position.z === 18) {
    document.body.classList.value = "new-background2";

    const rabbitDiv = document.getElementById("rabbit");
    rabbitDiv.scrollIntoView({ behavior: "smooth" });

    zoomOut();
  }
  if (camera.position.z === 26) {
    document.body.classList.value = "new-background3";

    const birdDiv = document.getElementById("bird");
    birdDiv.scrollIntoView({ behavior: "smooth" });

    zoomOut();
  }
};

window.handleScrollUp = () => {
  if (camera.position.z === 18) {
    document.body.classList.value = "new-background4";

    const catDiv = document.getElementById("cat");
    catDiv.scrollIntoView({ behavior: "smooth" });

    zoomIn();
  }
  if (camera.position.z === 26) {
    document.body.classList.value = "new-background";

    const dogDiv = document.getElementById("dog");
    dogDiv.scrollIntoView({ behavior: "smooth" });

    zoomIn();
  }
  if (camera.position.z === 34) {
    document.body.classList.value = "new-background2";

    const rabbitDiv = document.getElementById("rabbit");
    rabbitDiv.scrollIntoView({ behavior: "smooth" });

    zoomIn();
  }
};

let startY = 0;
let endY = 0;

const handleTouchStart = (event) => {
  // Capture the starting Y position of the touch
  startY = event.touches[0].clientY;
};

const handleTouchMove = (event) => {
  // Capture the current Y position of the touch
  endY = event.touches[0].clientY;
};

const handleTouchEnd = () => {
  const deltaY = startY - endY;

  if (deltaY > 0) {
    handleScrollDown();
  } else if (deltaY < 0) {
    handleScrollUp();
  }

  // Reset values
  startY = 0;
  endY = 0;
};

window.addEventListener("touchstart", handleTouchStart, false);
window.addEventListener("touchmove", handleTouchMove, false);
window.addEventListener("touchend", handleTouchEnd, false);

animate();
