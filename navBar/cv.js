document.addEventListener("DOMContentLoaded", function () {
    let angle = 0;
    let speed = 1;
    let acceleration = 0.05;
    let maxSpeed = 100;
  
    const image = document.getElementById("rotatingImage");
  
    if (image) {
      image.addEventListener("mouseenter", () => {
        accelerating = true;
      });
  
      image.addEventListener("mouseleave", () => {
        accelerating = false;
      });
  
      function rotate() {
        angle += speed;
        image.style.transform = `rotate(${angle}deg)`;
  
        if (image.matches(":hover") && speed < maxSpeed) {
          speed += acceleration;
        } else if (!image.matches(":hover") && speed > 1) {
            speed -= acceleration;
        }
  
        requestAnimationFrame(rotate);
      }
  
      rotate();
    } else {
      console.error("Element with id 'rotatingImage' not found.");
    }
  });
  