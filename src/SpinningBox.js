import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, useCursor } from '@react-three/drei'

export function SpinningBox({ scale, ...props }) {
  // This reference gives us direct access to the THREE object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useCursor(hovered)
  // Subscribe this component to the render-loop, rotate the text every frame
  useFrame((state, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta
  })
  // Return the view, these are regular Three.js elements expressed in JSX
  return (
    <Text
      {...props}
      ref={ref}
      scale={1}
      color="white"
      fontSize={0.5}
      font="/Inter-Medium.woff" // Path to the font file
      anchorX="center"
      anchorY="middle">
      NZX
    </Text>
  )
}
