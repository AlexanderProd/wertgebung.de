import React from 'react'
import { Reflector, useTexture } from '@react-three/drei'

import surfaceImperfections from '../../images/SurfaceImperfections003_1K_var1.jpg'
import surfaceImperfections_Normal from '../../images/SurfaceImperfections003_1K_Normal.jpg'

function Ground({ width = 20, length = 10, ...props }) {
  const [floor, normal] = useTexture([
    surfaceImperfections,
    surfaceImperfections_Normal,
  ])
  return (
    <Reflector
      resolution={512}
      args={[width, length]}
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

export default Ground
