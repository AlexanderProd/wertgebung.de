import styled from '@emotion/styled'

import { breakpoints } from '../../utils/styles'

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`

export const Overlay = styled.div`
  z-index: 10;
  position: absolute;
  bottom: 100px;
  right: 100px;
  color: white;

  @media (max-width: ${breakpoints.l}px) {
    right: 0;
    bottom: 0;
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
  }
`
