import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const particlesRef = useRef<THREE.Group>();
  const geometricShapesRef = useRef<THREE.Group>();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup with enhanced lighting
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x8B5CF6, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x06D6A0, 0.6, 100);
    pointLight1.position.set(-50, 50, 50);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xFFD23F, 0.6, 100);
    pointLight2.position.set(50, -50, 50);
    scene.add(pointLight2);

    // Create enhanced floating particles with multiple colors
    const particlesGroup = new THREE.Group();
    const particlesCount = 300;
    
    // Create multiple particle systems with different colors
    const colors = [0x8B5CF6, 0x06D6A0, 0xFFD23F, 0xEE6C4D, 0x3A86FF];
    colors.forEach((color, index) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array((particlesCount / colors.length) * 3);
      const velocities = new Float32Array((particlesCount / colors.length) * 3);
      const sizes = new Float32Array(particlesCount / colors.length);

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] = (Math.random() - 0.5) * 40;
        positions[i + 1] = (Math.random() - 0.5) * 40;
        positions[i + 2] = (Math.random() - 0.5) * 40;

        velocities[i] = (Math.random() - 0.5) * 0.03;
        velocities[i + 1] = (Math.random() - 0.5) * 0.03;
        velocities[i + 2] = (Math.random() - 0.5) * 0.03;
        
        sizes[i / 3] = Math.random() * 2 + 0.5;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.PointsMaterial({
        color: color,
        size: 2,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const particles = new THREE.Points(geometry, material);
      particlesGroup.add(particles);
    });

    scene.add(particlesGroup);
    particlesRef.current = particlesGroup;

    // Create floating geometric shapes
    const geometricShapes = new THREE.Group();
    
    // Add various 3D shapes
    const shapes = [
      { geo: new THREE.OctahedronGeometry(1), color: 0x8B5CF6 },
      { geo: new THREE.TetrahedronGeometry(1.2), color: 0x06D6A0 },
      { geo: new THREE.IcosahedronGeometry(0.8), color: 0xFFD23F },
      { geo: new THREE.DodecahedronGeometry(0.9), color: 0xEE6C4D },
      { geo: new THREE.ConeGeometry(0.8, 1.5, 8), color: 0x3A86FF },
    ];

    shapes.forEach((shape, index) => {
      const material = new THREE.MeshPhongMaterial({
        color: shape.color,
        transparent: true,
        opacity: 0.3,
        shininess: 100,
      });
      
      const mesh = new THREE.Mesh(shape.geo, material);
      mesh.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      
      geometricShapes.add(mesh);
    });

    scene.add(geometricShapes);
    geometricShapesRef.current = geometricShapes;

    camera.position.z = 15;

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Enhanced animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Animate particles
      if (particlesGroup) {
        particlesGroup.rotation.x += 0.001;
        particlesGroup.rotation.y += 0.002;

        particlesGroup.children.forEach((particles: any) => {
          const positions = particles.geometry.attributes.position.array;
          const velocities = particles.geometry.attributes.velocity.array;

          for (let i = 0; i < positions.length; i += 3) {
            positions[i] += velocities[i];
            positions[i + 1] += velocities[i + 1];
            positions[i + 2] += velocities[i + 2];

            // Create wave motion
            positions[i + 1] += Math.sin(elapsedTime + positions[i] * 0.1) * 0.01;

            // Wrap around edges
            if (Math.abs(positions[i]) > 20) velocities[i] *= -1;
            if (Math.abs(positions[i + 1]) > 20) velocities[i + 1] *= -1;
            if (Math.abs(positions[i + 2]) > 20) velocities[i + 2] *= -1;
          }

          particles.geometry.attributes.position.needsUpdate = true;
        });
      }

      // Animate geometric shapes
      if (geometricShapes) {
        geometricShapes.children.forEach((shape: any, index) => {
          shape.rotation.x += 0.01 + index * 0.002;
          shape.rotation.y += 0.008 + index * 0.001;
          shape.rotation.z += 0.005 + index * 0.0015;
          
          // Floating motion
          shape.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.02;
          
          // Mouse interaction
          const mouseInfluence = 0.02;
          shape.rotation.x += mouseRef.current.y * mouseInfluence;
          shape.rotation.y += mouseRef.current.x * mouseInfluence;
        });
      }

      // Animate lights
      pointLight1.position.x = Math.sin(elapsedTime * 0.5) * 30;
      pointLight1.position.z = Math.cos(elapsedTime * 0.5) * 30;
      
      pointLight2.position.x = Math.cos(elapsedTime * 0.3) * 25;
      pointLight2.position.y = Math.sin(elapsedTime * 0.4) * 20;

      // Camera subtle movement
      camera.position.x = Math.sin(elapsedTime * 0.1) * 2;
      camera.position.y = Math.cos(elapsedTime * 0.15) * 1;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-40 dark:opacity-30"
    />
  );
};

export default ThreeBackground;
