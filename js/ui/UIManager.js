/**
 * MATEHUB - UI MANAGER (OOP)
 * Coordonatorul principal al interfeței cu utilizatorul:
 * - Navigare între ecrane (Home, Selecție Clase, Programă, Teorie, Simulări)
 * - Randare dinamică KaTeX pentru formule matematice
 * - Generator și Modal Fișe de Lucru (3 niveluri de dificultate, 5 probleme)
 * - Simulator complet de Examene (Evaluare Națională & Bacalaureat) cu cronometru
 * - Spotlight Search (Cmd+K) & Meniu Mobil Slide-Over
 */
let AppState = null;
let activeWorksheet = null;
let activeSimulation = null;

class UIManager {
  constructor({ themeManager, authService, gamificationManager } = {}) {
    this.themeManager = themeManager;
    this.authService = authService;
    this.gamificationManager = gamificationManager;

    this.state = {
      currentLevel: 'gimnaziu',
      currentClassId: null,
      currentLessonId: null,
      currentView: 'home',
      completedLessons: JSON.parse(localStorage.getItem('matehub_completed') || '[]'),
      theme: localStorage.getItem('matehub_theme') || 'theme-gaming'
    };
    window.AppState = this.state;

    this.activeWorksheet = {
      lessonId: null,
      difficulty: 'usor',
      showSolutions: false
    };
    window.activeWorksheet = this.activeWorksheet;

    this.activeSimulation = {
      type: 'en',
      timerSeconds: 0,
      timerInterval: null,
      isPaused: false,
      answersSub1: {},
      answersSub2: {},
      pointsSub3: {},
      activeTab: 1
    };
    window.activeSimulation = this.activeSimulation;

    this.currentExamType = 'en';

    AppState = this.state;
    activeWorksheet = this.activeWorksheet;
    activeSimulation = this.activeSimulation;

    // Auto-bind all methods to this instance and register globally
    for (const prop of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
      if (typeof this[prop] === 'function' && prop !== 'constructor') {
        this[prop] = this[prop].bind(this);
        window[prop] = this[prop];
      }
    }
  }

  init() {
    this.bindKeyboardShortcuts();
    this.updateCompletionButtonState(this.state.currentLessonId);
  }

  bindKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // CMD+K or CTRL+K opens spotlight search
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.openSearchModal();
      }
      // ESC closes any active modal
      if (e.key === 'Escape') {
        this.closeSearchModal();
        this.closeWorksheetModal();
        if (this.authService) this.authService.closeAuthModal();
        if (this.gamificationManager) {
          this.gamificationManager.closeProfileModal();
          this.gamificationManager.closeLevelUpModal();
        }
      }
    });
  }

       6. NAVIGATION & VIEW LOGIC
       ========================================================================= */
    navigateTo(viewName) {
      AppState.currentView = viewName;
      
      const views = ['viewHome', 'viewClassSelect', 'viewCurriculum', 'viewTheory', 'viewSimulations'];
      views.forEach(v => {
        const el = document.getElementById(v);
        if (el) el.classList.add('hidden');
      });

      const breadcrumbsBar = document.getElementById('breadcrumbsBar');

      if (viewName === 'home') {
        document.getElementById('viewHome').classList.remove('hidden');
        breadcrumbsBar.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (viewName === 'classSelect') {
        document.getElementById('viewClassSelect').classList.remove('hidden');
        breadcrumbsBar.classList.remove('hidden');
        renderClassSelectionView();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (viewName === 'curriculum') {
        document.getElementById('viewCurriculum').classList.remove('hidden');
        breadcrumbsBar.classList.remove('hidden');
        renderCurriculumView();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (viewName === 'theory') {
        document.getElementById('viewTheory').classList.remove('hidden');
        breadcrumbsBar.classList.remove('hidden');
        renderTheoryView();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (viewName === 'simulations') {
        document.getElementById('viewSimulations').classList.remove('hidden');
        breadcrumbsBar.classList.remove('hidden');
        showSimulationScreen('select');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      updateBreadcrumbs();
    }

    selectLevel(levelKey) {
      AppState.currentLevel = levelKey;
      navigateTo('classSelect');
    }

    selectClass(classId) {
      AppState.currentClassId = classId;
      navigateTo('curriculum');
    }

    selectLesson(lessonId) {
      AppState.currentLessonId = lessonId;
      // Auto locate level and class if navigated from search or simulation recommendations
      for (const levelKey in CURRICULUM) {
        for (const c of CURRICULUM[levelKey].classes) {
          for (const ch of c.chapters) {
            for (const l of ch.lessons) {
              if (l.id === lessonId) {
                AppState.currentLevel = levelKey;
                AppState.currentClassId = c.id;
                break;
              }
            }
          }
        }
      }
      navigateTo('theory');
    }

    goBack() {
      if (AppState.currentView === 'theory') {
        navigateTo('curriculum');
      } else if (AppState.currentView === 'curriculum') {
        navigateTo('classSelect');
      } else if (AppState.currentView === 'classSelect') {
        navigateTo('home');
      } else if (AppState.currentView === 'simulations') {
        if (!document.getElementById('simScreenSelect').classList.contains('hidden')) {
          navigateTo('home');
        } else {
          showSimulationScreen('select');
        }
      } else {
        navigateTo('home');
      }
    }

    updateBreadcrumbs() {
      const container = document.getElementById('breadcrumbItems');
      if (!container) return;

      let html = `
        <span onclick="navigateTo('home')" class="cursor-pointer hover:text-white transition flex items-center gap-1">
          <i class="fa-solid fa-house text-[10px]"></i> Acasă
        </span>
      `;

      if (AppState.currentView === 'classSelect') {
        const levelName = AppState.currentLevel === 'gimnaziu' ? 'Gimnaziu (V-VIII)' : 'Liceu (IX-XII)';
        html += `
          <i class="fa-solid fa-chevron-right text-[9px] text-gray-600"></i>
          <span class="text-white font-medium">${levelName}</span>
        `;
      } else if (AppState.currentView === 'curriculum') {
        const levelName = AppState.currentLevel === 'gimnaziu' ? 'Gimnaziu' : 'Liceu';
        const classObj = findClassById(AppState.currentClassId);
        html += `
          <i class="fa-solid fa-chevron-right text-[9px] text-gray-600"></i>
          <span onclick="navigateTo('classSelect')" class="cursor-pointer hover:text-white transition">${levelName}</span>
          <i class="fa-solid fa-chevron-right text-[9px] text-gray-600"></i>
          <span class="text-white font-medium">${classObj ? classObj.name : 'Clasa'}</span>
        `;
      } else if (AppState.currentView === 'theory') {
        const levelName = AppState.currentLevel === 'gimnaziu' ? 'Gimnaziu' : 'Liceu';
        const classObj = findClassById(AppState.currentClassId);
        const lessonObj = findLessonById(AppState.currentLessonId);
        html += `
          <i class="fa-solid fa-chevron-right text-[9px] text-gray-600"></i>
          <span onclick="navigateTo('classSelect')" class="cursor-pointer hover:text-white transition">${levelName}</span>
          <i class="fa-solid fa-chevron-right text-[9px] text-gray-600"></i>
          <span onclick="navigateTo('curriculum')" class="cursor-pointer hover:text-white transition">${classObj ? classObj.name : 'Clasa'}</span>
          <i class="fa-solid fa-chevron-right text-[9px] text-gray-600"></i>
          <span class="text-white font-medium truncate max-w-[200px] sm:max-w-xs inline-block align-bottom">${lessonObj ? lessonObj.title : 'Lecție'}</span>
        `;
      } else if (AppState.currentView === 'simulations') {
        html += `
          <i class="fa-solid fa-chevron-right text-[9px] text-gray-600"></i>
          <span class="text-white font-medium">Simulări Examen (EN & BAC)</span>
        `;
      }

      container.innerHTML = html;
    }

    /* =========================================================================
       7. RENDER CLASS & CURRICULUM VIEWS
       ========================================================================= */
    renderClassSelectionView() {
      const levelKey = AppState.currentLevel;
      const levelData = CURRICULUM[levelKey];
      
      const levelBadge = document.getElementById('levelBadge');
      const levelTitle = document.getElementById('levelTitle');
      const levelSubtitle = document.getElementById('levelSubtitle');
      const grid = document.getElementById('classesGrid');

      const btnG = document.getElementById('btnTabGimnaziu');
      const btnL = document.getElementById('btnTabLiceu');
      if (levelKey === 'gimnaziu') {
        btnG.className = "px-4 py-2 text-xs font-bold rounded-lg themed-btn shadow transition";
        btnL.className = "px-4 py-2 text-xs font-bold rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition";
        levelBadge.innerText = "Ciclul Gimnazial";
        levelTitle.innerText = "Alege Clasa de Gimnaziu";
        levelSubtitle.innerText = "Selectează clasa (V, VI, VII sau VIII) pentru a accesa programa Ministerului Educației.";
      } else {
        btnL.className = "px-4 py-2 text-xs font-bold rounded-lg themed-btn shadow transition";
        btnG.className = "px-4 py-2 text-xs font-bold rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition";
        levelBadge.innerText = "Ciclul Liceal";
        levelTitle.innerText = "Alege Clasa de Liceu";
        levelSubtitle.innerText = "Selectează clasa (IX, X, XI sau XII) pentru a explora programa completă de matematică.";
      }

      let html = '';
      levelData.classes.forEach(c => {
        let totalLessons = 0;
        c.chapters.forEach(ch => totalLessons += ch.lessons.length);

        html += `
          <div onclick="selectClass('${c.id}')"
               class="group relative themed-surface rounded-2xl p-6 cursor-pointer transform hover:-translate-y-1.5 transition duration-300 flex flex-col justify-between border border-white/10">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black bg-white/5 text-white border border-white/10 group-hover:themed-btn group-hover:text-black transition">
                  ${c.numeral}
                </div>
                ${c.examBadge ? `
                  <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    Examen Național
                  </span>
                ` : `
                  <span class="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                    ${c.chapters.length} capitole
                  </span>
                `}
              </div>
              <div>
                <h3 class="text-xl font-extrabold text-white group-hover:themed-primary-text transition">${c.name}</h3>
                <p class="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">${c.desc}</p>
              </div>
            </div>
            <div class="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold themed-primary-text">
              <span>${totalLessons} lecții disponibile</span>
              <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition"></i>
            </div>
          </div>
        `;
      });
      grid.innerHTML = html;
    }

    renderCurriculumView() {
      const classObj = findClassById(AppState.currentClassId);
      if (!classObj) return;

      document.getElementById('curriculumGradeBadge').innerText = classObj.name;
      document.getElementById('curriculumClassTitle').innerText = `Programa Oficială - ${classObj.name}`;
      document.getElementById('curriculumClassDesc').innerText = classObj.desc;

      const examBadge = document.getElementById('curriculumExamBadge');
      if (classObj.examBadge) {
        examBadge.classList.remove('hidden');
        examBadge.innerText = classObj.id === 'viii' ? 'Evaluare Națională' : 'Examen Bacalaureat';
      } else {
        examBadge.classList.add('hidden');
      }

      let totalLessons = 0;
      classObj.chapters.forEach(ch => totalLessons += ch.lessons.length);
      document.getElementById('curriculumTotalChapters').innerText = classObj.chapters.length;
      document.getElementById('curriculumTotalLessons').innerText = totalLessons;

      const container = document.getElementById('chaptersContainer');
      let html = '';

      classObj.chapters.forEach((chapter, index) => {
        html += `
          <div class="themed-surface rounded-2xl border border-white/10 overflow-hidden transition">
            <div class="p-5 sm:p-6 bg-white/[0.02] border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-sky-400">Capitolul ${index + 1}</span>
                <h3 class="text-lg sm:text-xl font-bold text-white mt-0.5">${chapter.title}</h3>
                <p class="text-xs text-gray-400 mt-1">${chapter.desc}</p>
              </div>
              <div class="text-xs text-gray-400 font-medium px-3 py-1 rounded-lg bg-white/5 border border-white/5 self-start sm:self-auto">
                ${chapter.lessons.length} lecții
              </div>
            </div>

            <div class="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              ${chapter.lessons.map(lesson => {
                const isCompleted = AppState.completedLessons.includes(lesson.id);
                return `
                  <div onclick="selectLesson('${lesson.id}')"
                       class="group p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition cursor-pointer flex flex-col justify-between space-y-3">
                    <div>
                      <div class="flex items-center justify-between text-[11px] text-gray-400 mb-1.5">
                        <span class="flex items-center gap-1.5">
                          <i class="fa-regular fa-clock text-[10px]"></i> ${lesson.duration}
                        </span>
                        <span class="px-2 py-0.5 rounded text-[10px] font-semibold ${
                          lesson.difficulty.includes('Important') || lesson.difficulty.includes('Esențial')
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-white/5 text-gray-300'
                        }">
                          ${lesson.difficulty}
                        </span>
                      </div>
                      <h4 class="text-sm font-bold text-white group-hover:themed-primary-text transition leading-snug">
                        ${lesson.title}
                      </h4>
                      <p class="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                        ${lesson.summary}
                      </p>
                    </div>

                    <div class="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                      <span class="text-[11px] ${isCompleted ? 'text-emerald-400 font-semibold' : 'text-gray-500'} flex items-center gap-1.5">
                        <i class="fa-solid ${isCompleted ? 'fa-circle-check' : 'fa-circle-notch text-[10px]'}"></i>
                        ${isCompleted ? 'Finalizat' : 'Neînceput'}
                      </span>
                      <span class="font-semibold themed-primary-text flex items-center gap-1">
                        Deschide Teoria <i class="fa-solid fa-chevron-right text-[9px] group-hover:translate-x-0.5 transition"></i>
                      </span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      });
      container.innerHTML = html;
    }

    /* =========================================================================
       8. RENDER THEORY VIEW
       ========================================================================= */
    renderTheoryView() {
      const lesson = findLessonById(AppState.currentLessonId);
      const classObj = findClassById(AppState.currentClassId);
      if (!lesson || !classObj) return;

      document.getElementById('theoryLessonTitle').innerText = lesson.title;
      document.getElementById('theoryLessonSummary').innerText = lesson.summary;
      document.getElementById('theoryClassBadge').innerText = classObj.name;
      document.getElementById('theoryTimeBadge').innerHTML = `<i class="fa-regular fa-clock"></i> ${lesson.duration}`;

      const parentChapter = findChapterOfLesson(lesson.id);
      document.getElementById('theoryChapterBadge').innerText = parentChapter ? parentChapter.title.split('.')[0] : 'Capitol';

      updateCompletionButtonState(lesson.id);

      const contentContainer = document.getElementById('theoryContentContainer');

      let html = `
        <!-- SECTION 1: INTRODUCERE & CONCEPT -->
        <div id="sec-intro" class="themed-surface rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
          <div class="flex items-center gap-2.5 text-sky-400">
            <i class="fa-solid fa-lightbulb text-lg"></i>
            <h2 class="text-xl font-extrabold text-white">1. Noțiuni Teoretice & Explicație Intuitivă</h2>
          </div>
          <div class="text-gray-300 text-sm sm:text-base leading-relaxed space-y-3">
            <p>${lesson.intro}</p>
          </div>
        </div>

        <!-- SECTION 2: FORMULE MATEMATICE CHEIE (KaTeX) -->
        <div id="sec-formulas" class="themed-surface rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
          <div class="flex items-center gap-2.5 text-purple-400">
            <i class="fa-solid fa-square-root-variable text-lg"></i>
            <h2 class="text-xl font-extrabold text-white">2. Formule & Teoreme Esențiale</h2>
          </div>
          <div class="space-y-4">
            ${lesson.keyFormulas.map(f => `
              <div class="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold uppercase tracking-wider text-sky-300">${f.name}</span>
                  <button onclick="copyToClipboard('${f.latex.replace(/\\/g, '\\\\')}', this)" class="text-[11px] text-gray-400 hover:text-white transition flex items-center gap-1">
                    <i class="fa-regular fa-copy"></i> Copiază LaTeX
                  </button>
                </div>
                <div class="py-2 text-center text-lg sm:text-xl math-render">
                  $$${f.latex}$$
                </div>
                ${f.note ? `<p class="text-xs text-gray-400 italic">${f.note}</p>` : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- SECTION 3: EXEMPLE REZOLVATE PAS CU PAS -->
        <div id="sec-examples" class="themed-surface rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
          <div class="flex items-center gap-2.5 text-emerald-400">
            <i class="fa-solid fa-calculator text-lg"></i>
            <h2 class="text-xl font-extrabold text-white">3. Exemple Rezolvate Pas cu Pas</h2>
          </div>
          
          <div class="space-y-6">
            ${lesson.examples.map((ex, exIdx) => `
              <div class="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-4">
                <div class="space-y-1">
                  <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">Exercițiul ${exIdx + 1}</span>
                  <p class="text-sm font-semibold text-white math-render">${ex.problem}</p>
                </div>

                <div class="p-4 rounded-lg bg-black/30 border border-white/5 space-y-2.5">
                  <span class="text-[11px] uppercase tracking-wider font-bold text-gray-400">Rezolvare detaliată:</span>
                  <ol class="list-decimal list-inside space-y-2 text-xs sm:text-sm text-gray-300">
                    ${ex.steps.map(step => `
                      <li class="pl-1 leading-relaxed math-render">${step}</li>
                    `).join('')}
                  </ol>
                </div>

                <div class="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm flex items-center justify-between">
                  <span class="font-bold text-emerald-300">Răspuns final:</span>
                  <span class="font-bold text-white math-render">${ex.answer}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- SECTION 4: CAPCANE FRECVENTE LA EXAMENE -->
        <div id="sec-traps" class="p-6 sm:p-7 rounded-2xl bg-rose-500/10 border border-rose-500/25 space-y-3">
          <div class="flex items-center gap-2 text-rose-400">
            <i class="fa-solid fa-triangle-exclamation text-lg"></i>
            <h3 class="text-base font-bold text-white">Capcane Frecvente & Sfaturi de Examen</h3>
          </div>
          <p class="text-xs sm:text-sm text-rose-200/90 leading-relaxed math-render">
            ${lesson.traps}
          </p>
        </div>

        <!-- SECTION 5: MINI-QUIZ INTERACTIV -->
        <div id="sec-quiz" class="themed-surface rounded-2xl p-6 sm:p-8 border border-white/10 space-y-5">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5 text-amber-400">
              <i class="fa-solid fa-brain text-lg"></i>
              <h2 class="text-xl font-extrabold text-white">5. Verificare Rapidă a Înțelegerii</h2>
            </div>
            <span class="text-xs px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">1 Întrebare</span>
          </div>

          <div class="space-y-4">
            <p class="text-sm font-semibold text-white math-render">${lesson.quiz.question}</p>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" id="quizOptionsContainer">
              ${lesson.quiz.options.map((opt, optIdx) => `
                <button onclick="handleQuizAnswer(${optIdx}, ${lesson.quiz.correctIndex}, this)" 
                  class="quiz-btn text-left p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gray-200 transition flex items-center justify-between">
                  <span class="math-render">${opt}</span>
                  <span class="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-[10px] text-gray-400 option-marker">${String.fromCharCode(65 + optIdx)}</span>
                </button>
              `).join('')}
            </div>

            <div id="quizFeedback" class="hidden p-4 rounded-xl text-xs space-y-1"></div>
          </div>
        </div>
      `;

      contentContainer.innerHTML = html;
      renderKaTeX();
    }

    /* =========================================================================
       9. WORKSHEET GENERATOR LOGIC (Modal, 3 Difficulties, 5 Problems with Barem)
       ========================================================================= */
    openWorksheetModal(lessonId = null) {
      const targetId = lessonId || AppState.currentLessonId;
      if (!targetId) return;

      activeWorksheet.lessonId = targetId;
      activeWorksheet.difficulty = 'mediu';
      activeWorksheet.showSolutions = false;

      const lesson = findLessonById(targetId);
      const classObj = findClassById(AppState.currentClassId);

      document.getElementById('wsLessonTitle').innerText = lesson ? lesson.title : "Fișă de Lucru";
      document.getElementById('wsLessonClassBadge').innerText = classObj ? classObj.name : "Matematică";

      updateWorksheetDifficultyButtons();
      renderWorksheetProblems();

      document.getElementById('worksheetModal').classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    closeWorksheetModal() {
      document.getElementById('worksheetModal').classList.add('hidden');
      document.body.style.overflow = 'auto';
    }

    setWorksheetDifficulty(diff) {
      activeWorksheet.difficulty = diff;
      updateWorksheetDifficultyButtons();
      renderWorksheetProblems();
    }

    updateWorksheetDifficultyButtons() {
      const diffs = ['usor', 'mediu', 'avansat'];
      diffs.forEach(d => {
        const btn = document.getElementById(`wsBtn${d.charAt(0).toUpperCase() + d.slice(1)}`);
        if (!btn) return;
        if (activeWorksheet.difficulty === d) {
          btn.className = "px-3 py-1 rounded-lg font-bold themed-btn shadow text-black";
        } else {
          btn.className = "px-3 py-1 rounded-lg font-bold text-gray-400 hover:text-white transition";
        }
      });
    }

    renderWorksheetProblems() {
      const lesson = findLessonById(activeWorksheet.lessonId);
      if (!lesson) return;

      const problems = generateLessonWorksheet(lesson, activeWorksheet.difficulty);
      const container = document.getElementById('wsProblemsContainer');

      let html = '';
      problems.forEach((p, idx) => {
        html += `
          <div class="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded-lg themed-btn flex items-center justify-center font-bold text-xs text-black">
                  #${p.num}
                </span>
                <span class="text-xs font-bold text-gray-300">Problema ${p.num}</span>
              </div>
              <span class="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">
                ${p.points}
              </span>
            </div>

            <!-- Problem statement -->
            <div class="text-sm text-white font-medium leading-relaxed math-render">
              ${p.problem}
            </div>

            <!-- Solution Toggle Button -->
            <div class="pt-2">
              <button onclick="toggleSingleSolution(${idx})" id="btnWsSol-${idx}" 
                class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-sky-400 flex items-center gap-1.5 transition">
                <i class="fa-regular fa-lightbulb"></i> <span>Vezi Rezolvarea Pas cu Pas / Barem</span>
              </button>
            </div>

            <!-- Expandable Solution & Barem Box -->
            <div id="wsSolBox-${idx}" class="hidden mt-3 p-4 rounded-xl bg-black/40 border border-sky-500/20 space-y-3.5">
              
              <!-- Step by Step -->
              <div class="space-y-1.5">
                <span class="text-[11px] font-bold uppercase tracking-wider text-sky-300">Pași de rezolvare:</span>
                <ol class="list-decimal list-inside space-y-1 text-xs text-gray-300">
                  ${p.steps.map(s => `<li class="math-render leading-relaxed">${s}</li>`).join('')}
                </ol>
              </div>

              <!-- Official Barem -->
              <div class="space-y-1.5 pt-2 border-t border-white/10">
                <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Barem de notare (20 pct):</span>
                <ul class="space-y-1 text-xs text-gray-400">
                  ${p.barem.map(b => `<li class="flex items-center gap-2"><i class="fa-solid fa-check text-[10px] text-emerald-400"></i> <span class="math-render">${b}</span></li>`).join('')}
                </ul>
              </div>

              <!-- Final Answer -->
              <div class="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center justify-between">
                <span class="font-bold text-emerald-300">Răspuns final:</span>
                <span class="font-bold text-white math-render">${p.answer}</span>
              </div>

            </div>

          </div>
        `;
      });

      container.innerHTML = html;
      renderKaTeX();
    }

    toggleSingleSolution(idx) {
      const box = document.getElementById(`wsSolBox-${idx}`);
      if (!box) return;
      box.classList.toggle('hidden');
      const btn = document.getElementById(`btnWsSol-${idx}`);
      if (btn) {
        if (box.classList.contains('hidden')) {
          btn.innerHTML = `<i class="fa-regular fa-lightbulb"></i> <span>Vezi Rezolvarea Pas cu Pas / Barem</span>`;
        } else {
          btn.innerHTML = `<i class="fa-solid fa-eye-slash"></i> <span>Ascunde Rezolvarea</span>`;
        }
      }
    }

    toggleAllWorksheetSolutions() {
      activeWorksheet.showSolutions = !activeWorksheet.showSolutions;
      const boxes = document.querySelectorAll('[id^="wsSolBox-"]');
      const btn = document.getElementById('btnToggleAllWs');

      boxes.forEach(box => {
        if (activeWorksheet.showSolutions) {
          box.classList.remove('hidden');
        } else {
          box.classList.add('hidden');
        }
      });

      if (btn) {
        btn.innerHTML = activeWorksheet.showSolutions 
          ? `<i class="fa-solid fa-eye-slash"></i> <span>Ascunde toate rezolvările</span>`
          : `<i class="fa-regular fa-eye"></i> <span>Arată toate rezolvările</span>`;
      }
    }

    printWorksheet() {
      window.print();
    }

    /* =========================================================================
       10. EXAM SIMULATIONS CONTROLLER (EN & BAC)
       ========================================================================= */
    showSimulationScreen(screenName) {
      const selectScreen = document.getElementById('simScreenSelect');
      const activeScreen = document.getElementById('simScreenActive');
      const resultScreen = document.getElementById('simScreenResult');

      selectScreen.classList.add('hidden');
      activeScreen.classList.add('hidden');
      resultScreen.classList.add('hidden');

      if (screenName === 'select') {
        selectScreen.classList.remove('hidden');
        stopExamTimer();
      } else if (screenName === 'active') {
        activeScreen.classList.remove('hidden');
      } else if (screenName === 'result') {
        resultScreen.classList.remove('hidden');
        stopExamTimer();
      }
    }

    startExamSimulation(type) {
      currentExamType = type;
      const simData = SIMULATIONS_DB[type];
      if (!simData) return;

      activeSimulation = {
        type: type,
        timerSeconds: simData.durationMinutes * 60,
        timerInterval: null,
        isPaused: false,
        answersSub1: {},
        answersSub2: {},
        pointsSub3: {},
        activeTab: 1
      };

      document.getElementById('activeExamTitle').innerText = simData.title;
      document.getElementById('activeExamSubtitle').innerText = simData.subtitle;

      showSimulationScreen('active');
      switchExamTab(1);
      startExamTimer();
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }

    startExamTimer() {
      stopExamTimer();
      updateTimerDisplay();

      activeSimulation.timerInterval = setInterval(() => {
        if (!activeSimulation.isPaused) {
          if (activeSimulation.timerSeconds > 0) {
            activeSimulation.timerSeconds--;
            updateTimerDisplay();
          } else {
            stopExamTimer();
            alert("Timpul alocat simulării a expirat! Lucrarea se va evalua automat acum.");
            finishExam();
          }
        }
      }, 1000);
    }

    stopExamTimer() {
      if (activeSimulation.timerInterval) {
        clearInterval(activeSimulation.timerInterval);
        activeSimulation.timerInterval = null;
      }
    }

    toggleExamTimerPause() {
      activeSimulation.isPaused = !activeSimulation.isPaused;
      const btn = document.getElementById('btnPauseTimer');
      if (btn) {
        btn.innerHTML = activeSimulation.isPaused ? '<i class="fa-solid fa-play"></i>' : '<i class="fa-solid fa-pause"></i>';
        btn.classList.toggle('text-amber-400', activeSimulation.isPaused);
      }
    }

    updateTimerDisplay() {
      const totalSec = activeSimulation.timerSeconds;
      const hours = Math.floor(totalSec / 3600);
      const minutes = Math.floor((totalSec % 3600) / 60);
      const seconds = totalSec % 60;

      const formatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      const el = document.getElementById('examTimerDisplay');
      if (el) {
        el.innerText = formatted;
        if (totalSec <= 900) { // under 15 min warning
          el.className = "text-2xl sm:text-3xl font-mono font-black text-rose-500 animate-pulse";
        } else {
          el.className = "text-2xl sm:text-3xl font-mono font-black text-amber-400";
        }
      }
    }

    switchExamTab(tabIdx) {
      activeSimulation.activeTab = tabIdx;
      const tabs = [1, 2, 3];
      tabs.forEach(t => {
        const btn = document.getElementById(`tabExamSub${t}`);
        if (!btn) return;
        if (t === tabIdx) {
          btn.className = "px-4 py-2 rounded-lg text-xs font-bold themed-btn shadow transition whitespace-nowrap text-black";
        } else {
          btn.className = "px-4 py-2 rounded-lg text-xs font-bold bg-white/5 hover:bg-white/10 text-gray-300 transition whitespace-nowrap";
        }
      });

      renderExamSubjectContent();
    }

    renderExamSubjectContent() {
      const simData = SIMULATIONS_DB[currentExamType];
      const container = document.getElementById('examSubjectContent');
      const tab = activeSimulation.activeTab;

      let html = '';

      if (tab === 1) {
        // Subiectul I (Grilă)
        const sub1 = simData.subiecte.sub1;
        html += `
          <div class="themed-surface rounded-2xl p-6 sm:p-7 border border-white/10 space-y-6">
            <div class="border-b border-white/10 pb-4">
              <span class="text-xs uppercase font-bold tracking-wider text-sky-400">Subiectul I</span>
              <h3 class="text-xl font-bold text-white mt-1">${sub1.title}</h3>
              <p class="text-xs text-gray-400 mt-1">Fiecare item valorează 5 puncte. Alege varianta corectă:</p>
            </div>

            <div class="space-y-6">
              ${sub1.items.map((item, iIdx) => {
                const selectedOpt = activeSimulation.answersSub1[item.num];
                return `
                  <div class="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-xs uppercase text-sky-300">Exercițiul ${item.num} (5 pct)</span>
                    </div>
                    <p class="text-sm sm:text-base font-semibold text-white math-render">${item.text}</p>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      ${item.options.map((opt, optIdx) => `
                        <button onclick="selectExamAnswer(1, ${item.num}, ${optIdx})"
                          class="p-3.5 rounded-xl border text-left text-xs font-medium transition flex items-center justify-between ${
                            selectedOpt === optIdx 
                              ? 'bg-sky-500/20 border-sky-500 text-sky-300 font-bold' 
                              : 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-300'
                          }">
                          <span class="math-render">${opt}</span>
                          <span class="w-6 h-6 rounded-full border flex items-center justify-center text-[11px] ${
                            selectedOpt === optIdx ? 'bg-sky-500 text-black border-sky-500 font-bold' : 'border-white/20 text-gray-400'
                          }">${String.fromCharCode(65 + optIdx)}</span>
                        </button>
                      `).join('')}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="pt-4 flex justify-end">
              <button onclick="switchExamTab(2)" class="px-5 py-2.5 rounded-xl themed-btn text-xs font-bold flex items-center gap-2">
                Treci la Subiectul II <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        `;
      } else if (tab === 2) {
        // Subiectul II
        const sub2 = simData.subiecte.sub2;
        html += `
          <div class="themed-surface rounded-2xl p-6 sm:p-7 border border-white/10 space-y-6">
            <div class="border-b border-white/10 pb-4">
              <span class="text-xs uppercase font-bold tracking-wider text-purple-400">Subiectul II</span>
              <h3 class="text-xl font-bold text-white mt-1">${sub2.title}</h3>
              <p class="text-xs text-gray-400 mt-1">Rezolvă cerințele și marchează răspunsurile:</p>
            </div>

            <div class="space-y-6">
              ${sub2.items.map((item, iIdx) => {
                if (item.options) {
                  // Grid style like in EN Subiectul II
                  const selectedOpt = activeSimulation.answersSub2[item.num];
                  return `
                    <div class="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
                      <div class="flex items-center justify-between">
                        <span class="font-bold text-xs uppercase text-purple-300">Exercițiul ${item.num} (5 pct)</span>
                      </div>
                      <p class="text-sm sm:text-base font-semibold text-white math-render">${item.text}</p>
                      
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        ${item.options.map((opt, optIdx) => `
                          <button onclick="selectExamAnswer(2, ${item.num}, ${optIdx})"
                            class="p-3.5 rounded-xl border text-left text-xs font-medium transition flex items-center justify-between ${
                              selectedOpt === optIdx 
                                ? 'bg-purple-500/20 border-purple-500 text-purple-300 font-bold' 
                                : 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-300'
                            }">
                            <span class="math-render">${opt}</span>
                            <span class="w-6 h-6 rounded-full border flex items-center justify-center text-[11px] ${
                              selectedOpt === optIdx ? 'bg-purple-500 text-black border-purple-500 font-bold' : 'border-white/20 text-gray-400'
                            }">${String.fromCharCode(65 + optIdx)}</span>
                          </button>
                        `).join('')}
                      </div>
                    </div>
                  `;
                } else {
                  // Subjective problems like in BAC Subiectul II
                  return `
                    <div class="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
                      <div class="flex items-center justify-between">
                        <span class="font-bold text-xs uppercase text-purple-300">Problema ${item.num} (${item.maxPoints} pct)</span>
                        <span class="text-xs text-gray-400">Redactare completă</span>
                      </div>
                      <p class="text-sm sm:text-base font-semibold text-white math-render">${item.problem}</p>
                      
                      <div class="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
                        <span class="text-[11px] uppercase font-bold text-gray-400">Autoevaluare ghidată pe baza baremului:</span>
                        <ul class="space-y-1.5 text-xs text-gray-300">
                          ${item.barem.map(b => `<li class="flex items-center gap-2"><i class="fa-regular fa-square-check text-sky-400"></i> <span class="math-render">${b}</span></li>`).join('')}
                        </ul>
                      </div>
                    </div>
                  `;
                }
              }).join('')}
            </div>

            <div class="pt-4 flex justify-between">
              <button onclick="switchExamTab(1)" class="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold transition flex items-center gap-2">
                <i class="fa-solid fa-arrow-left"></i> Subiectul I
              </button>
              <button onclick="switchExamTab(3)" class="px-5 py-2.5 rounded-xl themed-btn text-xs font-bold flex items-center gap-2">
                Treci la Subiectul III <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        `;
      } else if (tab === 3) {
        // Subiectul III
        const sub3 = simData.subiecte.sub3;
        html += `
          <div class="themed-surface rounded-2xl p-6 sm:p-7 border border-white/10 space-y-6">
            <div class="border-b border-white/10 pb-4">
              <span class="text-xs uppercase font-bold tracking-wider text-pink-400">Subiectul III</span>
              <h3 class="text-xl font-bold text-white mt-1">${sub3.title}</h3>
              <p class="text-xs text-gray-400 mt-1">Rezolvări complete cu demonstrații și pași de calcul conform baremului oficial:</p>
            </div>

            <div class="space-y-6">
              ${sub3.items.map((item, iIdx) => `
                <div class="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-xs uppercase text-pink-300">Problema ${item.num} (${item.maxPoints} puncte)</span>
                    <span class="text-xs text-gray-400">Redactare pas cu pas</span>
                  </div>
                  <p class="text-sm sm:text-base font-semibold text-white math-render">${item.problem}</p>
                  
                  <div class="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
                    <span class="text-[11px] uppercase font-bold text-gray-400">Barem oficial de notare:</span>
                    <ul class="space-y-1.5 text-xs text-gray-300">
                      ${item.barem.map(b => `<li class="flex items-center gap-2"><i class="fa-regular fa-square-check text-pink-400"></i> <span class="math-render">${b}</span></li>`).join('')}
                    </ul>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="pt-4 flex justify-between items-center">
              <button onclick="switchExamTab(2)" class="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold transition flex items-center gap-2">
                <i class="fa-solid fa-arrow-left"></i> Subiectul II
              </button>
              <button onclick="confirmFinishExam()" class="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-bold flex items-center gap-2 shadow-lg transition">
                <i class="fa-solid fa-flag-checkered"></i> Predă Lucrarea & Vezi Nota
              </button>
            </div>
          </div>
        `;
      }

      container.innerHTML = html;
      renderKaTeX();
    }

    selectExamAnswer(subNum, itemNum, optionIdx) {
      if (subNum === 1) {
        activeSimulation.answersSub1[itemNum] = optionIdx;
      } else if (subNum === 2) {
        activeSimulation.answersSub2[itemNum] = optionIdx;
      }
      renderExamSubjectContent();
    }

    confirmFinishExam() {
      const confirmFinish = confirm("Ești sigur că vrei să finalizezi simularea și să predai lucrarea? Vei primi nota estimativă și recomandările de lecții de repetat.");
      if (confirmFinish) {
        finishExam();
      }
    }

    finishExam() {
      stopExamTimer();
      const simData = SIMULATIONS_DB[currentExamType];
      
      let scoreSub1 = 0;
      let scoreSub2 = 0;
      let scoreSub3 = 25; // default sample score for subjective full writing
      const mistakes = [];

      // Evaluate Subiectul I
      simData.subiecte.sub1.items.forEach(item => {
        const userChoice = activeSimulation.answersSub1[item.num];
        if (userChoice === item.correctIndex) {
          scoreSub1 += 5;
        } else {
          mistakes.push({
            subject: "Subiectul I",
            itemNum: item.num,
            questionText: item.text,
            lessonId: item.lessonId,
            lessonName: item.lessonName,
            userChoiceText: userChoice !== undefined ? item.options[userChoice] : "Nefinalizat",
            correctChoiceText: item.options[item.correctIndex],
            explanation: item.explanation
          });
        }
      });

      // Evaluate Subiectul II
      if (simData.subiecte.sub2.items[0].options) {
        simData.subiecte.sub2.items.forEach(item => {
          const userChoice = activeSimulation.answersSub2[item.num];
          if (userChoice === item.correctIndex) {
            scoreSub2 += 5;
          } else {
            mistakes.push({
              subject: "Subiectul II",
              itemNum: item.num,
              questionText: item.text,
              lessonId: item.lessonId,
              lessonName: item.lessonName,
              userChoiceText: userChoice !== undefined ? item.options[userChoice] : "Nefinalizat",
              correctChoiceText: item.options[item.correctIndex],
              explanation: item.explanation
            });
          }
        });
      } else {
        // BAC Subiectul II subjective default score based on answering
        scoreSub2 = 28;
      }

      const totalPoints = scoreSub1 + scoreSub2 + scoreSub3 + 10; // 10p oficiu
      const finalGrade = (totalPoints / 10).toFixed(2);

      // Gamification: Award +300 XP for completing exam
      const gData = getGamificationData();
      gData.examsCount = (gData.examsCount || 0) + 1;
      saveGamificationData(gData);

      awardXP(300, "Simulare de examen finalizată!");
      recordDailyActivity();
      unlockBadge('exam_done');
      if (parseFloat(finalGrade) >= 9.0) {
        unlockBadge('high_score');
      }

      // Render Result Screen
      document.getElementById('resultFinalGrade').innerText = finalGrade;
      document.getElementById('resSub1Score').innerText = `${scoreSub1} / 30p`;
      document.getElementById('resSub2Score').innerText = `${scoreSub2} / 30p`;
      document.getElementById('resSub3Score').innerText = `${scoreSub3} / 30p`;

      const statusEl = document.getElementById('resultStatusText');
      if (finalGrade >= 9.0) {
        statusEl.innerText = "Excelent! Pregătire de nota 10. Continuă să exersezi exercițiile avansate.";
      } else if (finalGrade >= 7.0) {
        statusEl.innerText = "Rezultat Bun! Cu puțină atenție la conceptele recomandate mai jos, poți atinge nota 10.";
      } else {
        statusEl.innerText = "Ai nevoie de consolidare. Urmează planul de recuperare de mai jos pentru fiecare greșeală.";
      }

      // Render Personalized Recommendations
      const recList = document.getElementById('resultRecommendationsList');
      if (mistakes.length === 0) {
        recList.innerHTML = `
          <div class="col-span-full p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs text-center font-semibold">
            <i class="fa-solid fa-star text-amber-400 mr-1.5"></i> Nu ai făcut nicio greșeală la Subiectele I și II! Ești pregătit pentru examen.
          </div>
        `;
      } else {
        recList.innerHTML = mistakes.map(m => `
          <div class="p-4 rounded-xl bg-white/[0.03] border border-amber-500/20 space-y-3">
            <div class="flex items-center justify-between text-[11px]">
              <span class="font-bold text-amber-400">${m.subject} - Ex. ${m.itemNum}</span>
              <span class="text-rose-400"><i class="fa-solid fa-xmark"></i> Răspuns greșit</span>
            </div>
            <p class="text-xs text-gray-300 font-medium line-clamp-2 math-render">${m.questionText}</p>
            <div class="p-2.5 rounded-lg bg-black/40 text-[11px] text-gray-400 space-y-1">
              <div>Răspunsul tău: <span class="text-rose-300 math-render">${m.userChoiceText}</span></div>
              <div>Răspuns corect: <strong class="text-emerald-400 math-render">${m.correctChoiceText}</strong></div>
              <div class="text-[10px] text-gray-400 italic pt-1 border-t border-white/5 math-render">${m.explanation}</div>
            </div>
            <button onclick="selectLesson('${m.lessonId}')" class="w-full py-2 rounded-lg themed-btn text-xs font-bold flex items-center justify-center gap-1.5 shadow">
              <i class="fa-solid fa-book-open"></i> Reia Lecția: ${m.lessonName}
            </button>
          </div>
        `).join('');
      }

      // Render Barem Container
      const baremContainer = document.getElementById('resultBaremContainer');
      let baremHtml = '';

      ['sub1', 'sub2', 'sub3'].forEach((subKey, sIdx) => {
        const sub = simData.subiecte[subKey];
        baremHtml += `
          <div class="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-sky-400">${sub.title}</h4>
            <div class="space-y-2 text-xs text-gray-300">
              ${sub.items.map(item => `
                <div class="p-2.5 rounded-lg bg-black/30 border border-white/5 space-y-1">
                  <div class="font-semibold text-white">Item ${item.num}: <span class="math-render">${item.text || item.problem}</span></div>
                  <div class="text-emerald-300 font-bold">Rezolvare / Răspuns: <span class="math-render">${item.explanation || item.solution || item.options[item.correctIndex]}</span></div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      });
      baremContainer.innerHTML = baremHtml;

      showSimulationScreen('result');
      renderKaTeX();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    toggleAllSolutionsExam() {
      const btn = document.getElementById('btnToggleAllExamSol');
      const container = document.getElementById('resultBaremContainer');
      if (container) {
        container.classList.toggle('hidden');
        if (btn) {
          btn.innerText = container.classList.contains('hidden') ? 'Arată baremul complet' : 'Ascunde baremul complet';
        }
      }
    }

    /* =========================================================================
       11. KATEX RENDERING HELPER
       ========================================================================= */
    renderKaTeX() {
      if (typeof renderMathInElement === 'function') {
        renderMathInElement(document.body, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false},
            {left: '\\(', right: '\\)', display: false},
            {left: '\\[', right: '\\]', display: true}
          ],
          throwOnError: false
        });
      }
    }

    /* =========================================================================
       12. QUIZ HANDLER
       ========================================================================= */
    handleQuizAnswer(selectedIdx, correctIdx, btnEl) {
      const container = document.getElementById('quizOptionsContainer');
      const allButtons = container.querySelectorAll('.quiz-btn');
      const feedback = document.getElementById('quizFeedback');
      const lesson = findLessonById(AppState.currentLessonId);

      allButtons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === correctIdx) {
          btn.classList.remove('bg-white/5', 'hover:bg-white/10', 'border-white/10');
          btn.classList.add('bg-emerald-500/20', 'border-emerald-500/50', 'text-emerald-300');
          btn.querySelector('.option-marker').innerHTML = '<i class="fa-solid fa-check text-emerald-400"></i>';
        } else if (idx === selectedIdx && selectedIdx !== correctIdx) {
          btn.classList.remove('bg-white/5', 'hover:bg-white/10', 'border-white/10');
          btn.classList.add('bg-rose-500/20', 'border-rose-500/50', 'text-rose-300');
          btn.querySelector('.option-marker').innerHTML = '<i class="fa-solid fa-xmark text-rose-400"></i>';
        }
      });

      feedback.classList.remove('hidden');
      if (selectedIdx === correctIdx) {
        feedback.className = "p-4 rounded-xl text-xs space-y-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-200";
        feedback.innerHTML = `
          <div class="font-bold flex items-center gap-1.5"><i class="fa-solid fa-circle-check"></i> Răspuns Corect! Felicitări! (+25 XP)</div>
          <div class="math-render">${lesson.quiz.explanation}</div>
        `;
        awardXP(25, "Răspuns corect la Quiz!");
        recordDailyActivity();
        unlockBadge('quiz_correct');
      } else {
        feedback.className = "p-4 rounded-xl text-xs space-y-1 bg-rose-500/20 border border-rose-500/40 text-rose-200";
        feedback.innerHTML = `
          <div class="font-bold flex items-center gap-1.5"><i class="fa-solid fa-circle-xmark"></i> Nu este corect.</div>
          <div class="math-render">${lesson.quiz.explanation}</div>
        `;
      }

      renderKaTeX();
    }

    /* =========================================================================
       13. LESSON COMPLETION TRACKER & PREV / NEXT
       ========================================================================= */
    goToAdjacentLesson(direction) {
      const allLessons = [];
      const classObj = findClassById(AppState.currentClassId);
      if (!classObj) return;

      classObj.chapters.forEach(ch => {
        ch.lessons.forEach(l => allLessons.push(l.id));
      });

      const currentIdx = allLessons.indexOf(AppState.currentLessonId);
      const nextIdx = currentIdx + direction;

      if (nextIdx >= 0 && nextIdx < allLessons.length) {
        selectLesson(allLessons[nextIdx]);
      } else {
        alert(direction === 1 ? 'Ai ajuns la sfârșitul acestei clase!' : 'Aceasta este prima lecție a clasei!');
      }
    }

    toggleCompletedLesson() {
      const id = AppState.currentLessonId;
      const idx = AppState.completedLessons.indexOf(id);

      if (idx === -1) {
        AppState.completedLessons.push(id);
        // Gamification hooks: +50 XP for completing a lesson!
        awardXP(50, "Lecție finalizată cu succes!");
        recordDailyActivity();
        unlockBadge('first_lesson');
        if (AppState.completedLessons.length >= 5) {
          unlockBadge('lessons_5');
        }
      } else {
        AppState.completedLessons.splice(idx, 1);
      }

      localStorage.setItem('matehub_completed', JSON.stringify(AppState.completedLessons));
      updateCompletionButtonState(id);
      updateGamificationUI();
      syncProgressToSupabase();
    }

    updateCompletionButtonState(lessonId) {
      const btn = document.getElementById('btnMarkCompleted');
      if (!btn) return;

      const isCompleted = AppState.completedLessons.includes(lessonId);
      if (isCompleted) {
        btn.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400"></i> <span class="text-emerald-300">Învățat</span>`;
        btn.className = "px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5 transition";
      } else {
        btn.innerHTML = `<i class="fa-regular fa-circle-check"></i> <span>Marchează ca învățat</span>`;
        btn.className = "px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 flex items-center gap-1.5 transition";
      }
    }

    /* =========================================================================
       14. THEME SWITCHER LOGIC
       ========================================================================= */
    toggleThemeDropdown() {
      const menu = document.getElementById('themeDropdownMenu');
      menu.classList.toggle('hidden');
    }

    setTheme(themeClass, label) {
      document.body.className = `min-h-screen flex flex-col font-sans selection:bg-sky-500 selection:text-white ${themeClass}`;
      AppState.theme = themeClass;
      localStorage.setItem('matehub_theme', themeClass);
      
      const labelEl = document.getElementById('currentThemeLabel');
      if (labelEl) labelEl.innerText = label;

      const menu = document.getElementById('themeDropdownMenu');
      if (menu) menu.classList.add('hidden');
    }

    document.addEventListener('click', function(e) {
      const btn = document.getElementById('themeMenuBtn');
      const menu = document.getElementById('themeDropdownMenu');
      if (btn && menu && !btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.add('hidden');
      }

      const searchInput = document.getElementById('globalSearchInput');
      const searchDropdown = document.getElementById('searchDropdown');
      if (searchInput && searchDropdown && !searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.classList.add('hidden');
      }
    });

    /* =========================================================================
       15. SEARCH FUNCTIONALITY
       ========================================================================= */
    
    /* =========================================================================
       MOBILE MENU & SPOTLIGHT SEARCH (CMD+K) CONTROLLERS
       ========================================================================= */
    toggleMobileMenu() {
      const menu = document.getElementById('mobileDrawerMenu');
      if (menu) menu.classList.toggle('hidden');
    }

    closeMobileMenu() {
      const menu = document.getElementById('mobileDrawerMenu');
      if (menu) menu.classList.add('hidden');
    }

    openSearchModal() {
      const modal = document.getElementById('spotlightSearchModal');
      const input = document.getElementById('spotlightSearchInput');
      if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
          if (input) input.focus();
        }, 100);
      }
    }

    closeSearchModal() {
      const modal = document.getElementById('spotlightSearchModal');
      if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    }

    // Global Keyboard Shortcuts (Cmd+K / Ctrl+K and ESC)
    document.addEventListener('keydown', function(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearchModal();
      }
      if (e.key === 'Escape') {
        closeSearchModal();
        closeMobileMenu();
        closeAuthModal();
        closeProfileModal();
        closeWorksheetModal();
      }
    });
    handleSearch(query) {
      const container = document.getElementById('spotlightResultsContainer');
      const trimmed = query.trim().toLowerCase();

      if (!trimmed || trimmed.length < 2) {
        if (container) {
          container.innerHTML = `
            <div class="p-4 text-center text-xs text-gray-400">
              Tastează un cuvânt cheie (ex: <em>Pitagora</em>, <em>Derivată</em>, <em>Logaritm</em>, <em>Cilindru</em>)...
            </div>
          `;
        }
        return;
      }

      const results = [];
      ['gimnaziu', 'liceu'].forEach(levelKey => {
        CURRICULUM[levelKey].classes.forEach(cls => {
          cls.chapters.forEach(ch => {
            ch.lessons.forEach(lesson => {
              if (
                lesson.title.toLowerCase().includes(trimmed) ||
                lesson.summary.toLowerCase().includes(trimmed) ||
                ch.title.toLowerCase().includes(trimmed)
              ) {
                results.push({
                  levelKey,
                  classId: cls.id,
                  className: cls.name,
                  chapterTitle: ch.title,
                  lesson
                });
              }
            });
          });
        });
      });

      if (results.length === 0) {
        if (container) {
          container.innerHTML = `<div class="p-4 text-xs text-gray-400 text-center">Niciun rezultat găsit pentru "${query}".</div>`;
        }
      } else {
        if (container) {
          container.innerHTML = results.slice(0, 7).map(res => `
            <div onclick="openFromSearch('${res.levelKey}', '${res.classId}', '${res.lesson.id}')" 
                 class="p-3 hover:bg-white/10 rounded-xl cursor-pointer transition flex items-center justify-between group">
              <div class="space-y-0.5">
                <div class="flex items-center gap-2 text-[10px] text-gray-400">
                  <span class="font-bold themed-primary-text">${res.className}</span>
                  <span>•</span>
                  <span>${res.chapterTitle.split('.')[0]}</span>
                </div>
                <div class="text-xs font-bold text-white group-hover:themed-primary-text transition">${res.lesson.title}</div>
                <div class="text-[11px] text-gray-400 line-clamp-1">${res.lesson.summary}</div>
              </div>
              <i class="fa-solid fa-chevron-right text-gray-500 group-hover:translate-x-1 transition text-xs"></i>
            </div>
          `).join('');
        }
      }
    }

    openFromSearch(levelKey, classId, lessonId) {
      AppState.currentLevel = levelKey;
      AppState.currentClassId = classId;
      AppState.currentLessonId = lessonId;

      closeSearchModal();
      navigateTo('theory');
    }


    /* =========================================================================
       16. UTILITY HELPERS
       ========================================================================= */
    findClassById(classId) {
      for (const levelKey in CURRICULUM) {
        for (const c of CURRICULUM[levelKey].classes) {
          if (c.id === classId) return c;
        }
      }
      return null;
    }

    findLessonById(lessonId) {
      for (const levelKey in CURRICULUM) {
        for (const c of CURRICULUM[levelKey].classes) {
          for (const ch of c.chapters) {
            for (const l of ch.lessons) {
              if (l.id === lessonId) return l;
            }
          }
        }
      }
      return null;
    }

    findChapterOfLesson(lessonId) {
      for (const levelKey in CURRICULUM) {
        for (const c of CURRICULUM[levelKey].classes) {
          for (const ch of c.chapters) {
            for (const l of ch.lessons) {
              if (l.id === lessonId) return ch;
            }
          }
        }
      }
      return null;
    }

    copyToClipboard(text, btnEl) {
      navigator.clipboard.writeText(text).then(() => {
        const orig = btnEl.innerHTML;
        btnEl.innerHTML = '<i class="fa-solid fa-check text-emerald-400"></i> Copiat!';
        setTimeout(() => {
          btnEl.innerHTML = orig;
        }, 1800);
      });
    }


}

if (typeof window !== 'undefined') { window.UIManager = UIManager; }
if (typeof module !== 'undefined' && module.exports) { module.exports = { UIManager }; }
