import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

import Ground from '../../components/Ground'
import VideoText from '../../components/VideoText'
import { Delayed } from '../../utils/styles'

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

function Header() {
  useEffect(() => {
    const onScroll = e => {
      scrollProgress.current =
        e.target.documentElement.scrollTop.toFixed(0) /
        scrollRef.current.scrollHeight

      scrollProgress.current = Math.max(0, Math.min(scrollProgress.current, 1))
    }
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const mainIsVisible = useOnScreen(mainRef, '-500px')

  return (
    <Canvas
      concurrent
      gl={{ alpha: false }}
      pixelRatio={[1, 1.5]}
      camera={{ position: [0, 3, 100], fov: 15 }}
      style={{ position: 'fixed' }}
    >
      {mainIsVisible && (
        <Delayed delay={2000}>
          <DisableRender />
        </Delayed>
      )}
      <color attach="background" args={['black']} />
      <fog attach="fog" args={['black', 15, 20]} />
      <Suspense fallback={null}>
        <group position={[0, -1, 0]}>
          <VideoText {...store} position={[0, 1, 0]} />
          <Ground position={[0, 0, 7]} />
        </group>
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 10, 0]} intensity={0.3} />
        <directionalLight position={[-20, 0, -10]} intensity={0.7} />
        <Intro start={ready} set={setReady} scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  )
}

export default Header
