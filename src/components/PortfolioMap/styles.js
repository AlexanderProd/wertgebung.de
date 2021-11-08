import styled from '@emotion/styled'

import { breakpoints, space } from '../../utils/styles'

export const Wrapper = styled.div`
  width: 100vw;
  height: 80vh;
  position: relative;
`

export const Overlay = styled.div`
  z-index: 10;
  position: absolute;
  top: 30%;
  right: 0;
  width: auto;
  max-width: 25%;
  height: auto;
  color: white;
  display: flex;
  align-items: flex-end;
  text-align: right;
  flex-direction: column;
  padding: 0 ${space[6]};
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);

  @media (max-width: ${breakpoints.l}px) {
    right: 0;
    bottom: 0;
    width: 100%;
    height: 20%;
  }
`
