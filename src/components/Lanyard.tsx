import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { MeshLineGeometry, MeshLineMaterial, raycast } from 'meshline'
import { Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import * as THREE from 'three'
import { useGLTF, useTexture, Environment } from '@react-three/drei'

extend({ MeshLineGeometry, MeshLineMaterial })

function Band() {
  const bandRef = useRef<THREE.Mesh>(null!)
  const fixed = useRef<any>()
  const j1 = useRef<any>()
  const j2 = useRef<any>()
  const j3 = useRef<any>()
  const card = useRef<any>()
  const { width, height } = useThree((s) => s.size)
  const [curve] = useState(() =>
    new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  )
  const [dragged, setDrag] = useState<THREE.Vector3 | false>(false)

  useFrame((state) => {
    if (dragged) {
      const vec = new THREE.Vector3()
      const dir = new THREE.Vector3()
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      })
    }
    curve.points[0].copy(j3.current.translation())
    curve.points[1].copy(j2.current.translation())
    curve.points[2].copy(j1.current.translation())
    curve.points[3].copy(fixed.current.translation())
    bandRef.current.geometry.setPoints(curve.getPoints(32))
  })

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]])

  const gltf = useGLTF('/assets/card.glb')
  const tex = useTexture('/assets/lanyard.png')

  return (
    <>
      <RigidBody ref={fixed} type="fixed" />
      {[j1, j2, j3].map((ref, i) => (
        <RigidBody key={i} ref={ref} position={[i + 0.5, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.05]} />
            <meshStandardMaterial color="white" />
          </mesh>
        </RigidBody>
      ))}
      <RigidBody
        ref={card}
        position={[2, 0, 0]}
        type={dragged ? 'kinematicPosition' : 'dynamic'}
        onPointerDown={(e) => {
          e.target.setPointerCapture(e.pointerId)
          const p = new THREE.Vector3().copy(e.point).sub(card.current.translation())
          setDrag(p)
        }}
        onPointerUp={(e) => {
          e.target.releasePointerCapture(e.pointerId)
          setDrag(false)
        }}
      >
        <primitive object={gltf.scene} />
      </RigidBody>
      <mesh ref={bandRef} raycast={raycast}>
        <meshLineGeometry points={curve.getPoints(32).flatMap((v) => [v.x, v.y, v.z])} />
        <meshLineMaterial
          transparent
          depthTest={false}
          lineWidth={0.05}
          color="#ffffff"
          resolution={new THREE.Vector2(width, height)}
        />
      </mesh>
    </>
  )
}

export default function Lanyard(props: any) {
  return (
    <Canvas camera={{ position: props.position, fov: 20 }} style={{ background: 'transparent' }}>
      <ambientLight intensity={1} />
      <Environment preset="sunset" background={false} />
      <Physics gravity={props.gravity}>
        <Band />
      </Physics>
    </Canvas>
  )
}
