import React, { useState, useEffect } from 'react'
import styles from './SecondaryCursor.module.css'

const SecondaryCursor = () => {
  const [mainCursorPosition, setMainCursorPosition] = useState({ x: 0, y: 0 })
  const [secondaryCursorPosition, setSecondaryCursorPosition] = useState({
    x: 0,
    y: 0
  })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMainCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    // Add a delay (e.g., 100 milliseconds) for the secondary cursor
    const delay = 100

    const interpolatePosition = (currentPos, targetPos, t) => {
      return {
        x: currentPos.x + (targetPos.x - currentPos.x) * t,
        y: currentPos.y + (targetPos.y - currentPos.y) * t
      }
    }

    let currentPos = { ...secondaryCursorPosition }
    const startTime = Date.now()
    const endTime = startTime + delay

    const updateCursorPosition = () => {
      const currentTime = Date.now()
      const t = (currentTime - startTime) / (endTime - startTime)

      if (t < 1) {
        currentPos = interpolatePosition(secondaryCursorPosition, mainCursorPosition, t)
        setSecondaryCursorPosition(currentPos)
        requestAnimationFrame(updateCursorPosition)
      } else {
        setSecondaryCursorPosition(mainCursorPosition)
      }
    }

    updateCursorPosition()

    return () => {}
  }, [mainCursorPosition])

  return (
    <div
      className={styles['secondary-cursor']}
      style={{
        left: secondaryCursorPosition.x,
        top: secondaryCursorPosition.y
      }}></div>
  )
}

export default SecondaryCursor
