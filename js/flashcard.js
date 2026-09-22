let currentIndex = 0;
let filteredVocab = [...VOCAB_DATA];

document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('flashcard');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const speakBtn = document.getElementById('speak-btn');
  const categoryFilter = document.getElementById('category-filter');

  const categories = ['All', ...new Set(VOCAB_DATA.map(v => v.category))];
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat === 'All' ? 'ทุกหมวดหมู่' : cat;
    categoryFilter.appendChild(opt);
  });

  function renderCard() {
    if (filteredVocab.length === 0) return;
    const item = filteredVocab[currentIndex];
    
    document.getElementById('card-word').textContent = item.word;
    document.getElementById('card-phonetic').textContent = item.phonetic;
    document.getElementById('card-pos').textContent = item.pos;
    document.getElementById('card-meaning').textContent = item.meaning;
    document.getElementById('card-example').textContent = `"${item.example}"`;
    document.getElementById('card-counter').textContent = `${currentIndex + 1} / ${filteredVocab.length}`;

    card.classList.remove('flipped');
    Gamification.markAsLearned(item.id);
  }

  card.addEventListener('click', () => card.classList.toggle('flipped'));

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % filteredVocab.length;
    renderCard();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + filteredVocab.length) % filteredVocab.length;
    renderCard();
  });

  speakBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const word = filteredVocab[currentIndex].word;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  });

  categoryFilter.addEventListener('change', (e) => {
    const cat = e.target.value;
    filteredVocab = cat === 'All' ? [...VOCAB_DATA] : VOCAB_DATA.filter(v => v.category === cat);
    currentIndex = 0;
    renderCard();
  });

  renderCard();
});