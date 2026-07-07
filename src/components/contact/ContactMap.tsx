"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import MapPoints from './MapPoints';

const ContactMap = () => {
  return (
    <div className="w-full h-screen sticky top-0 overflow-hidden z-10">
      <Canvas
        camera={{ position: [0, 0, 500], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <MapPoints />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ContactMap;