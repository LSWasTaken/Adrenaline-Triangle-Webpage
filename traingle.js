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

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    triangle.rotation.y += 0.02;
    triangle.rotation.x += 0.01;
    renderer.render(scene, camera);
}

// Mouse Interaction (Hover changes color)
document.addEventListener("mousemove", () => {
    triangle.material.color.set(Math.random() * 0xffffff);
});

// Window Resize Handling
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Start animation
animate();