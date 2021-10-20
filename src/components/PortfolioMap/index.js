import * as THREE from 'three'
import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { MapControls, useTexture } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'
import { isBrowser } from '@emotion/utils'
import { isMobileSafari } from 'react-device-detect'

import { DisableRender } from '../../utils/styles'
import { useOnScreen } from '../../utils/hooks'
import { Wrapper, Overlay } from './styles'

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

function PortfolioMap() {
  const [down, setDown] = useState(false)
  const [name, setName] = useState(null)
  const wrapperRef = useRef()
  const visible = useOnScreen(wrapperRef)

  useEffect(
    () => void (document.body.style.cursor = down ? `grabbing` : `grab`),
    [down]
  )

  const { rotation } = useSpring({
    rotation: visible ? THREE.MathUtils.degToRad(-8) : 0,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  })

  useEffect(() => console.log(visible), [visible])

  return (
    <Wrapper
      ref={wrapperRef}
      onPointerDown={() => setDown(true)}
      onPointerUp={() => setDown(false)}
    >
      <Overlay>{name}</Overlay>
      <Canvas
        orthographic
        frameloop="always"
        dpr={Math.max(isBrowser ? window.devicePixelRatio : 0, 2)}
        pixelRatio={[1, 1.5]}
        camera={{ position: [0, 0, 1], zoom: 4, up: [0, 0, 1], far: 10000 }}
      >
        {!visible && <DisableRender />}
        <Suspense fallback={null}>
          <a.group
            position={[0, 40, 0]}
            // change this scale based on screen size
            scale={[1, 1, 1]}
            rotation-z={rotation}
          >
            <Card
              img="/lws_3-2.jpg"
              position={[-135, 0, 0]}
              name="Lightweight System"
              setName={setName}
            />
            <Card
              img="/huwat_3-2.jpg"
              position={[0, 0, 0]}
              name="Huwat"
              setName={setName}
            />
            <Card
              img="/lucinski_3-2.jpg"
              position={[135, 0, 0]}
              name="Lucinski"
              setName={setName}
            />
            <Card
              img="/kleine-eismanufaktur_3-2.jpg"
              videoSrc="/sequenz.mp4"
              position={[-135, -95, 0]}
              name="Kleine Eismanufaktur"
              setName={setName}
            />
            <Card
              img="/nureinberg_3-2.jpg"
              position={[0, -95, 0]}
              name="NurEinBerg"
              setName={setName}
            />
          </a.group>
        </Suspense>
        <MapControls enableZoom={false} enableRotate={false} />
      </Canvas>
    </Wrapper>
  )
}

export default PortfolioMap
