// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Triangle Geometry (Hollow Wireframe)
const geometry = new THREE.TetrahedronGeometry(1.5);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff, // Initial color (Neon cyan)
  wireframe: true,
});
const triangle = new THREE.Mesh(geometry, material);
scene.add(triangle);

// Camera position (Centered)
camera.position.z = 4;

// Mouse rotation
let isDragging = false;
let prevMouseX = 0;
let prevMouseY = 0;

document.addEventListener('mousedown', (event) => {
  isDragging = true;
  prevMouseX = event.clientX;
  prevMouseY = event.clientY;
});

document.addEventListener('mousemove', (event) => {
  if (isDragging) {
    const deltaX = (event.clientX - prevMouseX) * 0.01;
    const deltaY = (event.clientY - prevMouseY) * 0.01;

    triangle.rotation.y += deltaX;
    triangle.rotation.x += deltaY;

    prevMouseX = event.clientX;
    prevMouseY = event.clientY;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

// Hover to change color
document.addEventListener('mousemove', (event) => {
  const mouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(triangle);

  if (intersects.length > 0) {
    triangle.material.color.set(Math.random() * 0xffffff);
  }
});

// Window Resize Handling
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Start rendering
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();

function goBack() {
  window.location.href = 'index.html'; // Ensure index.html is in the same directory
}
