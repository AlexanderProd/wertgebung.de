import styled from '@emotion/styled'

export const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  z-index: 30;
  bottom: 2rem;
  animation-name: fade-in;
  animation-duration: 2s;
`

export const ScrollNotice = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
  transition: opacity 1s;

  p {
    font-size: 1.45rem;
  }
`
