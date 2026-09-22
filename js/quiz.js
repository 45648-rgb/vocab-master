let currentQuizWord = null;
let score = 0;
let totalQuestions = 0;

document.addEventListener('DOMContentLoaded', () => {
  const questionEl = document.getElementById('quiz-word');
  const optionsContainer = document.getElementById('options-container');
  const scoreEl = document.getElementById('quiz-score');
  const feedbackEl = document.getElementById('quiz-feedback');
  const nextBtn = document.getElementById('next-quiz-btn');

  function loadNextQuestion() {
    feedbackEl.textContent = '';
    nextBtn.style.display = 'none';

    const randomIndex = Math.floor(Math.random() * VOCAB_DATA.length);
    currentQuizWord = VOCAB_DATA[randomIndex];
    questionEl.textContent = currentQuizWord.word;

    const distractors = VOCAB_DATA
      .filter(w => w.id !== currentQuizWord.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const options = [currentQuizWord, ...distractors].sort(() => 0.5 - Math.random());

    optionsContainer.innerHTML = '';
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt.meaning;
      btn.addEventListener('click', () => handleAnswer(btn, opt.id === currentQuizWord.id));
      optionsContainer.appendChild(btn);
    });
  }

  function handleAnswer(selectedBtn, isCorrect) {
    const allBtns = optionsContainer.querySelectorAll('.option-btn');
    allBtns.forEach(btn => btn.disabled = true);
    totalQuestions++;

    if (isCorrect) {
      selectedBtn.classList.add('correct');
      score++;
      Gamification.addXP(20); // ตอบถูกรับ +20 XP
      feedbackEl.innerHTML = `<span style="color: #00b894; font-weight: bold;">🎉 ถูกต้อง! (+20 XP)</span>`;
    } else {
      selectedBtn.classList.add('wrong');
      allBtns.forEach(btn => {
        if (btn.textContent === currentQuizWord.meaning) btn.classList.add('correct');
      });
      feedbackEl.innerHTML = `<span style="color: #ff7675; font-weight: bold;">❌ คำตอบที่ถูกคือ: ${currentQuizWord.meaning}</span>`;
    }

    scoreEl.textContent = `คะแนน: ${score} / ${totalQuestions}`;
    nextBtn.style.display = 'inline-block';
  }

  nextBtn.addEventListener('click', loadNextQuestion);
  loadNextQuestion();
});