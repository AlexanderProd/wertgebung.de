import * as THREE from 'three'
import React, { useState, useEffect } from 'react'
import { Text } from '@react-three/drei'
import { isMobileSafari } from 'react-device-detect'

import { useWindowDimensions } from '../../utils/hooks'

function VideoText({ position, videoLoaded, setVideoLoaded }) {
  const { width } = useWindowDimensions()

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

  return (
    <Text
      font="/Inter-Bold.woff"
      fontSize={width < 425 ? 0.4 : 1}
      maxWidth={width < 425 ? 2 : 5}
      letterSpacing={-0.06}
      lineHeight={0.8}
      position={position}
    >
      Design &amp; Technologie
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

export default VideoText
