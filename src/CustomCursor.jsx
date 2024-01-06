import React, { useEffect, useRef } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX, clientY } = e
      const mouseX = clientX
      const mouseY = clientY

      cursorRef.current.style.left = `${mouseX}px`
      cursorRef.current.style.top = `${mouseY}px`
    }

    document.addEventListener('mousemove', moveCursor)

    return () => {
      document.removeEventListener('mousemove', moveCursor)
    }
  }, [])

  return (
    <div className="cursor" ref={cursorRef}>
      <div className="cursor__ball cursor__ball--big">
        <svg height="30" width="30">
          <circle cx="15" cy="15" r="12"></circle>
        </svg>
      </div>
      <div className="cursor__ball cursor__ball--small">
        <svg height="10" width="10">
          <circle cx="5" cy="5" r="4"></circle>
        </svg>
      </div>
    </div>
  )
}
