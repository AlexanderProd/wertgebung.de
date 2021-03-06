import React, { useEffect } from 'react'
import gsap from 'gsap'

const MouseIcon = ({ height = 50 }) => {
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 })
    tl.to('svg#Mouse #Wheel', {
      duration: 1,
      y: -4,
      ease: 'power2.out',
    })
    tl.to('svg#Mouse #Wheel', {
      duration: 1,
      y: 4,
      ease: 'power2.out',
    })
  }, [])

  return (
    <svg id="Mouse" viewBox="0 0 44 72" height={height}>
      <g id="Body">
        <path
          fill="white"
          d="M22,72A22.06,22.06,0,0,1,0,50V22a22,22,0,0,1,44,0V50A22.06,22.06,0,0,1,22,72ZM22,4A18.05,18.05,0,0,0,4,22V50a18,18,0,0,0,36,0V22A18.05,18.05,0,0,0,22,4Z"
        />
      </g>
      <g id="Wheel">
        <path
          fill="white"
          d="M22,25a2,2,0,0,1-2-2V15a2,2,0,0,1,4,0v8A2,2,0,0,1,22,25Z"
        />
      </g>
    </svg>
  )
}

export default MouseIcon
