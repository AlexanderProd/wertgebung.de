import { useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import styled from '@emotion/styled'
import { OutboundLink } from 'gatsby-plugin-google-gtag'
import { Link } from 'gatsby'

export const colors = {
  grey: '#C6C6C5',
  darkGrey: '#606060',
  carminePink: '#ec3d44',
  concrete: '#f2f2f2',
}

export const breakpoints = {
  xs: 320,
  s: 576,
  m: 768,
  l: 992,
  xl: 1200,
}

export const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
  '9xl': '8rem',
}

export const fontWeights = {
  hairline: 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
}

export const lineHeights = {
  normal: 'normal',
  none: 1,
  shorter: 1.25,
  short: 1.375,
  base: 1.5,
  tall: 1.625,
  taller: '2',
  3: '.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
}

export const space = {
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
}

export const DisableRender = () => useFrame(() => null, 1000)

export const Delayed = ({ children, delay = 500 }) => {
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsShown(true)
    }, delay)
  }, [delay])

  return isShown ? children : null
}

export const H1 = styled.h1`
  font-size: ${fontSizes['8xl']};

  @media (max-width: ${breakpoints.m}px) {
    font-size: ${fontSizes['6xl']};
  }

  @media (max-width: ${breakpoints.s}px) {
    font-size: ${fontSizes['5xl']};
  }

  @media (max-width: ${breakpoints.xs}px) {
    font-size: ${fontSizes['4xl']};
  }
`

export const H2 = styled.h2`
  font-size: ${fontSizes['6xl']};

  @media (max-width: ${breakpoints.m}px) {
    font-size: ${fontSizes['5xl']};
  }

  @media (max-width: ${breakpoints.s}px) {
    font-size: ${fontSizes['4xl']};
  }

  @media (max-width: ${breakpoints.xs}px) {
    font-size: ${fontSizes['3xl']};
  }
`

export const H3 = styled.h3`
  font-size: ${fontSizes['4xl']};

  @media (max-width: ${breakpoints.m}px) {
    font-size: ${fontSizes['3xl']};
  }

  @media (max-width: ${breakpoints.s}px) {
    font-size: ${fontSizes['2xl']};
  }

  @media (max-width: ${breakpoints.xs}px) {
    font-size: ${fontSizes['xl']};
  }
`

export const H4 = styled.h4`
  font-size: ${fontSizes['3xl']};
  margin: ${space[2]} 0;

  @media (max-width: ${breakpoints.m}px) {
    font-size: ${fontSizes['2xl']};
  }

  @media (max-width: ${breakpoints.s}px) {
    font-size: ${fontSizes['xl']};
  }

  @media (max-width: ${breakpoints.xs}px) {
    font-size: ${fontSizes.lg};
  }
`

export const Center = styled.div`
  text-align: center;
`

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1920px;
  padding: 0 ${space[6]};
`

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ gap }) => (gap ? gap : '2.5rem')};
  grid-auto-flow: row dense;
  ${({ backgroundColor }) =>
    backgroundColor ? `background-color: ${backgroundColor};` : null};

  & > :nth-of-type(4n - 1) {
    grid-column-start: 2;
  }

  @media (max-width: ${breakpoints.l}px) {
    display: block;

    & > * {
      margin-bottom: ${({ gap }) => (gap ? gap : '2.5rem')};
    }

    & > :last-child {
      margin-bottom: 0rem;
    }
  }
`

export const Text = styled.p`
  color: ${({ color }) => (color ? color : colors.concrete)};
  line-height: ${lineHeights.base};
  font-size: ${fontSizes['2xl']};

  @media (max-width: ${breakpoints.s}px) {
    font-size: ${fontSizes.sm};
  }

  @media (max-width: ${breakpoints.m}px) {
    font-size: ${fontSizes.md};
  }
`

export const InternalLink = styled(Link)`
  color: ${({ color }) => (color ? color : 'white')};
  transition: color ease-in-out 0.2s;

  &:hover,
  &:active {
    color: ${colors.carminePink};
  }
`

export const ExternalLink = styled(OutboundLink)`
  color: ${({ color }) => (color ? color : 'white')};
  transition: color ease-in-out 0.2s;

  &:hover,
  &:active {
    color: ${colors.carminePink};
  }
`

export const Button = styled.a`
  position: relative;
  display: inline-block;
  padding: ${space[4]} ${space[8]};
  border: 2px solid white;
  color: white;
  font-size: ${fontSizes.xl};
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  transition: 0.3s;

  &:hover {
    color: black;
  }

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    content: '';
    background: white;
    transition: transform 0.3s;
    transform-origin: left top;
    transform: scale(1, 0);
  }

  &:hover::before {
    transform-origin: left bottom;
    transform: scale(1, 1);
  }

  @media (max-width: ${breakpoints.m}px) {
    font-size: ${fontSizes.lg};
  }

  @media (max-width: ${breakpoints.s}px) {
    padding: ${space[2]} ${space[4]};
    font-size: ${fontSizes.md};
  }

  @media (max-width: ${breakpoints.xs}px) {
    font-size: ${fontSizes.sm};
  }
`
