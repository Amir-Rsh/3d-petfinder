import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { log } from "three/examples/jsm/nodes/Nodes";

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
        <div id="catList">
    
    <div class="animalsDiv" >
    <button id="catBack" onClick="handleRotateLeft(event)" class="back">back</button>

      <div class="stickers">
        <div class="stickerContnet">
          <h3>Miss Fluffington</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>
      <div class="stickers">
        <div class="stickerContnet">
          <h3>Fast & Furrious</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>
      <div class="stickers">
        <div class="stickerContnet">
          <h3>Tony Pawrker</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/774731/pexels-photo-774731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>
      <div class="stickers">
        <div class="stickerContnet">
          <h3>Jane Pawsten</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/2194261/pexels-photo-2194261.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
      <div class="stickers">
        <div class="stickerContnet">
          <h3>Baguette</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/1472999/pexels-photo-1472999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>
      <div class="stickers">
        <div class="stickerContnet">
          <h3>Furry Pawter</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/257532/pexels-photo-257532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>
      <div class="stickers">
        <div class="stickerContnet">
          <h3>Meowchaelangelo</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/615369/pexels-photo-615369.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
      <div class="stickers">
        <div class="stickerContnet">
          <h3>Midnight Meowriachi</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/979247/pexels-photo-979247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>
      <div class="stickers">
        <div class="stickerContnet">
          <h3>MeowDiePie</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/1521304/pexels-photo-1521304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>
      <div class="stickers">
        <div class="stickerContnet">
          <h3>Domestic Bad Hair Day</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/4587959/pexels-photo-4587959.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
          <h1 class="headers">Are You Looking For a Cute Kitten?</h1>
          <button onClick="handleRotateRight(event)" class="buttons" id="catButton">Meet<br />  The<br />  Cats</button>
        </div>
        <div id="dog" class="sections">
        <div id="dogList">
    
    <div class="animalsDiv">
    <button id="dogBack" onClick="handleRotateLeft(event)" class="back">back</button>

      <div class="dogStickers">
        <div class="stickerContnet">
          <h3>Miss Fluffington</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/733416/pexels-photo-733416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>
      <div class="dogStickers">
        <div class="stickerContnet">
          <h3>Fast & Furrious</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/160846/french-bulldog-summer-smile-joy-160846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>
      <div class="dogStickers">
        <div class="stickerContnet">
          <h3>Tony Pawrker</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>
      <div class="dogStickers">
        <div class="stickerContnet">
          <h3>Jane Pawsten</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>
      <div class="dogStickers">
        <div class="stickerContnet">
          <h3>Baguette</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>
      <div class="dogStickers">
        <div class="stickerContnet">
          <h3>Furry Pawter</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/128817/pexels-photo-128817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>
      <div class="dogStickers">
        <div class="stickerContnet">
          <h3>Meowchaelangelo</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/1938126/pexels-photo-1938126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>
      <div class="dogStickers">
        <div class="stickerContnet">
          <h3>Midnight Meowriachi</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
      <div class="dogStickers">
        <div class="stickerContnet">
          <h3>MeowDiePie</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/731022/pexels-photo-731022.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
      <div class="dogStickers">
        <div class="stickerContnet">
          <h3>Domestic Bad Hair Day</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/981062/pexels-photo-981062.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
       
          <h1 id='dogHeader' class="headers">Or a Playful Puppy</h1> 
          <button onClick="handleRotateRight(event)" class="buttons" id="dogButton">Meet<br />  The <br /> Dogs</button>

        </div>
        <div id="rabbit" class="sections">
        <div id="rabbitList">
    <div class="animalsDiv"
    >
    <button id="rabbitBack" onClick="handleRotateLeft(event)" class="back">back</button>

      <div class="rabbitStickers">
        <div class="stickerContnet">
          <h3>Miss Fluffington</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/1510544/pexels-photo-1510544.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
      <div class="rabbitStickers">
        <div class="stickerContnet">
          <h3>Fast & Furrious</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/583676/pexels-photo-583676.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
      <div class="rabbitStickers">
        <div class="stickerContnet">
          <h3>Tony Pawrker</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/383557/pexels-photo-383557.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
      <div class="rabbitStickers">
        <div class="stickerContnet">
          <h3>Jane Pawsten</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/3828097/pexels-photo-3828097.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
      <div class="rabbitStickers">
        <div class="stickerContnet">
          <h3>Baguette</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/2883510/pexels-photo-2883510.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
      <div class="rabbitStickers">
        <div class="stickerContnet">
          <h3>Furry Pawter</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/2061754/pexels-photo-2061754.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
      <div class="rabbitStickers">
        <div class="stickerContnet">
          <h3>Meowchaelangelo</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/96442/pexels-photo-96442.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
      <div class="rabbitStickers">
        <div class="stickerContnet">
          <h3>Midnight Meowriachi</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/1074644/pexels-photo-1074644.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
      <div class="rabbitStickers">
        <div class="stickerContnet">
          <h3>MeowDiePie</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/2389073/pexels-photo-2389073.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
      <div class="rabbitStickers">
        <div class="stickerContnet">
          <h3>Domestic Bad Hair Day</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/3730206/pexels-photo-3730206.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
          <h1 id="rabbitHeader" class="headers">Maybe a Hopping Furball?</h1> 
          <button onClick="handleRotateRight(event)" class="buttons"  id="rabbitButton">Meet<br /> The<br />  Rabbits</button>

        </div>
        <div id="bird" class="sections">
        <div id="birdList">
    <div class="animalsDiv">
    <button id="birdBack" onClick="handleRotateLeft(event)" class="back"><i class="fa-solid fa-backward-step"></i></button>

      <div class="birdStickers">
        <div class="stickerContnet">
          <h3>Miss Fluffington</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/2317904/pexels-photo-2317904.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
      <div class="birdStickers">
        <div class="stickerContnet">
          <h3>Fast & Furrious</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/97533/pexels-photo-97533.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
      <div class="birdStickers">
        <div class="stickerContnet">
          <h3>Tony Pawrker</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/75973/pexels-photo-75973.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
      <div class="birdStickers">
        <div class="stickerContnet">
          <h3>Jane Pawsten</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/596792/pexels-photo-596792.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
      <div class="birdStickers">
        <div class="stickerContnet">
          <h3>Baguette</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/2400030/pexels-photo-2400030.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
      <div class="birdStickers">
        <div class="stickerContnet">
          <h3>Furry Pawter</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/85674/duck-mandarin-ducks-aix-galericulata-duck-bird-85674.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
      <div class="birdStickers">
        <div class="stickerContnet">
          <h3>Meowchaelangelo</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/86596/owl-bird-eyes-eagle-owl-86596.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
      <div class="birdStickers">
        <div class="stickerContnet">
          <h3>Against love bird</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/928340/pexels-photo-928340.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
      <div class="birdStickers">
        <div class="stickerContnet">
          <h3>Sir singsalot</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/1526410/pexels-photo-1526410.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
      <div class="birdStickers">
        <div class="stickerContnet">
          <h3>Elizabird</h3>
          <img
            class="stickerImages"
            src="https://images.pexels.com/photos/2570085/pexels-photo-2570085.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
          <h1 id="birdHeader" class="headers">How About a Distinguished Singer?</h1>          
          <button onClick="handleRotateRight(event)" class="buttons"  id="birdButton">Meet<br />  The <br /> Birds</button>

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
    console.log("down");

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
  if (endY === 0) {
  } else if (deltaY > 0) {
    handleScrollDown();
  } else if (deltaY < 0) {
    handleScrollUp();
  }

  // Reset values
  startY = 0;
  endY = 0;
};

let isRotatingRight = false;
let rotateTargetRight = camera.rotation.y - Math.PI / 2;

let isRotatingLeft = false;
let rotateTargetLeft = camera.rotation.y + Math.PI / 2;

function rotateRight() {
  if (!isRotatingRight) {
    rotateTargetRight = camera.rotation.y - Math.PI / 2;
    isRotatingRight = true;
    clock.start();
  }

  function animateRotate() {
    let delta = clock.getDelta();
    let step = 1 * delta;
    if (camera.rotation.y > rotateTargetRight) {
      camera.rotation.y -= step;
      requestAnimationFrame(animateRotate);
    } else {
      camera.rotation.y = rotateTargetRight;
      isRotatingRight = false;
    }
  }

  animateRotate();
}

function rotateLeft() {
  if (!isRotatingLeft) {
    rotateTargetLeft = camera.rotation.y + Math.PI / 2;
    isRotatingLeft = true;
    clock.start();
  }

  function animateRotate() {
    let delta = clock.getDelta();
    let step = 1 * delta;
    if (camera.rotation.y < rotateTargetLeft) {
      camera.rotation.y += step;
      requestAnimationFrame(animateRotate);
    } else {
      camera.rotation.y = rotateTargetLeft;
      isRotatingLeft = false;
    }
  }

  animateRotate();
}

window.handleRotateRight = (event) => {
  if (event.target.id === "catButton") {
    document.getElementsByClassName("headers")[0].classList.toggle("rotate");
    document.getElementsByClassName("buttons")[0].classList.toggle("rotate");
    document.getElementById("catList").classList.toggle("rotate");
  }
  if (event.target.id === "dogButton") {
    document.getElementsByClassName("headers")[1].classList.toggle("rotate");
    document.getElementsByClassName("buttons")[1].classList.toggle("rotate");
    document.getElementById("dogList").classList.toggle("rotate");
  }
  if (event.target.id === "rabbitButton") {
    document.getElementsByClassName("headers")[2].classList.toggle("rotate");
    document.getElementsByClassName("buttons")[2].classList.toggle("rotate");
    document.getElementById("rabbitList").classList.toggle("rotate");
  }
  if (event.target.id === "birdButton") {
    document.getElementsByClassName("headers")[3].classList.toggle("rotate");
    document.getElementsByClassName("buttons")[3].classList.toggle("rotate");
    document.getElementById("birdList").classList.toggle("rotate");
  }
  rotateRight();
  removeEventListeners();
};
window.handleRotateLeft = (event) => {
  if (event.target.id === "catBack") {
    document.getElementsByClassName("headers")[0].classList.toggle("rotate");
    document.getElementsByClassName("buttons")[0].classList.toggle("rotate");
    document.getElementById("catList").classList.toggle("rotate");
  }
  if (event.target.id === "dogBack") {
    document.getElementsByClassName("headers")[1].classList.toggle("rotate");
    document.getElementsByClassName("buttons")[1].classList.toggle("rotate");
    document.getElementById("dogList").classList.toggle("rotate");
  }
  if (event.target.id === "rabbitBack") {
    document.getElementsByClassName("headers")[2].classList.toggle("rotate");
    document.getElementsByClassName("buttons")[2].classList.toggle("rotate");
    document.getElementById("rabbitList").classList.toggle("rotate");
  }
  if (event.target.id === "birdBack") {
    document.getElementsByClassName("headers")[3].classList.toggle("rotate");
    document.getElementsByClassName("buttons")[3].classList.toggle("rotate");
    document.getElementById("birdList").classList.toggle("rotate");
  }
  addEventListeners();
  rotateLeft();
};
function addEventListeners() {
  window.addEventListener("touchstart", handleTouchStart, false);
  window.addEventListener("touchmove", handleTouchMove, false);
  window.addEventListener("touchend", handleTouchEnd, false);
  window.addEventListener("wheel", handleWheel);
}

function removeEventListeners() {
  window.removeEventListener("touchstart", handleTouchStart, false);
  window.removeEventListener("touchmove", handleTouchMove, false);
  window.removeEventListener("touchend", handleTouchEnd, false);
  window.removeEventListener("wheel", handleWheel);
}

addEventListeners();

animate();
