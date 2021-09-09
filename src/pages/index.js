import * as THREE from "three"
import styled from "@emotion/styled"
import React, { Suspense, useEffect, useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  Reflector,
  Text,
  Plane,
  useTexture,
  useProgress,
} from "@react-three/drei"
import { isMobileSafari } from "react-device-detect"
import "./styles.css"

import { useWindowDimensions } from "../utils/hooks"
import Overlay from "../components/Overlay"
import Opener from "../components/Opener"

const OnTop = styled.div`
  position: absolute;
  z-index: 20;
  top: 0;
  left: 0;
`

const ScrollDiv = styled.div`
  min-height: 400vh;
`

function VideoText({ position, videoLoaded, setVideoLoaded }) {
  const { width } = useWindowDimensions()

  const [video] = useState(() => {
    const loadedDataHandler = ({ target }) => {
      if (target.readyState >= 2) {
        setVideoLoaded(true)
      }
    }

    if (isMobileSafari) {
      const elem = document.createElement("video")
      elem.setAttribute("src", "/sequenz.mp4")
      elem.setAttribute("loop", "")
      elem.setAttribute("muted", "")
      elem.setAttribute("autoplay", "")
      elem.setAttribute("playsinline", "")
      elem.setAttribute("type", "video/mp4")
      elem.setAttribute("preload", "metadata")
      elem.setAttribute("crossOrigin", "Anonymous")

      elem.addEventListener("loadeddata", loadedDataHandler)

      return elem
    } else {
      const elem = Object.assign(document.createElement("video"), {
        src: "/sequenz.mp4",
        crossOrigin: "Anonymous",
        loop: true,
        muted: true,
        autoplay: true,
        playsinline: true,
        preload: "metadata",
      })
      elem.addEventListener("loadeddata", loadedDataHandler)

      return elem
    }
  })
  useEffect(() => void video.play(), [video])
  return (
    <Text
      font="/Inter-Bold.woff"
      fontSize={width < 425 ? 0.4 : 1}
      maxWidth={width < 425 ? 2 : 5}
      letterSpacing={-0.06}
      lineHeight={0.8}
      position={position}
    >
      Design &amp; Technology
      <meshBasicMaterial
        //color={0x000}
        toneMapped={false}
      >
        <videoTexture
          attach="map"
          args={[video]}
          encoding={THREE.sRGBEncoding}
        />
      </meshBasicMaterial>
    </Text>
  )
}

function VideoBackground({ position, setVideoLoaded }) {
  const [video] = useState(() => {
    const loadedDataHandler = ({ target }) => {
      if (target.readyState >= 2) {
        setVideoLoaded(true)
      }
    }

    if (isMobileSafari) {
      const elem = document.createElement("video")
      elem.setAttribute("src", "/sequenz.mp4")
      elem.setAttribute("loop", "")
      elem.setAttribute("muted", "")
      elem.setAttribute("autoplay", "")
      elem.setAttribute("playsinline", "")
      elem.setAttribute("type", "video/mp4")
      elem.setAttribute("preload", "metadata")
      elem.setAttribute("crossOrigin", "Anonymous")

      elem.addEventListener("loadeddata", loadedDataHandler)

      return elem
    } else {
      const elem = Object.assign(document.createElement("video"), {
        src: "/sequenz.mp4",
        crossOrigin: "Anonymous",
        loop: true,
        muted: true,
        autoplay: true,
        playsinline: true,
        preload: "metadata",
      })
      elem.addEventListener("loadeddata", loadedDataHandler)

      return elem
    }
  })
  useEffect(() => void video.play(), [video])
  const [alphaMap] = useTexture(["/alpha-map.jpg"])

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

function Ground(props) {
  const [floor, normal] = useTexture([
    "/SurfaceImperfections003_1K_var1.jpg",
    "/SurfaceImperfections003_1K_Normal.jpg",
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

function Intro({ start, set, scrollProgress }) {
  const [vec] = useState(() => new THREE.Vector3())
  //useEffect(() => setTimeout(() => set(true), 4000), [])
  return useFrame(state => {
    if (start) {
      state.camera.position.lerp(
        vec.set(0, 0.25, THREE.MathUtils.lerp(16, 0, scrollProgress.current)),
        0.05
      )
      state.camera.lookAt(0, 0.25, -2)
    }
  })
}

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
    const maxScrollY =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight
    const threshold = 0.5 // 1 means the scroll div must be scrolled away completely.
    const onScroll = e => {
      scrollProgress.current =
        e.target.documentElement.scrollTop.toFixed(0) /
        scrollDivRef.current.scrollHeight
      console.log(scrollProgress.current)
    }
    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <OnTop>
        <ScrollDiv ref={scrollDivRef}></ScrollDiv>
        <div>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
          kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
          amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit
          esse molestie consequat, vel illum dolore eu feugiat nulla facilisis
          at vero eros et accumsan et iusto odio dignissim qui blandit praesent
          luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat, vel illum dolore eu feugiat nulla facilisis at
          vero eros et accumsan et iusto odio dignissim qui blandit praesent
          luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
          Nam liber tempor cum soluta nobis eleifend option congue nihil
          imperdiet doming id quod mazim placerat facer possim assum. Lorem
          ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
          nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
          Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper
          suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem
          vel eum iriure dolor in hendrerit in vulputate velit esse molestie
          consequat, vel illum dolore eu feugiat nulla facilisis. At vero eos et
          accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
          no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
          dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
          tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
          voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
          dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
          elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos
          erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea
          et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero
          voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
          consetetur
        </div>
      </OnTop>
      <Opener {...store} />
      <Canvas
        concurrent
        gl={{ alpha: false }}
        pixelRatio={[1, 1.5]}
        camera={{ position: [0, 3, 100], fov: 15 }}
        style={{ position: "fixed" }}
      >
        <color attach="background" args={["black"]} />
        <fog attach="fog" args={["black", 15, 20]} />
        <Suspense fallback={null}>
          <group position={[0, -1, 0]}>
            <VideoBackground {...store} position={[0, 1.5, 0]} />
            {/* <VideoText {...store} position={[0, 1, 0]} /> */}
            <Ground position={[0, 0, 7]} />
          </group>
          <ambientLight intensity={0.5} />
          <spotLight position={[0, 10, 0]} intensity={0.3} />
          <directionalLight position={[-20, 0, -10]} intensity={0.7} />
          <Intro start={ready} set={setReady} scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
      <Overlay {...store} />
    </>
  )
}

export default IndexPage
