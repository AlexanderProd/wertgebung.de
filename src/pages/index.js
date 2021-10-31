import * as THREE from 'three'
import styled from '@emotion/styled'
import React, { Suspense, useEffect, useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Loader, useProgress } from '@react-three/drei'
import { StaticImage } from 'gatsby-plugin-image'
import { animated, useSpring } from '@react-spring/web'

import Seo from '../components/seo'
//import Overlay from '../components/Overlay'
//import LoadingScreen from '../components/LoadingScreen'
import Ground from '../components/Ground'
import VideoText from '../components/VideoText'
import PortfolioMap from '../components/PortfolioMap'
import Footer from '../components/Footer'
import { SwipeDownIcon } from '../components/ui/icons'
import {
  useInViewportAnimation,
  useOnScreen,
  useWindowDimensions,
} from '../utils/hooks'
import {
  Container,
  fontSizes,
  TwoColumnGrid,
  Text,
  Delayed,
  DisableRender,
  breakpoints,
} from '../utils/styles'
import './styles.css'

const MainWrapper = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  z-index: 20;
  width: 100%;
`

const Scroll = styled.div`
  width: 100%;
  min-height: 400vh;
`

const Main = styled.main`
  width: 100%;
  margin-top: 100vh;
`

const Headline = styled.h1`
  font-size: ${fontSizes['8xl']};

  @media (max-width: ${breakpoints.m}px) {
    font-size: ${fontSizes['6xl']};
  }

  @media (max-width: ${breakpoints.s}px) {
    font-size: ${fontSizes['5xl']};
  }

  @media (max-width: ${breakpoints.xs}px) {
    font-size: ${fontSizes['4xl']};
  }
`

const Overlay = styled.div`
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 20%;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

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

function IndexPage() {
  const [clicked, setClicked] = useState(true)
  const [ready, setReady] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const { loaded, progress } = useProgress()
  const scrollProgress = useRef(0)
  const scrollRef = useRef(null)
  const mainRef = useRef()
  const mainIsVisible = useOnScreen(mainRef, '-500px')
  const [iconVisible, setIconVisible] = useState(false)
  const { width } = useWindowDimensions()

  useInViewportAnimation()

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

  // Move camera on scroll
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

  // Fade in SwipeDownIcon
  useEffect(() => {
    setTimeout(() => setIconVisible(true), 4000)
  }, [ready])

  // Fade out SwipeDownIcon
  useEffect(() => {
    const onScroll = () => {
      setTimeout(() => {
        setIconVisible(false)
        window.removeEventListener('scroll', onScroll)
      }, 1000)
    }
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const iconStyle = useSpring({ opacity: iconVisible ? 0.8 : 0 })

  return (
    <>
      <Seo title="Design &amp; Technologie" />
      <Overlay>
        <animated.div style={iconStyle}>
          <SwipeDownIcon
            color="white"
            height={width > breakpoints.l ? 60 : 40}
          />
        </animated.div>
      </Overlay>

      <Loader />
      <Canvas
        concurrent
        frameloop="always"
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
          <group position={[0, 0, 0]}>
            <VideoText {...store} position={[0, 0, 0]} />
            <Ground position={[0, -1, 7]} />
          </group>
          <ambientLight intensity={0.5} />
          <spotLight position={[0, 10, 0]} intensity={0.3} />
          <directionalLight position={[-20, 0, -10]} intensity={0.7} />
          <Intro start={ready} set={setReady} scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>

      <MainWrapper>
        <Scroll ref={scrollRef}></Scroll>

        <Main ref={mainRef}>
          <Container>
            <Headline>
              Wir entwickeln innovative Erlebnisse durch das perfekte
              Zusammenspiel von Technologie und Design.
            </Headline>
          </Container>

          <TwoColumnGrid style={{ marginTop: '300px', marginBottom: '300px' }}>
            <Container>
              <Text>
                Hinter WERTGEBUNG stecken Jens Herga und Alexander Hörl.
                Zusammengefunden haben sie schon während ihrer Schulzeit, durch
                Ihr gemeinsames Interesse an Design. Seither bestimmt dieser
                Zusammenschluss die unverkennbare Handschrift von WERTGEBUNG.
              </Text>
            </Container>

            <div data-inviewport="fade-in-right">
              <StaticImage
                src="../images/IMG_0330.jpeg"
                layout="fullWidth"
                alt="Jens Herga &amp; Alexander Hörl"
                loading="lazy"
                objectFit="contain"
              />
            </div>
          </TwoColumnGrid>
          <PortfolioMap />
        </Main>
        <Footer color="white" />
      </MainWrapper>
    </>
  )
}

export default IndexPage
