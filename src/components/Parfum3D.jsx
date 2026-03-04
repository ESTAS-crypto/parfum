import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { useRef } from 'react'

function PerfumeBottle({ scale = 1 }) {
    const groupRef = useRef()

    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.3
        }
    })

    return (
        <group ref={groupRef} scale={[scale, scale, scale]}>
            {/* Main bottle body — dark smoky glass */}
            <mesh position={[0, -0.2, 0]}>
                <cylinderGeometry args={[0.4, 0.48, 1.6, 20]} />
                <meshStandardMaterial
                    color="#12141E"
                    metalness={0.4}
                    roughness={0.15}
                    transparent
                    opacity={0.75}
                />
            </mesh>

            {/* Liquid inside — warm amber */}
            <mesh position={[0, -0.35, 0]}>
                <cylinderGeometry args={[0.34, 0.42, 0.85, 20]} />
                <meshStandardMaterial
                    color="#D4A574"
                    metalness={0.5}
                    roughness={0.2}
                    transparent
                    opacity={0.55}
                />
            </mesh>

            {/* Bottle neck */}
            <mesh position={[0, 0.8, 0]}>
                <cylinderGeometry args={[0.15, 0.28, 0.5, 16]} />
                <meshStandardMaterial
                    color="#12141E"
                    metalness={0.4}
                    roughness={0.15}
                    transparent
                    opacity={0.75}
                />
            </mesh>

            {/* Cap */}
            <mesh position={[0, 1.22, 0]}>
                <cylinderGeometry args={[0.18, 0.18, 0.38, 16]} />
                <meshStandardMaterial color="#080A10" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Cap top accent — rose gold */}
            <mesh position={[0, 1.42, 0]}>
                <cylinderGeometry args={[0.12, 0.18, 0.04, 16]} />
                <meshStandardMaterial color="#D4A574" metalness={1} roughness={0.2} />
            </mesh>

            {/* Rose gold ring */}
            <mesh position={[0, 0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.29, 0.025, 10, 28]} />
                <meshStandardMaterial
                    color="#D4A574"
                    metalness={1}
                    roughness={0.2}
                    emissive="#D4A574"
                    emissiveIntensity={0.12}
                />
            </mesh>

            {/* Rose gold label plate */}
            <mesh position={[0, -0.15, 0.49]}>
                <planeGeometry args={[0.45, 0.28]} />
                <meshStandardMaterial
                    color="#D4A574"
                    metalness={0.85}
                    roughness={0.3}
                    emissive="#D4A574"
                    emissiveIntensity={0.08}
                />
            </mesh>

            {/* Base */}
            <mesh position={[0, -1.02, 0]}>
                <cylinderGeometry args={[0.5, 0.52, 0.06, 20]} />
                <meshStandardMaterial color="#D4A574" metalness={0.9} roughness={0.25} />
            </mesh>
        </group>
    )
}

export default function Parfum3D({ enableFullControl = false, bottleScale = 1 }) {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas
                camera={{ position: [0, 0.3, 4.2], fov: 38 }}
                dpr={1}
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: 'low-power',
                    stencil: false,
                    depth: true,
                }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[4, 5, 4]} intensity={1} color="#fff5e6" />
                <directionalLight position={[-3, 3, -2]} intensity={0.4} color="#D4A574" />
                <pointLight position={[0, -2, 2]} intensity={0.3} color="#D4A574" distance={6} />

                <Float speed={enableFullControl ? 0 : 1} rotationIntensity={0.1} floatIntensity={enableFullControl ? 0 : 0.2}>
                    <PerfumeBottle scale={bottleScale} />
                </Float>

                <OrbitControls
                    enableZoom={enableFullControl}
                    enablePan={enableFullControl}
                    maxPolarAngle={enableFullControl ? Math.PI : Math.PI / 1.8}
                    minPolarAngle={enableFullControl ? 0 : Math.PI / 3}
                    autoRotate={!enableFullControl}
                    autoRotateSpeed={1.5}
                />
            </Canvas>
        </div>
    )
}
