import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useGLTF, MeshReflectorMaterial, BakeShadows, Text, useTexture } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import { easing } from 'maath'
import { suspend } from 'suspend-react'
import { Instances, Computers } from './Computers'
import { Suspense, useMemo, useRef, useState } from 'react'
import { Headphones } from './Synth'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { Environment, OrbitControls, useFBX } from '@react-three/drei'
import { MeshStandardMaterial } from 'three'
import * as THREE from 'three'
import { TextureLoader } from 'three'

// const suzi = import('@pmndrs/assets/models/bunny.glb')

export default function App() {
  const dpr = Math.min(window.devicePixelRatio, 1.5)

  return (
    <Canvas shadows dpr={dpr} camera={{ position: [-1.5, 1, 5.5], fov: 45, near: 1, far: 20 }} eventSource={document.getElementById('root')} eventPrefix="client">
      {/* Lights */}
      <color attach="background" args={['black']} />
      <hemisphereLight intensity={0.3} groundColor="black" />

      <spotLight position={[10, 20, 10]} angle={0.12} penumbra={1} intensity={1} castShadow shadow-mapSize={1024} />
      {/* Main scene */}
      <group position={[-0, -1, 0]}>
        {/* Auto-instanced sketchfab model */}
        <Instances>
          <Computers scale={0.5} />
        </Instances>
        {/* Plane reflections + distance blur */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 30]}
            resolution={1024}
            mixBlur={1}
            mixStrength={80}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#202020"
            metalness={0.8}
          />
        </mesh>
        {/* Bunny and a light give it more realism */}
        <Bun scale={0.4} position={[0, 0.3, 0.5]} />
        <Pom />

        {/* <SmallSynth /> */}
        <pointLight distance={1.5} intensity={3} position={[-0.15, 0.7, 0]} color="orange" />
      </group>
      {/* Postprocessing */}
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={3} />
        <DepthOfField target={[0, 0, 13]} focalLength={0.3} bokehScale={1} height={700} />
      </EffectComposer>

      <Headphone />
      <SmallSynth />
      <DJ />
      <Speaker />
      {/* <Insta />
      <Spotify /> */}
      <Spotify />
      <Soundcloud />
      <Instagram />

      {/* Camera movements */}
      <CameraRig />
      {/* Small helper that freezes the shadows for better performance */}
      <BakeShadows />
    </Canvas>
  )
}

// function TestCube() {
//   // Create a reference to the mesh
//   const meshRef = useRef()

//   // Use the useFrame hook to rotate the cube
//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.rotation.x += 0.01
//       meshRef.current.rotation.y += 0.01
//     }
//   })

//   return (
//     <mesh ref={meshRef} position={[0, 0, 0]}>
//       <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
//       <meshStandardMaterial attach="material" color="orange" />
//     </mesh>
//   )
// }

function Spotify() {
  const meshRef = useRef()
  const texture = useLoader(THREE.TextureLoader, '/spotifymaterial.png')
  const [hovered, setHovered] = useState(false)

  const handleClick = () => {
    window.open('https://open.spotify.com/artist/5jzHLYqmqCN50yBbYoK2hx', '_blank')
  }

  const onHover = (e) => {
    setHovered(true)
    document.body.style.cursor = 'pointer'
  }

  const onUnhover = (e) => {
    setHovered(false)
    document.body.style.cursor = 'default'
  }

  const roundedBoxGeometry = useMemo(() => {
    const width = 0.3 // Width of the box
    const height = 0.3 // Height of the box
    const depth = 0.03 // Depth of the box
    const radius = 0.03 // Radius for the edges

    texture.offset.set(0.5, 0.5) // Adjust these values to change the position
    texture.repeat.set(3, 3)

    const shape = new THREE.Shape()
    shape.moveTo(-width / 2 + radius, -height / 2)
    shape.lineTo(width / 2 - radius, -height / 2)
    shape.absarc(width / 2 - radius, -height / 2 + radius, radius, Math.PI * 1.5, 0, false)
    shape.lineTo(width / 2, height / 2 - radius)
    shape.absarc(width / 2 - radius, height / 2 - radius, radius, 0, Math.PI * 0.5, false)
    shape.lineTo(-width / 2 + radius, height / 2)
    shape.absarc(-width / 2 + radius, height / 2 - radius, radius, Math.PI * 0.5, Math.PI, false)
    shape.lineTo(-width / 2, -height / 2 + radius)
    shape.absarc(-width / 2 + radius, -height / 2 + radius, radius, Math.PI, Math.PI * 1.5, false)

    const extrudeSettings = {
      depth: depth,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: radius,
      bevelThickness: radius
    }

    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])

  return (
    <mesh
      ref={meshRef}
      position={[-0.6, -0.65, 0.9]}
      geometry={roundedBoxGeometry}
      onClick={handleClick}
      onPointerOver={onHover}
      onPointerOut={onUnhover}
      material-emissive={hovered ? new THREE.Color(0x333333) : new THREE.Color(0x000000)}>
      <meshStandardMaterial attach="material" map={texture} />
    </mesh>
  )
}

function Instagram() {
  const meshRef = useRef()
  const texture = useLoader(THREE.TextureLoader, '/instagram.png')
  const [hovered, setHovered] = useState(false)

  const handleClick = () => {
    window.open('https://instagram.com/nzxaudio', '_blank')
  }

  const onHover = (e) => {
    setHovered(true)
    document.body.style.cursor = 'pointer'
  }

  const onUnhover = (e) => {
    setHovered(false)
    document.body.style.cursor = 'default'
  }

  const roundedBoxGeometry = useMemo(() => {
    const width = 0.3 // Width of the box
    const height = 0.3 // Height of the box
    const depth = 0.03 // Depth of the box
    const radius = 0.03 // Radius for the edges

    texture.offset.set(0.5, 0.5) // Adjust these values to change the position
    texture.repeat.set(3, 3)

    const shape = new THREE.Shape()
    shape.moveTo(-width / 2 + radius, -height / 2)
    shape.lineTo(width / 2 - radius, -height / 2)
    shape.absarc(width / 2 - radius, -height / 2 + radius, radius, Math.PI * 1.5, 0, false)
    shape.lineTo(width / 2, height / 2 - radius)
    shape.absarc(width / 2 - radius, height / 2 - radius, radius, 0, Math.PI * 0.5, false)
    shape.lineTo(-width / 2 + radius, height / 2)
    shape.absarc(-width / 2 + radius, height / 2 - radius, radius, Math.PI * 0.5, Math.PI, false)
    shape.lineTo(-width / 2, -height / 2 + radius)
    shape.absarc(-width / 2 + radius, -height / 2 + radius, radius, Math.PI, Math.PI * 1.5, false)

    const extrudeSettings = {
      depth: depth,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: radius,
      bevelThickness: radius
    }

    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])

  return (
    <mesh
      ref={meshRef}
      position={[0.6, -0.65, 0.9]}
      geometry={roundedBoxGeometry}
      onClick={handleClick}
      onPointerOver={onHover}
      onPointerOut={onUnhover}
      material-emissive={hovered ? new THREE.Color(0x333333) : new THREE.Color(0x000000)}>
      <meshStandardMaterial attach="material" map={texture} />
    </mesh>
  )
}

function Soundcloud() {
  const meshRef = useRef()
  const texture = useLoader(THREE.TextureLoader, '/soundcloud.png')
  const [hovered, setHovered] = useState(false)

  const handleClick = () => {
    window.open('https://soundcloud.com/nzxmusic', '_blank')
  }

  const onHover = (e) => {
    setHovered(true)
    document.body.style.cursor = 'pointer'
  }

  const onUnhover = (e) => {
    setHovered(false)
    document.body.style.cursor = 'default'
  }

  const roundedBoxGeometry = useMemo(() => {
    const width = 0.3 // Width of the box
    const height = 0.3 // Height of the box
    const depth = 0.03 // Depth of the box
    const radius = 0.03 // Radius for the edges

    texture.offset.set(0.5, 0.5) // Adjust these values to change the position
    texture.repeat.set(3, 3)

    const shape = new THREE.Shape()
    shape.moveTo(-width / 2 + radius, -height / 2)
    shape.lineTo(width / 2 - radius, -height / 2)
    shape.absarc(width / 2 - radius, -height / 2 + radius, radius, Math.PI * 1.5, 0, false)
    shape.lineTo(width / 2, height / 2 - radius)
    shape.absarc(width / 2 - radius, height / 2 - radius, radius, 0, Math.PI * 0.5, false)
    shape.lineTo(-width / 2 + radius, height / 2)
    shape.absarc(-width / 2 + radius, height / 2 - radius, radius, Math.PI * 0.5, Math.PI, false)
    shape.lineTo(-width / 2, -height / 2 + radius)
    shape.absarc(-width / 2 + radius, -height / 2 + radius, radius, Math.PI, Math.PI * 1.5, false)

    const extrudeSettings = {
      depth: depth,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: radius,
      bevelThickness: radius
    }

    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])

  return (
    <mesh
      ref={meshRef}
      position={[0, -0.65, 0.9]}
      geometry={roundedBoxGeometry}
      onClick={handleClick}
      onPointerOver={onHover}
      onPointerOut={onUnhover}
      material-emissive={hovered ? new THREE.Color(0x333333) : new THREE.Color(0x000000)}>
      <meshStandardMaterial attach="material" map={texture} />
    </mesh>
  )
}

const handleClick = (event) => {
  // Handle the click event
  console.log('NZX text clicked')
  window.open('https://open.spotify.com/artist/5jzHLYqmqCN50yBbYoK2hx')
}

function Bun(props) {
  const socialsPosition = [0, 0.3, 0.5] // Adjust this as needed
  const musicPosition = [0, 0.8, 0.5] // Adjust this to position 'SOCIALS' above 'MUSIC'

  const [hoverMusic, setHoverMusic] = useState(false)
  const [hoverSocials, setHoverSocials] = useState(false)

  const onHoverMusic = () => {
    document.body.style.cursor = 'pointer'
    document.body.style.fontSize = '40px'

    setHoverMusic(true)
  }

  const onUnhoverMusic = () => {
    document.body.style.cursor = 'default'
    setHoverMusic(false)
  }

  const onHoverSocials = () => {
    document.body.style.cursor = 'pointer'

    setHoverSocials(true)
  }

  const onUnhoverSocials = () => {
    document.body.style.cursor = 'default'
    setHoverSocials(false)
  }

  return (
    <>
      {/* <Text
        color={hoverMusic ? '#ffb293' : '#FFFFFF'} // Change color on hover
        fontSize={0.4}
        font="/Inter-Medium.woff"
        anchorX="center"
        anchorY="middle"
        onPointerDown={handleClick}
        onPointerOver={onHoverMusic}
        onPointerOut={onUnhoverMusic}
        position={musicPosition}>
        music
      </Text> */}
      {/* <Text
        color={hoverSocials ? '#ffb293' : '#FFFFFF'} // Change color on hover
        fontSize={0.3}
        font="/Inter-Medium.woff"
        anchorX="center"
        anchorY="middle"
        onPointerDown={handleClick}
        onPointerOver={onHoverSocials}
        onPointerOut={onUnhoverSocials}
        position={socialsPosition}>
        socials
      </Text> */}
    </>
  )
}

function CameraRig() {
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [-1 + (state.pointer.x * state.viewport.width) / 3, (1 + state.pointer.y) / 2, 5.5], 0.5, delta)
    state.camera.lookAt(0, 0, 0)
  })
}

function Pom() {
  const Scene = () => {
    const fbx = useFBX('Synthesizer.fbx')

    // No need to traverse and apply materials. The original materials will be used.

    return <primitive object={fbx} scale={0.003} position={[-2, 0, 2]} />
  }

  return (
    <Suspense fallback={null}>
      <Scene />
      {/* <OrbitControls /> */}
      {/* <Environment preset="night" background /> */}
    </Suspense>
  )
}

function Insta() {
  const handleClick = () => {
    window.open('https://instagram.com/nzxaudio')
  }

  const Scene = () => {
    const fbx = useFBX('instagram.fbx')

    const texture = useTexture('/instagram.png') // Replace with the path to your texture file

    // Traverse and apply materials to the meshes
    fbx.traverse((child) => {
      if (child.isMesh) {
        // Create a new MeshStandardMaterial with the texture
        child.material = new MeshStandardMaterial({
          map: texture // The color map texture
          // Set other material properties as needed
        })
      }
    })

    // No need to traverse and apply materials. The original materials will be used.

    return <primitive object={fbx} scale={0.001} position={[-0.6, -1, 1]} onPointerDown={handleClick} />
  }

  return (
    <Suspense fallback={null}>
      <Scene />
      {/* <OrbitControls /> */}
      {/* <Environment preset="night" background /> */}
    </Suspense>
  )
}

// function Spotify() {
//   const Scene = () => {
//     const fbx = useFBX('spotify.fbx')

//     const texture = useTexture('/spotifymaterial.png') // Replace with the path to your texture file

//     // Traverse and apply materials to the meshes
//     fbx.traverse((child) => {
//       if (child.isMesh) {
//         // Create a new MeshStandardMaterial with the texture
//         child.material = new MeshStandardMaterial({
//           map: texture // The color map texture
//           // Set other material properties as needed
//         })
//       }
//     })

//     // No need to traverse and apply materials. The original materials will be used.

//     return <primitive object={fbx} scale={0.001} position={[0, -1, 1]} />
//   }

//   return (
//     <Suspense fallback={null}>
//       <Scene />
//       {/* <OrbitControls /> */}
//       {/* <Environment preset="night" background /> */}
//     </Suspense>
//   )
// }

function Speaker() {
  const Scene = () => {
    const fbx = useFBX('SpeakerWhite.fbx')
    const texture = useTexture('/wstexture.jpg') // Replace with the path to your texture file

    // Traverse and apply materials to the meshes
    fbx.traverse((child) => {
      if (child.isMesh) {
        // Create a new MeshStandardMaterial with the texture
        child.material = new MeshStandardMaterial({
          map: texture // The color map texture
          // Set other material properties as needed
        })
      }
    })

    return <primitive object={fbx} scale={0.001} position={[2, -1, 1.6]} />
  }

  return (
    <Suspense fallback={null}>
      <Scene />
      {/* OrbitControls, Environment, etc. */}
    </Suspense>
  )
}

function DJ() {
  const Scene = () => {
    const fbx = useFBX('Pioneer.fbx')
    const textures = useTexture({
      map: '/Mixer_DefaultMaterial_AlbedoTransparency.png', // Diffuse map with an alpha channel for transparency
      emissiveMap: '/Mixer_DefaultMaterial_Emission.png', // Emissive map for self-illumination
      normalMap: '/Mixer_DefaultMaterial_Normal.png', // Normal map for surface details
      roughnessMap: '/Mixer_DefaultMaterial_SpecularSmoothness.png' // Specular and Smoothness map
    })

    // Traverse and apply materials to the meshes
    fbx.traverse((child) => {
      if (child.isMesh) {
        // Create a new MeshStandardMaterial with the textures
        child.material = new MeshStandardMaterial({
          map: textures.map,
          emissiveMap: textures.emissiveMap,
          normalMap: textures.normalMap,
          // Since MeshStandardMaterial does not use specular maps directly,
          // you can use the alpha channel of the albedo map as roughness
          roughnessMap: textures.roughnessMap,
          emissive: new THREE.Color(0xffffff),
          transparent: true // Set transparency to true if your albedo map contains an alpha channel
          // Other material properties
        })
        // Adjust roughness and metalness or any other property as needed
        child.material.roughness = 1.0 - textures.roughnessMap // Invert roughness if necessary
        child.material.metalness = 0 // Set metalness to 0 if not using metalnessMap
      }
    })

    return <primitive object={fbx} scale={0.0018} position={[0.8, -0.85, -0.4]} rotation={[0, -2.1, -0.4]} />
  }

  return (
    <Suspense fallback={null}>
      <Scene />
      {/* OrbitControls, Environment, etc. */}
    </Suspense>
  )
}

function SmallSynth() {
  const Scene = () => {
    const fbx = useFBX('RGBS.fbx')

    // No need to traverse and apply materials. The original materials will be used.

    const material = new MeshStandardMaterial({
      color: 'grey', // Set your desired color
      metalness: 0.5, // Adjust metalness
      roughness: 0.5 // Adjust roughness
      // ... other material properties
    })

    // Traverse the model and apply material to each mesh
    fbx.traverse((child) => {
      if (child.isMesh) {
        child.material = material
      }
    })

    return <primitive object={fbx} scale={1} position={[-1, -1, 0.3]} rotation={[4.6, 0, 0.8]} />
  }

  return (
    <Suspense fallback={null}>
      <Scene />
      {/* <OrbitControls /> */}
      {/* <Environment preset="night" background /> */}
    </Suspense>
  )
}

function Headphone() {
  const Scene = () => {
    const fbx = useFBX('Scarlett.fbx')

    const textures = useTexture({
      map: '/Scarlett solo_2_Base_color.png',
      emissiveMap: '/Scarlett solo_2_Emissive.png',
      displacementMap: '/Scarlett solo_2_Height.png',
      aoMap: '/Scarlett solo_2_Mixed_AO.png',
      normalMap: '/Scarlett solo_2_Normal.png',
      roughnessMap: '/Scarlett solo_2_Roughness.png',
      metalnessMap: '/Scarlett solo_2_Metallic.png'
    })

    // Adjust the material properties if needed
    fbx.traverse((child) => {
      if (child.isMesh) {
        // Replace the material with a MeshStandardMaterial
        child.material = new MeshStandardMaterial({
          map: textures.map,
          emissiveMap: textures.emissiveMap,
          displacementMap: textures.displacementMap,
          aoMap: textures.aoMap,
          normalMap: textures.normalMap,
          roughnessMap: textures.roughnessMap,
          metalnessMap: textures.metalnessMap,
          emissive: new THREE.Color(0xffffff),
          displacementScale: 0.1 // You might need to adjust this value
        })
      }
    })

    return <primitive object={fbx} scale={0.015} position={[0.1, 0.65, -1.3]} rotation={[0, 0, 0]} />
  }

  return (
    <Suspense fallback={null}>
      <Scene />
      {/* Other components */}
    </Suspense>
  )
}
