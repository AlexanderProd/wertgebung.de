import * as THREE from 'three'
import React, { useState, useEffect } from 'react'
import { useTexture } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'
import { isMobileSafari } from 'react-device-detect'

const CARD_WIDTH = 120
const CARD_HEIGHT = 80

function Card({ position, img, videoSrc, name, setName }) {
  const [hovered, set] = useState(false)
  const [video] = useState(() => {
    if (isMobileSafari) {
      const elem = document.createElement('video')
      elem.setAttribute('src', videoSrc)
      elem.setAttribute('loop', '')
      elem.setAttribute('muted', '')
      elem.setAttribute('autoplay', '')
      elem.setAttribute('playsinline', '')
      elem.setAttribute('type', 'video/mp4')
      elem.setAttribute('preload', 'metadata')
      elem.setAttribute('crossOrigin', 'Anonymous')

      return elem
    } else {
      const elem = Object.assign(document.createElement('video'), {
        src: videoSrc,
        crossOrigin: 'Anonymous',
        loop: true,
        muted: true,
        autoplay: true,
        playsinline: true,
        preload: 'metadata',
      })

      return elem
    }
  })

  useEffect(() => {
    if (videoSrc) video.play()
  }, [video])

  const { scale, opacity } = useSpring({
    scale: hovered ? 1.05 : 1,
    opacity: hovered ? (videoSrc ? 0 : 1) : 0.5,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  })

  const map = useTexture(img)

  return (
    <group
      position={position}
      onPointerOver={() => {
        set(true)
        setName(name)
      }}
      onPointerOut={() => {
        set(false)
        setName(null)
      }}
    >
      <a.mesh scale-x={scale} scale-y={scale}>
        <planeBufferGeometry args={[CARD_WIDTH, CARD_HEIGHT]} />
        <a.meshBasicMaterial map={map} opacity={opacity} transparent />
      </a.mesh>
      {hovered && videoSrc && (
        <a.mesh scale-x={scale} scale-y={scale}>
          <planeBufferGeometry args={[CARD_WIDTH, CARD_HEIGHT]} />
          <meshBasicMaterial toneMapped={false} transparent={false}>
            <videoTexture
              attach="map"
              args={[video]}
              encoding={THREE.sRGBEncoding}
            />
          </meshBasicMaterial>
        </a.mesh>
      )}
    </group>
  )
}

export default Card
