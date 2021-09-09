import React from "react"

function Overlay({ loaded, ready, clicked, setClicked, videoLoaded }) {
  return (
    <>
      <div style={{ position: "fixed", bottom: "80px" }}>
        <div
          className={`fullscreen bg ${
            ready && loaded && videoLoaded ? "ready" : "notready"
          } ${clicked && "clicked"}`}
        >
          <div onClick={() => ready && setClicked(true)}>
            {!loaded ? "loading" : "click to continue"}
          </div>
        </div>
        {/* <Footer
          date="28. January"
          year="2021"
          link1={<a href="https://github.com/pmndrs/drei">pmndrs/drei</a>}
          link2={<a href="https://codesandbox.io/s/drei-reflector-bfplr">s/drei-reflector-bfplr</a>}
        /> */}
      </div>
    </>
  )
}

export default Overlay
