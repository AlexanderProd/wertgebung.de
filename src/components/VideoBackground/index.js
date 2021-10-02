import * as THREE from 'three'
import React, { useState, useEffect } from 'react'
import { Plane } from '@react-three/drei'
import { isMobileSafari } from 'react-device-detect'

function VideoBackground({ position, setVideoLoaded }) {
  const [video] = useState(() => {
    const loadedDataHandler = ({ target }) => {
      if (target.readyState >= 2) {
        setVideoLoaded(true)
      }
    }

    if (isMobileSafari) {
      const elem = document.createElement('video')
      elem.setAttribute('src', '/sequenz.mp4')
      elem.setAttribute('loop', '')
      elem.setAttribute('muted', '')
      elem.setAttribute('autoplay', '')
      elem.setAttribute('playsinline', '')
      elem.setAttribute('type', 'video/mp4')
      elem.setAttribute('preload', 'metadata')
      elem.setAttribute('crossOrigin', 'Anonymous')

      elem.addEventListener('loadeddata', loadedDataHandler)

      return elem
    } else {
      const elem = Object.assign(document.createElement('video'), {
        src: '/sequenz.mp4',
        crossOrigin: 'Anonymous',
        loop: true,
        muted: true,
        autoplay: true,
        playsinline: true,
        preload: 'metadata',
      })
      elem.addEventListener('loadeddata', loadedDataHandler)

      return elem
    }
  })
  useEffect(() => void video.play(), [video])
  const [alphaMap] = useTexture(['/alpha-map.jpg'])

  return (
    <Plane args={[5, 2.8]} position={position}>
      <meshBasicMaterial
        toneMapped={false}
        alphaMap={alphaMap}
        transparent={true}
      >
        <videoTexture
          attach="map"
          args={[video]}
          encoding={THREE.sRGBEncoding}
        />
      </meshBasicMaterial>
    </Plane>
  )
}
