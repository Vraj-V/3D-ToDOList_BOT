'use client';
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';

function RobotModel() {
  const glb = useGLTF('/robot.glb'); // robot.glb must be inside /public folder
  return <primitive object={glb.scene} scale={1.5} />;
}

export default function Robot360View() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="robot-3d-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div className="robot-tooltip">
          🤖 Hi there! Ready to crush tasks?
        </div>
      )}
      <Canvas camera={{ position: [0, 1, 5] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} />
        <Environment preset="sunset" />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        <RobotModel />
      </Canvas>
    </div>
  );
}
