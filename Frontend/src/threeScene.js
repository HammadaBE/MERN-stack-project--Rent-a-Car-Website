import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

function ThreeScene() {
  const canvasRef = useRef(null);
  const carRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 10);
    scene.add(light);

    const loader = new FBXLoader();
    loader.load(
     '/carFbx.fbx', 
      function (car) {
        carRef.current = car;
        scene.add(car);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    const animate = function () {
      requestAnimationFrame(animate);

      if (carRef.current) {
        carRef.current.rotation.x += 0.01;
        carRef.current.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <canvas ref={canvasRef} />;
}

export default ThreeScene;
