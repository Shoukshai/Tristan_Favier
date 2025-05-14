document.addEventListener("DOMContentLoaded", function () {
  const starContainer = document.getElementById('starContainer');
  const addStarBtn = document.getElementById('addStarBtn');
  
  const startQuizBtn = document.getElementById('startQuizBtn');
  const quizModal = document.getElementById('quizModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const questionTitle = document.getElementById('questionTitle');
  const questionContainer = document.getElementById('questionContainer');
  const feedbackMessage = document.getElementById('feedbackMessage');
  const backgroundBlur = document.getElementById('backgroundBlur');
  const questions = [
    {
      question: "Question 1: Quel est la reponse A",
      options: ["B", "C", "A", "D"],
      correctAnswer: "A"
    },
    {
      question: "Question 2: Quel est la reponse B",
      options: ["B", "C", "A", "D"],
      correctAnswer: "B"
    },
    {
      question: "Question 3: Quel est la reponse C",
      options: ["B", "C", "A", "D"],
      correctAnswer: "C"
    },
    {
      question: "Question 4: Quel est la reponse D",
      options: ["B", "C", "A", "D"],
      correctAnswer: "D"
    },
    {
      question: "Question 5: Quel est la reponse de la question 1",
      options: ["B", "C", "A", "D"],
      correctAnswer: "A"
    }
  ];

  let currentQuestionIndex = 0;

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
    star.offsetHeight;
    requestAnimationFrame(() => star.classList.add('show'));
  }


  for (let i = 0; i < 100; i++) {
    addStar();
  }
  addStarBtn.addEventListener('click', addStar);

  function displayQuestion(index) {
    const currentQuestion = questions[index];
    questionTitle.textContent = currentQuestion.question;
    questionContainer.innerHTML = '';
    feedbackMessage.textContent = '';

    currentQuestion.options.forEach(option => {
      const btn = document.createElement('button');
      btn.textContent = option;
      btn.className = 'btn btn-secondary m-2';
      btn.onclick = () => checkAnswer(btn, option, currentQuestion.correctAnswer);
      questionContainer.appendChild(btn);
    });
  }

  function checkAnswer(button, selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
      button.classList.add('correct');
      feedbackMessage.textContent = "Correct!";
    } else {
      button.classList.add('incorrect');
      feedbackMessage.textContent = "Incorrect!";
    }

    const allButtons = questionContainer.querySelectorAll('button');
    allButtons.forEach(btn => {
      btn.disabled = true;
    });

    setTimeout(() => {
      quizModal.classList.remove('modal-open');
    }, 1000);

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      setTimeout(() => {
        quizModal.classList.add('modal-open');
        displayQuestion(currentQuestionIndex);
      }, 1500);
    } else {
      setTimeout(() => {
        quizModal.classList.remove('modal-open');
        backgroundBlur.classList.add('hidden');
      }, 1500);
    }
  }

  function resetQuiz() {
      currentQuestionIndex = 0;
      feedbackMessage.textContent = '';
      const allButtons = questionContainer.querySelectorAll('button');
      allButtons.forEach(btn => {
        btn.classList.remove('incorrect', 'correct');
        btn.disabled = false;
      });
  }

  startQuizBtn.addEventListener('click', () => {
    resetQuiz();
    backgroundBlur.classList.remove('hidden');
    quizModal.classList.add('modal-open');
    displayQuestion(currentQuestionIndex);
  });

  closeModalBtn.addEventListener('click', () => {
    quizModal.classList.remove('modal-open');
    backgroundBlur.classList.add('hidden');
  });
  
});
