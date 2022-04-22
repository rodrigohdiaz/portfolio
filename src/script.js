import './style.css'
import * as THREE from 'three'
import { gsap } from 'gsap'

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
 *  Scroll
 */
let scrollY = window.scrollY
let currentSection = 0

window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY
        const newSection = Math.round(scrollY / sizes.height)
    
    if(newSection != currentSection)
    {
        currentSection = newSection
        
        gsap.to(
            sectionMeshes[currentSection].rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                // x: '+=6',
                // y: '+=3',
                // z: '+=1.5'
            }
        )
    }
})

/**
 * Coursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})

/**
 * Objects
 */
const material = new THREE.MeshNormalMaterial()
material.wireframe = true
material.side = THREE.DoubleSide

const sphere = new THREE.Mesh(
new THREE.SphereGeometry(2.5, 32, 32),
material
)

sphere.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
)
sphere.rotation.x = 300
sphere.position.z = 4.75
sphere.position.x = 2.5

scene.add(sphere)


// Camera
const camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height)
camera.position.z = 5
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

    window.addEventListener( 'resize', onWindowResize, false );
			
    function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

    }
}

tick()