 import * as THREE from "three";
    import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
    import { OrbitControls } from "three/addons/controls/OrbitControls.js";

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // transparent to show page behind
    const bgContainer = document.getElementById("three-bg");
    bgContainer.appendChild(renderer.domElement);
    // stretch the canvas to fill viewport with zero margin/padding
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.margin = "0";
    renderer.domElement.style.padding = "0";
    renderer.domElement.style.display = "block";

    // 2. Add lighting (this is where your HemisphereLight goes)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    hemiLight.position.set(0, 20, 0); // above the scene
    scene.add(hemiLight);


    // Lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    let brickModel = null;

    // Load GLB model
    const loader = new GLTFLoader();
    loader.load(
      "../assets/Plate1.glb",
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5);
        model.position.set(0, -0.5, 0);
        scene.add(model);
        brickModel = model;
        console.log("Model loaded successfully");
      },
      (progress) => {
        // Progress callback (optional)
        const percentComplete = (progress.loaded / progress.total) * 100;
        console.log("Loading: " + percentComplete.toFixed(2) + "%");
      },
      (error) => {
        console.error("Error loading GLB:", error);
      }
    );

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;
    controls.target.set(0, 0, 0);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      if (brickModel) {
        brickModel.rotation.y += 0.002;
      }
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });