// Get the bouncing text element
const text = document.getElementById('bouncing-text');

// Initial position and speed
let x = 100,
  y = 100;
let dx = 2,
  dy = 2;
let clickCount = 0; // Tracks the number of clicks before explosion

// Function to generate a random color
function getRandomColor() {
  return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  })`;
}

// Function to move the text
function moveText() {
  const screenWidth = window.innerWidth - text.clientWidth;
  const screenHeight = window.innerHeight - text.clientHeight;

  x += dx;
  y += dy;

  if (x <= 0 || x >= screenWidth) {
    dx *= -1;
    text.style.color = getRandomColor(); // Change color on bounce
  }
  if (y <= 0 || y >= screenHeight) {
    dy *= -1;
    text.style.color = getRandomColor(); // Change color on bounce
  }

  text.style.transform = `translate(${x}px, ${y}px)`;
  requestAnimationFrame(moveText);
}

// Start the animation
moveText();

// Click event to avoid and explode after 3 clicks
text.addEventListener('click', (event) => {
  clickCount++;

  if (clickCount < 3) {
    // Move the text away from the cursor on click
    const newX = Math.random() * (window.innerWidth - text.clientWidth);
    const newY = Math.random() * (window.innerHeight - text.clientHeight);
    x = newX;
    y = newY;
    text.style.transform = `translate(${x}px, ${y}px)`;
  } else {
    // Explosion effect on 3rd click
    text.style.transition = 'transform 0.3s ease-out, opacity 0.3s';
    text.style.transform = 'scale(2) rotate(720deg)';
    text.style.opacity = '0';
    setTimeout(() => {
      text.remove(); // Remove text after explosion
      showCongratulations(); // Show the crazy congratulations message
    }, 300);
  }
});

// Function to display "Congratulations!" message
function showCongratulations() {
  const congratsText = document.createElement('h1');
  congratsText.innerText = '🎉 C O N G R A T U L A T I O N S ! 🎉';
  congratsText.classList.add('congrats-text'); // Apply the CSS class
  document.body.appendChild(congratsText);
}
