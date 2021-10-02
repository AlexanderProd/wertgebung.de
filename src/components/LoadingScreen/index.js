import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import gsap from 'gsap'

import './styles.css'

const GreyBar = styled.div`
  height: ${({ i }) =>
    i <= 1 ? '50%' : i <= 3 ? '40%' : i <= 5 ? '30%' : '20%'};
  z-index: ${({ i }) => `${30 + i}`};
  ${({ topOrBottom }) => (topOrBottom === 'top' ? 'top: 0;' : 'bottom: 0;')};
  position: absolute;
  width: 100%;
  background-color: ${({ i }) =>
    i <= 1 ? '#444' : i <= 3 ? '#333' : i <= 5 ? '#222' : '#111'};
`

const Wrapper = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  position: absolute;
`

const LogoWrapper = styled.div`
  left: 0;
  bottom: 25%;
  padding-left: 2rem;
  padding-right: 2rem;
  width: 100%;
  position: absolute;
`

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function LoadingScreen({ videoLoaded, setReady }) {
  //const [firstAnimationDone, setFirstAnimationDone] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline()
    tl.to('.grey-bars .top', {
      duration: 1,
      height: 0,
      stagger: 0.02,
      ease: 'none',
    })
    tl.to(
      '.grey-bars .bottom',
      {
        duration: 1,
        height: 0,
        stagger: 0.02,
        ease: 'none',
      },
      0
    )
    tl.from(
      'svg#Logo path',
      {
        duration: 1,
        y: 100,
        stagger: 0.05,
        ease: 'power2.in',
      },
      0
    )
  }, [])

  useEffect(() => {
    ;(async () => {
      while (!videoLoaded) {
        await sleep(500)
      }

      await sleep(1000)

      await gsap
        .to('svg#Logo path', {
          duration: 1,
          y: -100,
          stagger: 0.05,
          ease: 'power2.out',
        })
        .eventCallback('onComplete', () => setReady(true))
    })()
  }, [videoLoaded])

  return (
    <Wrapper>
      <div className="grey-bars">
        {Array(8)
          .fill('')
          .map((_, i) => (
            <GreyBar
              className={i % 2 === 0 ? 'top' : 'bottom'}
              topOrBottom={i % 2 === 0 ? 'top' : 'bottom'}
              i={i}
              key={i}
            />
          ))}
      </div>
      <LogoWrapper>
        <svg
          id="Logo"
          data-name="Ebene 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 543 55.2"
          width="100%"
          fill="white"
        >
          <path
            d="M36.6,17.6,27.3,54.2h-12L0,.9H12.7l9.4,38.6L32.2.9h8.9L51.2,39.5,60.5.9H73.3L58.1,54.2H46Z"
            transform="translate(0 0)"
          />
          <path
            d="M78.6.9h37.8v9.8H90V22.3h25.8V32H90V44.4h26.4v9.8H78.6Z"
            transform="translate(0 0)"
          />
          <path
            d="M145,35.1h-8.3V54.2H125.3V.9h25c11.1,0,17.9,7.3,17.9,17.2,0,9.4-5.9,14.5-11.7,15.8l12,20.3h-13Zm3.6-24.5H136.7V25.3h11.9c4.6,0,8-2.9,8-7.4S153.1,10.6,148.6,10.6Z"
            transform="translate(0 0)"
          />
          <path
            d="M188.2,10.9H172.6V.9h42.6v10H199.7V54.3H188.3V10.9Z"
            transform="translate(0 0)"
          />
          <path
            d="M246.4,0c11,0,18,5.4,22.1,11.7l-9.4,5.1a15,15,0,0,0-12.6-6.7c-9.7,0-16.7,7.4-16.7,17.5s7,17.5,16.7,17.5A17.77,17.77,0,0,0,258,41V34.5H243.8V24.7h25.4V45.1a29.43,29.43,0,0,1-22.7,10.1c-15.6,0-28.4-10.9-28.4-27.7S230.8,0,246.4,0Z"
            transform="translate(0 0)"
          />
          <path
            d="M278.2.9H316v9.8H289.6V22.3h25.8V32H289.6V44.4H316v9.8H278.2Z"
            transform="translate(0 0)"
          />
          <path
            d="M324.8.9h28.1c10.2,0,15.4,6.5,15.4,13.6,0,6.7-4.2,11.2-9.2,12.2,5.7.9,10.2,6.4,10.2,13.1,0,8-5.4,14.4-15.5,14.4h-29Zm25.6,21.4c3.8,0,6.2-2.5,6.2-5.9s-2.4-5.8-6.2-5.8H336.2V22.4h14.2Zm.4,22.3c4.3,0,6.9-2.5,6.9-6.3,0-3.4-2.4-6.2-6.9-6.2H336.2V44.7h14.6Z"
            transform="translate(0 0)"
          />
          <path
            d="M377.8.9h11.5V32.6c0,7.4,4.1,12.6,12.4,12.6s12.2-5.1,12.2-12.6V.9h11.5v32c0,13.3-7.6,22.3-23.8,22.3S377.7,46.1,377.7,33V.9Z"
            transform="translate(0 0)"
          />
          <path
            d="M447.4,18.4V54.2H436V.9h11.7l24.7,34.6V.9h11.4V54.3h-11Z"
            transform="translate(0 0)"
          />
          <path
            d="M520.2,0c11,0,18,5.4,22.1,11.7l-9.4,5.1a15,15,0,0,0-12.6-6.7c-9.7,0-16.7,7.4-16.7,17.5s7,17.5,16.7,17.5A17.77,17.77,0,0,0,531.8,41V34.5H517.6V24.7H543V45.1a29.43,29.43,0,0,1-22.7,10.1c-15.6,0-28.4-10.9-28.4-27.7S504.6,0,520.2,0Z"
            transform="translate(0 0)"
          />
        </svg>
      </LogoWrapper>
    </Wrapper>
  )
}

export default LoadingScreen
