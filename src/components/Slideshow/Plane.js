import * as THREE from 'three'
import React, { forwardRef, useState, useEffect } from 'react'
import { useTexture } from '@react-three/drei'
import './CustomMaterial'

export default forwardRef(
  (
    {
      color = 'white',
      opacity = 1,
      args,
      videoSrc,
      imgSrc = '/00.jpg',
      hovered,
      ...props
    },
    ref
  ) => {
    const map = useTexture(imgSrc)
    const [video] = useState(() =>
      videoSrc
        ? Object.assign(document.createElement('video'), {
            src: '/drei.mp4',
            crossOrigin: 'Anonymous',
            loop: true,
            muted: true,
          })
        : null
    )
    useEffect(
      () => (void hovered ? video?.play() : video?.pause()),
      [hovered, video]
    )

    return (
      <mesh ref={ref} {...props}>
        <planeGeometry args={args} />
        {/* meshBasicMaterial */}
        <customMaterial
          color={color}
          map={map}
          map-minFilter={THREE.LinearFilter}
          transparent
          opacity={opacity}
        />
      </mesh>
    )
  }
)
