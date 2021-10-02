import React, { useEffect, useRef } from 'react'

import { Center } from '../../utils/styles'
import { Wrapper, ScrollNotice } from './styles'
import MouseIcon from './MouseIcon'

function Overlay({ loaded, ready, clicked, setClicked, videoLoaded }) {
  const scrollNoticeRef = useRef(null)

  useEffect(() => {
    if (ready) {
      setTimeout(() => {
        scrollNoticeRef.current.style.opacity = '0.8'
      }, 1000)
    }
  }, [ready])

  useEffect(() => {
    const onScroll = () => {
      setTimeout(() => {
        scrollNoticeRef.current.style.opacity = '0'
        window.removeEventListener('scroll', onScroll)
      }, 1000)
    }
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Wrapper>
      <div
        className={`fullscreen bg ${
          ready && loaded && videoLoaded ? 'ready' : 'notready'
        } ${clicked && 'clicked'}`}
      >
        <div onClick={() => ready && setClicked(true)}>
          {!loaded ? 'loading' : 'click to continue'}
        </div>
      </div>
      {ready && (
        <ScrollNotice ref={scrollNoticeRef}>
          <Center>
            <MouseIcon />
            <p>Scrollen...</p>
          </Center>
        </ScrollNotice>
      )}
    </Wrapper>
  )
}

export default Overlay
