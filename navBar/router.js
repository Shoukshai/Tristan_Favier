document.addEventListener("DOMContentLoaded", function () {
    const starContainer = document.getElementById('starContainer');
    const addStarBtn = document.getElementById('addStarBtn');

    function getRandomColor() {
      const colors = ['#ffffff', '#ffe600', '#a0c4ff', '#ffccd5', '#d0f4de'];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function addStar() {
      const star = document.createElement('div');
      const size = Math.random() * 4 + 2;
      star.className = 'star';
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.backgroundColor = getRandomColor();
      star.style.left = `${Math.random() * window.innerWidth}px`;
      star.style.top = `${Math.random() * window.innerHeight}px`;

      starContainer.appendChild(star);
      requestAnimationFrame(() => star.classList.add('show'));
    }

    addStarBtn.addEventListener('click', addStar);
});