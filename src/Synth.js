import { useGLTF } from '@react-three/drei'

function Synthesizer(props) {
  const { nodes, materials } = useGLTF('/music_cassette.glb')

  // Using 'Object_2' as an example. Adjust based on the specific object you need
  const meshNode = nodes.Object_2

  if (!meshNode) {
    console.error('Desired node not found in GLTF model')
    return null // Handle the error as needed
  }

  return (
    <group {...props}>
      <mesh geometry={meshNode.geometry} material={materials.Music_Cassette} />
    </group>
  )
}

export function Headphones() {
  return (
    <>
      <Synthesizer position={[0.3, 0.1, 0.2]} rotation={[0.1, 0.1, 0.1]} scale={3} />
      {/* ... other components of your scene ... */}
    </>
  )
}
