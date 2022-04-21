import './style.css'
import * as THREE from 'three'

// Canvas 
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Objects
 */
const material = new THREE.MeshNormalMaterial()
// material.color= new THREE.Color(0x598885)
material.wireframe = true
material.side = THREE.DoubleSide

const sphere = new THREE.Mesh(
new THREE.SphereGeometry(1, 32, 32),
material
)

sphere.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
)
sphere.rotation.x = 300
sphere.rotation.z = 50
sphere.position.z = 3
sphere.position.x = 1

scene.add(sphere)


// Camera
const camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height)
camera.position.z = 3.2
scene.add(camera)


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// Animate
const clock = new THREE.Clock()


/**
 * Animate 
 */
const tick = () =>
{
    // Clock
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.03 * elapsedTime

    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()