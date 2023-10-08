import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function ThreeScene() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      // antialias: true,
      canvas: document.getElementById("earth-background") as HTMLCanvasElement,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    const controls = new OrbitControls(camera, renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    const spaceTexture = new THREE.TextureLoader().load("b1.webp");
    spaceTexture.anisotropy = 16;
    spaceTexture.encoding = THREE.sRGBEncoding;
    scene.background = spaceTexture;

    const atmosphereGeometry = new THREE.SphereGeometry(5.2, 50, 50);
    const atmosphereMaterial = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.2,
      color: 0xff0000,
    });

    const atmosphereSphere = new THREE.Mesh(
      atmosphereGeometry,
      atmosphereMaterial
    );
    scene.add(atmosphereSphere);

    const particleGeometry = new THREE.BufferGeometry();
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const geometry = new THREE.SphereGeometry(5, 50, 50);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("l2.jpg");
    const normalTexture = textureLoader.load("l3.jpg");

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      normalMap: normalTexture,
      roughness: 0,
      metalness: 0.2,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    camera.position.setZ(10);

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    const starVertices: number[] = [];

    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    function animate() {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.004;

      controls.update();

      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
      }}
    >
      <canvas id="earth-background"></canvas>
    </div>
  );
}

export default ThreeScene;
