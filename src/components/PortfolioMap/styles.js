import styled from '@emotion/styled'

import { breakpoints } from '../../utils/styles'

export const Wrapper = styled.div`
  width: 100vw;
  height: 80vh;
  position: relative;
`

export const Overlay = styled.div`
  z-index: 10;
  position: absolute;
  top: 0;
  right: 0;
  width: 10%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${breakpoints.l}px) {
    right: 0;
    bottom: 0;
    width: 100%;
    height: 20%;
  }
`
