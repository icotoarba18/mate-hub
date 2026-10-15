/**
 * MATEHUB - APPLICATION ENTRY POINT & ORCHESTRATOR
 * Inițializează serviciile OOP și creează legăturile globale pentru interfață.
 */

// 1. Instanțiere Servicii & Manageri
const themeManager = new ThemeManager();
const authService = new AuthService();
const gamificationManager = new GamificationManager(authService);
authService.gamificationManager = gamificationManager;

const uiManager = new UIManager({
  themeManager,
  authService,
  gamificationManager
});

// 2. Înregistrare pe obiectul global window
window.themeManager = themeManager;
window.authService = authService;
window.gamificationManager = gamificationManager;
window.uiManager = uiManager;

// 3. Punte globală (Global Bridge) pentru handlerele inline HTML (onclick, onsubmit etc.)
// --- ThemeManager Bindings ---
window.setTheme = (themeClass, label) => themeManager.setTheme(themeClass, label);
window.toggleThemeDropdown = () => themeManager.toggleDropdown();

// --- AuthService Bindings ---
window.openAuthModal = (tab) => authService.openAuthModal(tab);
window.closeAuthModal = () => authService.closeAuthModal();
window.switchAuthTab = (tab) => authService.switchAuthTab(tab);
window.togglePasswordVisibility = (id, btn) => authService.togglePasswordVisibility(id, btn);
window.handleSignUpSubmit = (e) => authService.handleSignUpSubmit(e);
window.handleSignInSubmit = (e) => authService.handleSignInSubmit(e);
window.showDemoCredentials = () => authService.showDemoCredentials();
window.logOutUser = () => authService.logOutUser();
window.toggleUserMenu = () => authService.toggleUserMenu();
window.closeUserMenu = () => authService.closeUserMenu();
window.updateAuthUI = () => authService.updateAuthUI();
window.showCelebrationBanner = (msg) => authService.showCelebrationBanner(msg);

// --- GamificationManager Bindings ---
window.awardXP = (amount, reason) => gamificationManager.awardXP(amount, reason);
window.unlockBadge = (badgeId) => gamificationManager.unlockBadge(badgeId);
window.recordDailyActivity = () => gamificationManager.recordDailyActivity();
window.updateGamificationUI = () => gamificationManager.updateUI();
window.openProfileModal = () => gamificationManager.openProfileModal();
window.closeProfileModal = () => gamificationManager.closeProfileModal();
window.showXPToast = (amount, reason) => gamificationManager.showXPToast(amount, reason);
window.showLevelUpModal = (lvl) => gamificationManager.showLevelUpModal(lvl);
window.closeLevelUpModal = () => gamificationManager.closeLevelUpModal();
window.markWorksheetCompleted = () => gamificationManager.markWorksheetCompleted();
window.getGamificationData = () => gamificationManager.getData();

// --- UIManager Bindings ---
window.navigateTo = (viewName) => uiManager.navigateTo(viewName);
window.selectLevel = (levelKey) => uiManager.selectLevel(levelKey);
window.selectClass = (classId) => uiManager.selectClass(classId);
window.selectLesson = (lessonId) => uiManager.selectLesson(lessonId);
window.goBack = () => uiManager.goBack();
window.updateBreadcrumbs = () => uiManager.updateBreadcrumbs();
window.renderClassSelectionView = () => uiManager.renderClassSelectionView();
window.renderCurriculumView = () => uiManager.renderCurriculumView();
window.renderTheoryView = () => uiManager.renderTheoryView();
window.openWorksheetModal = (lessonId) => uiManager.openWorksheetModal(lessonId);
window.closeWorksheetModal = () => uiManager.closeWorksheetModal();
window.setWorksheetDifficulty = (diff) => uiManager.setWorksheetDifficulty(diff);
window.toggleSingleSolution = (idx) => uiManager.toggleSingleSolution(idx);
window.toggleAllWorksheetSolutions = () => uiManager.toggleAllWorksheetSolutions();
window.printWorksheet = () => uiManager.printWorksheet();
window.showSimulationScreen = (screenName) => uiManager.showSimulationScreen(screenName);
window.startExamSimulation = (type) => uiManager.startExamSimulation(type);
window.toggleExamTimerPause = () => uiManager.toggleExamTimerPause();
window.switchExamTab = (tabIdx) => uiManager.switchExamTab(tabIdx);
window.selectExamAnswer = (subNum, itemNum, optionIdx) => uiManager.selectExamAnswer(subNum, itemNum, optionIdx);
window.confirmFinishExam = () => uiManager.confirmFinishExam();
window.finishExam = () => uiManager.finishExam();
window.toggleAllSolutionsExam = () => uiManager.toggleAllSolutionsExam();
window.renderKaTeX = () => uiManager.renderKaTeX();
window.handleQuizAnswer = (selectedIdx, correctIdx, btnEl) => uiManager.handleQuizAnswer(selectedIdx, correctIdx, btnEl);
window.goToAdjacentLesson = (direction) => uiManager.goToAdjacentLesson(direction);
window.toggleCompletedLesson = () => uiManager.toggleCompletedLesson();
window.toggleMobileMenu = () => uiManager.toggleMobileMenu();
window.closeMobileMenu = () => uiManager.closeMobileMenu();
window.openSearchModal = () => uiManager.openSearchModal();
window.closeSearchModal = () => uiManager.closeSearchModal();
window.handleSearch = (query) => uiManager.handleSearch(query);
window.openFromSearch = (levelKey, classId, lessonId) => uiManager.openFromSearch(levelKey, classId, lessonId);
window.findClassById = (classId) => uiManager.findClassById(classId);
window.findLessonById = (lessonId) => uiManager.findLessonById(lessonId);
window.findChapterOfLesson = (lessonId) => uiManager.findChapterOfLesson(lessonId);
window.copyToClipboard = (text, btnEl) => uiManager.copyToClipboard(text, btnEl);

// 4. Inițializare la încărcarea paginii
window.addEventListener('DOMContentLoaded', () => {
  themeManager.init();
  authService.bindEvents();
  authService.updateAuthUI();
  gamificationManager.updateUI();
  uiManager.init();
  uiManager.navigateTo('home');
  authService.checkSupabaseSessionOnLoad();
  setTimeout(() => uiManager.renderKaTeX(), 300);
  console.log("⚡ [MateHub] Aplicație inițializată cu arhitectură OOP și module ES6.");
});
