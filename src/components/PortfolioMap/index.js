import * as THREE from 'three'
import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { MapControls, OrbitControls } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'
import { isBrowser } from '@emotion/utils'
import { isMobileSafari } from 'react-device-detect'

import { breakpoints, DisableRender } from '../../utils/styles'
import { useOnScreen, useWindowDimensions } from '../../utils/hooks'
import { Wrapper, Overlay } from './styles'
import Card from './Card'

const Controls = () => {
  const { camera } = useThree()
  const controlsRef = useRef()
  const { width } = useWindowDimensions()

  const limitDown = width > breakpoints.m ? -200 : -66
  const limitUp = width > breakpoints.m ? 100 : 33
  const limitLeft = width > breakpoints.m ? -300 : -200
  const limitRight = width > breakpoints.m ? 300 : 200

  useEffect(() => {
    controlsRef.current.addEventListener('change', function () {
      // negative is how much you can pan down
      if (this.target.y < limitDown) {
        this.target.y = limitDown
        camera.position.y = limitDown
      } else if (this.target.y > limitUp) {
        this.target.y = limitUp
        camera.position.y = limitUp
      } else if (this.target.x < limitLeft) {
        this.target.x = limitLeft
        camera.position.x = limitLeft
      } else if (this.target.x > limitRight) {
        this.target.x = limitRight
        camera.position.x = limitRight
      }
    })
  }, [])

  return (
    <MapControls ref={controlsRef} enableZoom={false} enableRotate={false} />
  )
}

function PortfolioMap() {
  const [down, setDown] = useState(false)
  const [name, setName] = useState(null)
  const wrapperRef = useRef()
  const visible = useOnScreen(wrapperRef)
  const { width } = useWindowDimensions()

  let scale = [1, 1, 1]

  if (width > breakpoints.xl) {
    scale = [3, 3, 3]
  } else if (width > breakpoints.l) {
    scale = [2, 2, 2]
  } else if (width > breakpoints.m) {
    scale = [1.5, 1.5, 1.5]
  } else if (width < breakpoints.s) {
    scale = [1, 1, 1]
  }

  useEffect(
    () => void (document.body.style.cursor = down ? `grabbing` : `grab`),
    [down]
  )
  const changeCursor = () =>
    void (document.body.style.cursor = down ? `grabbing` : `grab`)

  const { rotation } = useSpring({
    rotation: visible ? THREE.MathUtils.degToRad(-8) : 0,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  })

  return (
    <Wrapper
      ref={wrapperRef}
      onPointerDown={() => setDown(true)}
      onPointerUp={() => setDown(false)}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
      onPointerOver={() => (document.body.style.cursor = 'grab')}
    >
      <Overlay>{name}</Overlay>
      <Canvas
        orthographic
        frameloop="demand"
        dpr={Math.max(isBrowser ? window.devicePixelRatio : 0, 2)}
        pixelRatio={[1, 1.5]}
        camera={{ position: [0, 0, 1], zoom: 4, up: [0, 0, 1], far: 10000 }}
      >
        {!visible && <DisableRender />}
        <Suspense fallback={null}>
          <a.group
            position={[0, 40, 0]}
            // change this scale based on screen size
            scale={width > breakpoints.l ? [2, 2, 2] : [1, 1, 1]}
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
        <Controls />
      </Canvas>
    </Wrapper>
  )
}

export default PortfolioMap
