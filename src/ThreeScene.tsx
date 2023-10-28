import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Props } from "./general";
export const ThreeScene = ({
  backgroundImage,
  sunUVLayoutImage,
  sunTextureImage,
  disableBackground,
  starCount,
  rotationSpeed,
  orbitColor,
}: Props): any => {
  backgroundImage =
    backgroundImage && backgroundImage.length
      ? backgroundImage
      : "https://vzila.github.io/Images/b1.jpg";

  sunUVLayoutImage =
    sunUVLayoutImage && sunUVLayoutImage
      ? sunUVLayoutImage
      : "https://vzila.github.io/Images/l2.jpg";

  sunTextureImage =
    sunTextureImage && sunTextureImage
      ? sunTextureImage
      : "https://vzila.github.io/Images/l3.jpg";

  starCount =
    starCount && starCount > 0 && starCount < 100000 ? starCount : 1000;

  rotationSpeed =
    rotationSpeed && rotationSpeed > 0 && rotationSpeed < 1
      ? rotationSpeed
      : 0.004;

  orbitColor =
    orbitColor &&
    String(orbitColor).length > 0 &&
    String(orbitColor).length <= 8
      ? +orbitColor
      : 0xff0000;
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

    if (!disableBackground) {
      const spaceTexture = new THREE.TextureLoader().load(backgroundImage);
      spaceTexture.anisotropy = 16;
      spaceTexture.encoding = THREE.sRGBEncoding;
      scene.background = spaceTexture;
    }
    const atmosphereGeometry = new THREE.SphereGeometry(5.2, 50, 50);
    const atmosphereMaterial = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.2,
      color: orbitColor,
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
    const texture = textureLoader.load(sunUVLayoutImage);
    const normalTexture = textureLoader.load(sunTextureImage);

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

    for (let i = 0; i < starCount; i++) {
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
      sphere.rotation.y += rotationSpeed;
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }, [
    backgroundImage,
    sunUVLayoutImage,
    sunTextureImage,
    disableBackground,
    starCount,
    rotationSpeed,
  ]);

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
};
