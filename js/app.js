const Gamification = {
  getStats() {
    return {
      xp: parseInt(localStorage.getItem('vocab_xp') || '0'),
      streak: parseInt(localStorage.getItem('vocab_streak') || '1'),
      learnedCount: JSON.parse(localStorage.getItem('vocab_learned') || '[]').length
    };
  },

  addXP(points) {
    let currentXP = parseInt(localStorage.getItem('vocab_xp') || '0');
    currentXP += points;
    localStorage.setItem('vocab_xp', currentXP.toString());
    this.updateTopBar();
    return currentXP;
  },

  markAsLearned(wordId) {
    let learned = JSON.parse(localStorage.getItem('vocab_learned') || '[]');
    if (!learned.includes(wordId)) {
      learned.push(wordId);
      localStorage.setItem('vocab_learned', JSON.stringify(learned));
      this.addXP(10); // +10 XP เมื่ออ่านศัพท์คำใหม่
    }
  },

  getLevel(xp) {
    return Math.floor(xp / 100) + 1; // 100 XP ต่อ 1 เลเวล
  },

  updateTopBar() {
    const stats = this.getStats();
    const level = this.getLevel(stats.xp);
    
    const xpEl = document.getElementById('user-xp');
    const streakEl = document.getElementById('user-streak');
    const levelEl = document.getElementById('user-level');

    if (xpEl) xpEl.textContent = `${stats.xp} XP`;
    if (streakEl) streakEl.textContent = `${stats.streak} วัน 🔥`;
    if (levelEl) levelEl.textContent = `Lv. ${level}`;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Gamification.updateTopBar();
});