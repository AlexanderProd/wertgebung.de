import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import gsap from 'gsap'

import Logo from './Logo'
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
        <Logo />
      </LogoWrapper>
    </Wrapper>
  )
}

export default LoadingScreen
