import styled from '@emotion/styled'
import { Link } from 'gatsby'

import { breakpoints, space } from '../../utils/styles'

export const Wrapper = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${space[12]};
  padding-bottom: ${space[6]};

  @media (max-width: ${breakpoints.s}px) {
    display: flex;
    flex-direction: column;

    & > * {
      margin-top: ${space[10]};
    }

    &:first-child {
      margin-top: 0px;
    }
  }
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;

  @media (max-width: ${breakpoints.s}px) {
    display: block;
    margin-bottom: ${space[2]};
    align-items: center;
  }
`

export const Item = styled(Link)`
  color: ${({ color }) => (color ? color : 'black')};
  line-height: 1.563;
  font-size: 16px;
  text-decoration: none;
  margin-bottom: 0.25rem;
`

export const SocialMediaLinks = styled.ul`
  list-style: none outside;
  margin: 0;
  padding: 0;

  li {
    display: flex;
    align-items: center;
    line-height: 1.563;
    margin-bottom: 0.25rem;
  }

  a {
    color: ${({ color }) => (color ? color : 'black')};
    text-decoration: none;
    margin-left: 5px;
  }

  @media (max-width: ${breakpoints.s}px) {
    margin-top: ${space[10]};
  }
`

export const Cards = styled.div`
  text-align: right;

  svg {
    ${({ color }) => (color ? color : 'black')};
    margin-left: 0.5rem;
  }

  @media (max-width: ${breakpoints.s}px) {
    text-align: center;
  }
`
