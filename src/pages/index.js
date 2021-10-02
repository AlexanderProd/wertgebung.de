import * as THREE from 'three'
import styled from '@emotion/styled'
import React, { Suspense, useEffect, useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Reflector, useTexture, useProgress } from '@react-three/drei'
import './styles.css'

import { Center } from '../utils/styles'
import Overlay from '../components/Overlay'
import Opener from '../components/Opener'
import VideoText from '../components/VideoText'

const MainWrapper = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  z-index: 20;
  width: 100%;
`

const ScrollDiv = styled.div`
  width: 100%;
  min-height: 400vh;
`

const Main = styled.main`
  display: flex;
  height: 100vh;
  width: 100%;
  margin-top: 100vh;
  justify-content: center;
  align-items: center;
`

function Ground(props) {
  const [floor, normal] = useTexture([
    '/SurfaceImperfections003_1K_var1.jpg',
    '/SurfaceImperfections003_1K_Normal.jpg',
  ])
  return (
    <Reflector
      resolution={512}
      args={[20, 10]}
      mirror={0.4}
      mixBlur={8}
      mixStrength={1}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      blur={[400, 100]}
      {...props}
    >
      {(Material, props) => (
        <Material
          color="#a0a0a0"
          metalness={0.4}
          roughnessMap={floor}
          normalMap={normal}
          normalScale={[1, 1]}
          {...props}
        />
      )}
    </Reflector>
  )
}

function Intro({ start, scrollProgress }) {
  const [vec] = useState(() => new THREE.Vector3())

  return useFrame(state => {
    if (start) {
      state.camera.position.lerp(
        vec.set(0, 0, THREE.MathUtils.lerp(16, 0, scrollProgress.current)),
        0.05
      )
      state.camera.lookAt(0, 0, -2)
    }
  })
}

const DisableRender = () => useFrame(() => null, 1000)

function IndexPage() {
  const [clicked, setClicked] = useState(true)
  const [ready, setReady] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const { loaded, progress } = useProgress()
  const scrollProgress = useRef(0)
  const scrollDivRef = useRef(null)

  const store = {
    loaded,
    progress,
    clicked,
    setClicked,
    ready,
    setReady,
    videoLoaded,
    setVideoLoaded,
    scrollProgress,
  }

  useEffect(() => {
    const onScroll = e => {
      scrollProgress.current =
        e.target.documentElement.scrollTop.toFixed(0) /
        scrollDivRef.current.scrollHeight

      scrollProgress.current = Math.max(0, Math.min(scrollProgress.current, 1))
    }
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Opener {...store} />
      <Overlay {...store} />

      <Canvas
        concurrent
        gl={{ alpha: false }}
        pixelRatio={[1, 1.5]}
        camera={{ position: [0, 3, 100], fov: 15 }}
        style={{ position: 'fixed' }}
      >
        {/* !canvasVisible && <DisableRender /> */}
        <color attach="background" args={['black']} />
        <fog attach="fog" args={['black', 15, 20]} />
        <Suspense fallback={null}>
          <group position={[0, -1, 0]}>
            {/* <VideoBackground {...store} position={[0, 1.5, 0]} /> */}
            <VideoText {...store} position={[0, 1, 0]} />
            <Ground position={[0, 0, 7]} />
          </group>
          <ambientLight intensity={0.5} />
          <spotLight position={[0, 10, 0]} intensity={0.3} />
          <directionalLight position={[-20, 0, -10]} intensity={0.7} />
          <Intro start={ready} set={setReady} scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>

      <MainWrapper>
        <ScrollDiv ref={scrollDivRef}></ScrollDiv>
        <Main>
          <Center>
            <h1>Site under Construction</h1>
            <h2>More content coming soon</h2>
          </Center>
        </Main>
      </MainWrapper>
    </>
  )
}

export default IndexPage
