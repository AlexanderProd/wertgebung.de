import React, { useEffect, useRef } from "react"
import styled from "@emotion/styled"

const Scroll = styled.div`
  height: 100vh;
  width: 100%;
  background-color: blue;
  overflow: scroll;
`

const Scroll2 = styled.div`
  height: 400vh;
  width: 100%;
  background-color: green;
  overflow: scroll;
`

const PageTwo = () => {
  const scrollRef = useRef(0)
  useEffect(() => {
    const onScroll = e => {
      const scrollProgress =
        e.target.documentElement.scrollTop.toFixed(0) /
        scrollRef.current.scrollHeight
      const clamped = Math.max(0, Math.min(scrollProgress, 1))
      console.log(clamped)
    }
    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div>
      <Scroll ref={scrollRef}></Scroll>
      <Scroll2></Scroll2>
    </div>
  )
}

export default PageTwo
