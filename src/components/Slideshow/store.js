import { createRef } from 'react'
import slides from './slides.json'

const state = {
  sections: slides.length,
  pages: slides.length,
  zoom: 75,
  ref: createRef(),
  top: createRef(),
}

export default state
