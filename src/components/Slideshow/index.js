import * as THREE from 'three'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, invalidate, useFrame } from '@react-three/fiber'
import { Text, Loader, Shadow } from '@react-three/drei'
import { isBrowser } from '@emotion/utils'

import { Wrapper, Scroll, ScrollWrapper } from './styles'
import { Block, useBlock } from './blocks'
import Ground from '../Ground'
import Plane from './Plane'
import state from './store'
import slides from './slides.json'

function Image({ slide: { imgSrc, videoSrc, name, url } }) {
  const ref = useRef()
  const { contentMaxWidth: w, viewportWidth, offsetFactor } = useBlock()
  useFrame(() => {
    const scrollOffset =
      state.top.current / (viewportWidth * state.pages - viewportWidth) +
      1 / state.pages / 2
    const scale =
      1 - (offsetFactor - scrollOffset) * (offsetFactor > scrollOffset ? 1 : -1)
    ref.current.scale.setScalar(scale)
  })

  const [hovered, set] = useState(false)
  useEffect(
    () => void (document.body.style.cursor = hovered ? `pointer` : `auto`),
    [hovered]
  )

  return (
    <group
      ref={ref}
      onClick={() => window.open(url, '_blank').focus()}
      onPointerOver={() => set(true)}
      onPointerOut={() => set(false)}
    >
      <Plane
        imgSrc={imgSrc}
        videoSrc={videoSrc}
        hovered={hovered}
        args={[1, 1, 32, 32]}
        aspect={1.7}
        scale={[w, w / 1.7, 1]}
        frustumCulled={false}
      />
      <Text
        anchorX="left"
        position={[-w / 2, w / 1.3 / 2 - 0.25, 0]}
        scale={3}
        color="white"
      >
        {name}
      </Text>
      <Shadow
        scale={[w * 1.2, 1, 1]}
        rotation={[0.75, 0, 0]}
        position={[0, -w / 2, 0]}
      />
    </group>
  )
}

function Slider(props) {
  return slides.map((slide, index) => (
    <Block key={index} factor={1} offset={index} {...props}>
      <Image key={index} slide={slide} />
    </Block>
  ))
}

function Sliedshow() {
  const scrollRef = useRef()

  const onScroll = e => {
    state.top.current = e.target.scrollLeft
    invalidate()
  }
  /* const onWheel = e => {
    e.preventDefault()
    scrollRef.current.scrollLeft += e.deltaY
    invalidate()
  } */
  useEffect(
    () => void onScroll({ target: (state.ref = scrollRef.current) }),
    []
  )

  useEffect(() => {
    scrollRef.current.addEventListener(
      'wheel',
      e => {
        const { scrollLeft } = scrollRef.current

        if (scrollLeft > 0 && scrollLeft < 2048) e.preventDefault()
        scrollRef.current.scrollLeft += e.deltaY
        invalidate()
      },
      { passive: false }
    )
  }, [])

  return (
    <Wrapper>
      <Canvas
        frameloop="demand"
        concurrent
        gl={{ alpha: false }}
        dpr={Math.max(isBrowser ? window.devicePixelRatio : 0, 2)}
        pixelRatio={[1, 1.5]}
        camera={{ position: [0, 3, 35], fov: 15 }}
        raycaster={{
          computeOffsets: ({ offsetX, offsetY }) => ({
            offsetX: offsetX - scrollRef.current.scrollLeft,
            offsetY,
          }),
        }}
        onCreated={state => state.events.connect(scrollRef.current)}
      >
        <color attach="background" args={['black']} />
        <Suspense fallback={null}>
          <Slider />
          <Ground width={25} length={50} position={[0, -3, 7]} />
          <ambientLight intensity={0.5} />
          <spotLight position={[0, 10, 0]} intensity={0.3} />
          <directionalLight position={[-20, 0, -10]} intensity={0.7} />
        </Suspense>
      </Canvas>
      <Scroll ref={scrollRef} onScroll={onScroll}>
        <div
          style={{
            height: '100vh',
            width: `${
              (slides.length % 2 === 0 ? slides.length - 1 : slides.length) *
              100
            }vw`,
          }}
        />
      </Scroll>
      <Loader />
    </Wrapper>
  )
}

export default Sliedshow
