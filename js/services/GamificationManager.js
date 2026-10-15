/**
 * MATEHUB - GAMIFICATION MANAGER (OOP)
 * Gestionează punctele de experiență (XP), calcularea nivelurilor (1-7),
 * streak-urile zilnice (🔥), deblocarea insignelor și sincronizarea profilului.
 */
class GamificationManager {
  constructor(authService = null) {
    this.authService = authService;
    this.config = {
      levels: [
        { level: 1, name: "Începător la Mate", minXP: 0, maxXP: 200, emblem: "🌱", desc: "Primii pași în lumea matematicii!" },
        { level: 2, name: "Ucenic Algebric", minXP: 200, maxXP: 500, emblem: "📐", desc: "Stăpânești formulele și proprietățile fundamentale." },
        { level: 3, name: "Explorator Geometric", minXP: 500, maxXP: 1000, emblem: "🧭", desc: "Navighezi cu ușurință prin plan și spațiu." },
        { level: 4, name: "Rezolvitor Emerit", minXP: 1000, maxXP: 2000, emblem: "⚡", desc: "Capabil să rezolve probleme complexe de examen." },
        { level: 5, name: "Maestru la Matematică", minXP: 2000, maxXP: 3500, emblem: "🧙‍♂️", desc: "Teoria și calculul nu mai au secrete pentru tine." },
        { level: 6, name: "Arhitectul Teoremelor", minXP: 3500, maxXP: 5000, emblem: "🏛️", desc: "Demonstrații riguroase și viziune matematică de top." },
        { level: 7, name: "Legendă Olimpică", minXP: 5000, maxXP: 999999, emblem: "👑", desc: "Nivel suprem de pregătire pentru notă maximă." }
      ],
      badges: [
        {
          id: "first_lesson",
          title: "Primul Pas",
          desc: "Finalizează prima ta lecție de teorie în platformă.",
          icon: "🎓",
          xpBonus: 50
        },
        {
          id: "worksheet_done",
          title: "Spirit Practic",
          desc: "Rezolvă o fișă de lucru completă de 5 probleme.",
          icon: "⚡",
          xpBonus: 100
        },
        {
          id: "quiz_correct",
          title: "Trăgător de Elită",
          desc: "Răspunde corect la verificarea rapidă din lecție.",
          icon: "🎯",
          xpBonus: 25
        },
        {
          id: "exam_done",
          title: "Candidat de Top",
          desc: "Finalizează o simulare completă de EN sau BAC.",
          icon: "🏆",
          xpBonus: 300
        },
        {
          id: "streak_3",
          title: "Foc Continuu",
          desc: "Menține un streak de minim 3 zile consecutive.",
          icon: "🔥",
          xpBonus: 150
        },
        {
          id: "xp_1000",
          title: "Maratonistul",
          desc: "Acumulează peste 1.000 XP în MateHub.",
          icon: "🚀",
          xpBonus: 200
        },
        {
          id: "high_score",
          title: "Nota 10",
          desc: "Obține cel puțin nota 9.00 la o simulare oficială.",
          icon: "💎",
          xpBonus: 250
        },
        {
          id: "lessons_5",
          title: "Biblioteca Vie",
          desc: "Finalizează cel puțin 5 lecții diferite din programă.",
          icon: "📚",
          xpBonus: 150
        },
        {
          id: "master_level",
          title: "Maestru la Matematică",
          desc: "Atinge Nivelul 5 de cunoștințe matematice.",
          icon: "👑",
          xpBonus: 500
        }
      ]
    };

    // Auto-bind all methods to this instance and register globally
    for (const prop of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
      if (typeof this[prop] === 'function' && prop !== 'constructor') {
        this[prop] = this[prop].bind(this);
        window[prop] = this[prop];
      }
    }
  }

  setAuthService(service) {
    this.authService = service;
  }

  /**
   * Încarcă starea curentă din localStorage
   */
  getData() {
    const defaultData = {
      xp: 0,
      streak: 1,
      bestStreak: 1,
      lastActiveDate: null,
      unlockedBadges: {},
      lessonsCount: 0,
      worksheetsCount: 0,
      examsCount: 0
    };
    try {
      const raw = localStorage.getItem('matehub_gamification');
      return raw ? Object.assign(defaultData, JSON.parse(raw)) : defaultData;
    } catch (e) {
      return defaultData;
    }
  }

  /**
   * Salvează starea curentă în localStorage și declanșează sincronizarea cu profilul
   */
  saveData(data) {
    localStorage.setItem('matehub_gamification', JSON.stringify(data));

    const auth = this.authService || window.authService;
    if (auth) {
      const session = auth.getCurrentSession();
      if (session) {
        const db = auth.getUsersDatabase();
        if (db[session.email]) {
          db[session.email].gamification = data;
          auth.saveUsersDatabase(db);
        }
        auth.syncProgressToSupabase();
      }
    }

    this.updateUI();
  }

  /**
   * Determină nivelul curent pe baza XP-ului
   */
  getCurrentLevel(xp) {
    const lvls = this.config.levels;
    for (let i = lvls.length - 1; i >= 0; i--) {
      if (xp >= lvls[i].minXP) return lvls[i];
    }
    return lvls[0];
  }

  /**
   * Determină următorul nivel
   */
  getNextLevel(xp) {
    const current = this.getCurrentLevel(xp);
    const idx = this.config.levels.findIndex(l => l.level === current.level);
    if (idx < this.config.levels.length - 1) {
      return this.config.levels[idx + 1];
    }
    return current;
  }

  /**
   * Înregistrează activitatea zilnică și incrementează streak-ul (🔥)
   */
  recordDailyActivity() {
    const data = this.getData();
    const today = new Date().toISOString().split('T')[0];

    if (!data.lastActiveDate) {
      data.streak = 1;
      data.bestStreak = 1;
      data.lastActiveDate = today;
    } else if (data.lastActiveDate === today) {
      // Deja marcat pe ziua curentă
    } else {
      const last = new Date(data.lastActiveDate);
      const curr = new Date(today);
      const diffDays = Math.round((curr - last) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        data.streak += 1;
        if (data.streak > data.bestStreak) {
          data.bestStreak = data.streak;
        }
      } else if (diffDays > 1) {
        data.streak = 1; // reset streak dacă a trecut mai mult de o zi
      }
      data.lastActiveDate = today;
    }

    if (data.streak >= 3 && !data.unlockedBadges['streak_3']) {
      this.unlockBadge('streak_3', data);
    }

    this.saveData(data);
  }

  /**
   * Acordă XP, verifică avansarea în nivel și deblocarea insignelor
   */
  awardXP(amount, reason = "Activitate finalizată") {
    const data = this.getData();
    const oldLvl = this.getCurrentLevel(data.xp).level;
    data.xp += amount;
    const newLvl = this.getCurrentLevel(data.xp).level;

    this.showXPToast(amount, reason);

    if (data.xp >= 1000 && !data.unlockedBadges['xp_1000']) {
      this.unlockBadge('xp_1000', data);
    }
    if (newLvl >= 5 && !data.unlockedBadges['master_level']) {
      this.unlockBadge('master_level', data);
    }

    if (newLvl > oldLvl) {
      const lvlInfo = this.getCurrentLevel(data.xp);
      this.showLevelUpModal(lvlInfo);
    }

    this.saveData(data);
  }

  /**
   * Deblochează o insignă specifică
   */
  unlockBadge(badgeId, data = null) {
    const gData = data || this.getData();
    if (gData.unlockedBadges[badgeId]) return;

    const badge = this.config.badges.find(b => b.id === badgeId);
    if (!badge) return;

    const nowStr = new Date().toLocaleDateString('ro-RO');
    gData.unlockedBadges[badgeId] = nowStr;

    if (badge.xpBonus) {
      gData.xp += badge.xpBonus;
      this.showXPToast(badge.xpBonus, `Insignă Deblocată: ${badge.title}! 🎖️`);
    }

    if (!data) {
      this.saveData(gData);
    }
  }

  /**
   * Actualizează elementele de interfață (Header, Modal Profil)
   */
  updateUI() {
    const data = this.getData();
    const lvl = this.getCurrentLevel(data.xp);
    const nextLvl = this.getNextLevel(data.xp);

    // Header UI
    const headerXp = document.getElementById('headerXpVal');
    const headerStreak = document.getElementById('headerStreakVal');
    const headerLvlBadge = document.getElementById('headerLevelBadge');

    if (headerXp) headerXp.innerText = `${data.xp} XP`;
    if (headerStreak) headerStreak.innerText = data.streak;
    if (headerLvlBadge) headerLvlBadge.innerText = `Niv. ${lvl.level}`;

    // Profile Modal UI
    const modalRank = document.getElementById('modalUserRank');
    const modalEmblem = document.getElementById('modalUserEmblem');
    const modalLevelPill = document.getElementById('modalLevelPill');
    const modalXpRatio = document.getElementById('modalXpRatio');
    const modalBar = document.getElementById('modalXpProgressBar');
    const modalCurLvlName = document.getElementById('modalCurrentLevelName');
    const modalNextLvlName = document.getElementById('modalNextLevelName');

    if (modalRank) modalRank.innerText = `Nivelul ${lvl.level} - ${lvl.name}`;
    if (modalEmblem) modalEmblem.innerText = lvl.emblem;
    if (modalLevelPill) modalLevelPill.innerText = `Niv. ${lvl.level}`;

    let pct = 100;
    if (nextLvl.level !== lvl.level) {
      const range = nextLvl.minXP - lvl.minXP;
      const currentProgress = data.xp - lvl.minXP;
      pct = Math.min(100, Math.max(0, Math.round((currentProgress / range) * 100)));
      if (modalXpRatio) modalXpRatio.innerText = `${data.xp} / ${nextLvl.minXP} XP`;
      if (modalNextLvlName) modalNextLvlName.innerText = `Următorul: Nivel ${nextLvl.level} (${nextLvl.minXP} XP)`;
    } else {
      if (modalXpRatio) modalXpRatio.innerText = `${data.xp} XP (Nivel Maxim!)`;
      if (modalNextLvlName) modalNextLvlName.innerText = "Nivel Maxim Atinge!";
    }

    if (modalBar) modalBar.style.width = `${pct}%`;
    if (modalCurLvlName) modalCurLvlName.innerText = `Nivel ${lvl.level} (${lvl.name})`;

    // Statistici Profil
    const modalStreak = document.getElementById('modalStreakCount');
    const modalTotalXp = document.getElementById('modalTotalXp');
    const modalLessons = document.getElementById('modalLessonsDone');
    const modalExams = document.getElementById('modalExamsDone');

    const completedCount = (window.AppState && window.AppState.completedLessons) ? window.AppState.completedLessons.length : 0;
    if (modalStreak) modalStreak.innerText = `${data.streak} ${data.streak === 1 ? 'zi' : 'zile'}`;
    if (modalTotalXp) modalTotalXp.innerText = `${data.xp} XP`;
    if (modalLessons) modalLessons.innerText = completedCount;
    if (modalExams) modalExams.innerText = data.examsCount || 0;

    // Grilă Insigne
    const badgesGrid = document.getElementById('modalBadgesGrid');
    const badgesRatio = document.getElementById('modalBadgesRatio');
    if (badgesGrid) {
      const unlockedCount = Object.keys(data.unlockedBadges).length;
      if (badgesRatio) badgesRatio.innerText = `${unlockedCount} / ${this.config.badges.length} Deblocate`;

      badgesGrid.innerHTML = this.config.badges.map(b => {
        const isUnlocked = !!data.unlockedBadges[b.id];
        const unlockDate = data.unlockedBadges[b.id];
        return `
          <div class="p-3.5 rounded-2xl border transition ${
            isUnlocked 
              ? 'bg-amber-500/10 border-amber-400/40 shadow-sm' 
              : 'bg-white/[0.02] border-white/5 opacity-50 grayscale'
          }">
            <div class="flex items-center justify-between mb-2">
              <span class="text-2xl">${b.icon}</span>
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                isUnlocked 
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' 
                  : 'bg-white/5 text-gray-400 border border-white/10'
              }">
                ${isUnlocked ? 'Deblocat' : 'Blocat'}
              </span>
            </div>
            <h4 class="text-xs font-bold text-white">${b.title}</h4>
            <p class="text-[11px] text-gray-400 mt-0.5 line-clamp-2 leading-relaxed">${b.desc}</p>
            <div class="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-400">
              <span class="text-amber-400 font-bold">+${b.xpBonus} XP</span>
              <span>${isUnlocked ? unlockDate : 'De realizat'}</span>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  openProfileModal() {
    this.updateUI();
    const modal = document.getElementById('profileModal');
    if (modal) modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  closeProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  showXPToast(amount, reason) {
    const toast = document.getElementById('xpToast');
    const amountEl = document.getElementById('xpToastAmount');
    const reasonEl = document.getElementById('xpToastReason');
    if (!toast) return;

    if (amountEl) amountEl.innerText = `+${amount} XP`;
    if (reasonEl) reasonEl.innerText = reason;

    toast.classList.remove('translate-y-12', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    const headerXpIcon = document.getElementById('headerXpIcon');
    if (headerXpIcon) {
      headerXpIcon.classList.add('scale-150', 'text-yellow-300');
      setTimeout(() => headerXpIcon.classList.remove('scale-150', 'text-yellow-300'), 400);
    }

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-12', 'opacity-0');
    }, 2600);
  }

  showLevelUpModal(lvlInfo) {
    const modal = document.getElementById('levelUpModal');
    const emblem = document.getElementById('lvlUpEmblem');
    const title = document.getElementById('lvlUpTitle');
    const desc = document.getElementById('lvlUpDesc');

    if (!modal) return;
    if (emblem) emblem.innerText = lvlInfo.emblem;
    if (title) title.innerText = `Nivelul ${lvlInfo.level}: ${lvlInfo.name}`;
    if (desc) desc.innerText = `${lvlInfo.desc} Ai deblocat noi provocări!`;

    modal.classList.remove('hidden');
  }

  closeLevelUpModal() {
    const modal = document.getElementById('levelUpModal');
    if (modal) modal.classList.add('hidden');
  }

  markWorksheetCompleted() {
    const data = this.getData();
    data.worksheetsCount = (data.worksheetsCount || 0) + 1;
    this.saveData(data);

    this.awardXP(100, "Fișă de lucru rezolvată!");
    this.recordDailyActivity();
    this.unlockBadge('worksheet_done');

    const btn = document.getElementById('btnMarkWsCompleted');
    if (btn) {
      btn.className = "px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold transition flex items-center gap-1.5";
      btn.innerHTML = `<i class="fa-solid fa-check"></i> <span>Fișă Finalizată!</span>`;
    }

    setTimeout(() => {
      if (window.uiManager) window.uiManager.closeWorksheetModal();
    }, 1200);
  }
}

if (typeof window !== 'undefined') { window.GamificationManager = GamificationManager; }
if (typeof module !== 'undefined' && module.exports) { module.exports = { GamificationManager }; }
