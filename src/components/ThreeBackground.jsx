import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Particles
    const COUNT = 2000;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const velocities = [];

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const isCyan = i < COUNT * 0.6;
      if (isCyan) {
        colors[i * 3] = 0.1; colors[i * 3 + 1] = 0.7 + Math.random() * 0.3; colors[i * 3 + 2] = 1;
      } else if (i < COUNT * 0.85) {
        colors[i * 3] = 0.2 + Math.random() * 0.2; colors[i * 3 + 1] = 0.3 + Math.random() * 0.2; colors[i * 3 + 2] = 1;
      } else {
        colors[i * 3] = 0.8 + Math.random() * 0.2; colors[i * 3 + 1] = 0.8 + Math.random() * 0.2; colors[i * 3 + 2] = 1;
      }

      velocities.push({ x: (Math.random() - 0.5) * 0.002, y: (Math.random() - 0.5) * 0.002 });
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.055, vertexColors: true, transparent: true,
      opacity: 0.75, blending: THREE.AdditiveBlending, sizeAttenuation: true,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Wireframe shapes
    const shapes = [
      { geo: new THREE.IcosahedronGeometry(1.1, 0), color: 0x38bdf8, pos: [-5, 1.5, -3] },
      { geo: new THREE.OctahedronGeometry(0.8, 0),  color: 0x6366f1, pos: [5, -1,   -3] },
      { geo: new THREE.TetrahedronGeometry(0.7, 0), color: 0x38bdf8, pos: [0, -3,   -2] },
    ];
    const meshes = shapes.map(({ geo: g, color, pos }) => {
      const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.1 }));
      m.position.set(...pos);
      scene.add(m);
      return m;
    });

    let mouseX = 0, mouseY = 0;
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    document.addEventListener("mousemove", onMouse);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    let t = 0, animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.006;

      const pos = geo.attributes.position.array;
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3]     += velocities[i].x;
        pos[i * 3 + 1] += velocities[i].y;
        if (pos[i * 3] > 11)  pos[i * 3] = -11;
        if (pos[i * 3] < -11) pos[i * 3] = 11;
        if (pos[i * 3 + 1] > 7)  pos[i * 3 + 1] = -7;
        if (pos[i * 3 + 1] < -7) pos[i * 3 + 1] = 7;
      }
      geo.attributes.position.needsUpdate = true;

      particles.rotation.y = mouseX * 0.06 + t * 0.035;
      particles.rotation.x = mouseY * 0.03;

      meshes.forEach((m, i) => {
        m.rotation.x += 0.003 + i * 0.001;
        m.rotation.y += 0.005 + i * 0.001;
        m.position.y = shapes[i].pos[1] + Math.sin(t + i * 2) * 0.4;
      });

      camera.position.x += (mouseX * 0.25 - camera.position.x) * 0.04;
      camera.position.y += (mouseY * 0.15 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ zIndex: 0, opacity: 0.85 }}
    />
  );
}
