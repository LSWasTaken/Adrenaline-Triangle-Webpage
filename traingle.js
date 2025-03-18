const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Triangle Geometry (Tetrahedron)
const geometry = new THREE.TetrahedronGeometry(1.5);
const material = new THREE.MeshBasicMaterial({ 
    color: 0x00ffff, // Neon cyan
    wireframe: true
});
const triangle = new THREE.Mesh(geometry, material);
scene.add(triangle);

// Camera position
camera.position.z = 4;

// Variables for touch interaction
let isTouching = false;
let prevTouchX = 0;
let prevTouchY = 0;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    triangle.rotation.y += 0.02; // Continuous rotation
    triangle.rotation.x += 0.01;
    renderer.render(scene, camera);
}

// Mouse Interaction (Hover changes color)
document.addEventListener("mousemove", () => {
    triangle.material.color.set(Math.random() * 0xffffff);
});

// Touch Interaction (Rotate triangle by touch)
document.addEventListener("touchstart", (event) => {
    if (event.touches.length > 0) {
        prevTouchX = event.touches[0].clientX;
        prevTouchY = event.touches[0].clientY;
        isTouching = true;
    }
});

document.addEventListener("touchmove", (event) => {
    if (isTouching && event.touches.length > 0) {
        let touch = event.touches[0];
        let deltaX = (touch.clientX - prevTouchX) * 0.01;
        let deltaY = (touch.clientY - prevTouchY) * 0.01;

        triangle.rotation.y += deltaX; // Rotate based on touch X
        triangle.rotation.x += deltaY; // Rotate based on touch Y

        prevTouchX = touch.clientX;
        prevTouchY = touch.clientY;
    }
});

document.addEventListener("touchend", () => {
    isTouching = false; // End of touch interaction
});

// Window Resize Handling
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Start animation
animate();
