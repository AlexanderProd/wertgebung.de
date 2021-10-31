import * as THREE from 'three'
import React, { useState, useEffect } from 'react'
import { Text } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'

import { useWindowDimensions } from '../../utils/hooks'
import { breakpoints } from '../../utils/styles'

const StyledText = ({ children, position, animated = false }) => {
  const { opacity } = useSpring({
    loop: true,
    to: [{ opacity: 0.05 }, { opacity: 1 }],
    from: { opacity: 1 },
    config: {
      mass: 1,
      tension: 48,
      friction: 2,
      precision: 0.01,
    },
  })

  return (
    <Text
      font="/Inter-Bold.woff"
      fontSize={1}
      maxWidth={5}
      letterSpacing={-0.06}
      position={position}
      lineHeight={0.8}
    >
      {children}
      <a.meshBasicMaterial
        opacity={animated ? opacity : 1}
        color={0xfff7f8}
        toneMapped={false}
      />
    </Text>
  )
}

function VideoText({ position }) {
  const { width } = useWindowDimensions()

  let scale = [1, 1, 1]

  if (width > breakpoints.xl) {
    scale = [1, 1, 1]
  } else if (width > breakpoints.l) {
    scale = [0.5, 0.5, 0.5]
  } else if (width >= breakpoints.m) {
    scale = [0.3, 0.3, 0.3]
  } else if (width < breakpoints.s) {
    scale = [0.2, 0.2, 0.2]
  }

  return (
    <group position={position} scale={scale}>
      <StyledText position={[-2, 0, 0]}>WER</StyledText>
      <StyledText position={[0, 0, 0]} animated={true}>
        TGE
      </StyledText>
      <StyledText position={[2.25, 0, 0]}>BUNG</StyledText>
    </group>
  )
}

export default VideoText
