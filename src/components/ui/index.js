import React, { useState, useEffect } from 'react'

export const Delayed = ({ children, delay = 500 }) => {
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsShown(true)
    }, delay)
  }, [delay])

  return isShown ? children : null
}
