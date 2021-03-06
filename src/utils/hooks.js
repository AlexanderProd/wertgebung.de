import { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  function getWindowDimensions() {
    if (typeof window !== 'undefined') {
      const { innerWidth: width, innerHeight: height } = window
      return {
        width,
        height,
      }
    }
    // fallback for headless build process
    return {
      width: 1920,
      height: 1080,
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

export const useOnScreen = (ref, rootMargin = '0px') => {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting)
      },
      {
        rootMargin,
      }
    )
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting
}

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          socialLinks {
            name
            link
          }
        }
      }
    }
  `)
  return site.siteMetadata
}

export const useInViewportAnimation = () =>
  useEffect(() => {
    const targets = []

    const inViewport = (entries, observer) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting && !targets.find(elem => elem === target)) {
          target.classList.remove('hidden')
          target.classList.toggle('is-inViewport', isIntersecting)
          targets.push(target)
        }
      })
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    }
    const Observer = new IntersectionObserver(inViewport, options)

    const elementsInViewport = document.querySelectorAll('[data-inviewport]')
    elementsInViewport.forEach(elem => Observer.observe(elem))
  }, [])
