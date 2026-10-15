/**
 * MATEHUB - THEME MANAGER (OOP)
 * Controlează aplicarea temelor vizuale (Gaming, Spațiu, Cyberpunk, Minimal)
 * și persistența preferințelor utilizatorului în localStorage.
 */
class ThemeManager {
  constructor() {
    this.themes = {
      'theme-gaming': { name: 'Gaming', color: '#ec4899', icon: 'fa-gamepad' },
      'theme-space': { name: 'Spațiu', color: '#38bdf8', icon: 'fa-rocket' },
      'theme-cyberpunk': { name: 'Cyberpunk', color: '#eab308', icon: 'fa-bolt' },
      'theme-minimal': { name: 'Minimal', color: '#94a3b8', icon: 'fa-feather' }
    };
    this.currentTheme = localStorage.getItem('matehub_theme') || 'theme-gaming';

    // Auto-bind all methods to this instance and register globally
    for (const prop of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
      if (typeof this[prop] === 'function' && prop !== 'constructor') {
        this[prop] = this[prop].bind(this);
        window[prop] = this[prop];
      }
    }
  }

  /**
   * Inițializează tema salvată la încărcarea paginii și atașează listenerii globali
   */
  init() {
    const themeName = this.themes[this.currentTheme]?.name || 'Gaming';
    this.setTheme(this.currentTheme, themeName);
    this.bindEvents();
  }

  /**
   * Setează tema activă pe <body> și actualizează stocarea
   */
  setTheme(themeClass, themeName) {
    if (!this.themes[themeClass]) themeClass = 'theme-gaming';
    if (!themeName) themeName = this.themes[themeClass].name;

    document.body.classList.remove('theme-gaming', 'theme-space', 'theme-cyberpunk', 'theme-minimal');
    document.body.classList.add(themeClass);
    this.currentTheme = themeClass;
    localStorage.setItem('matehub_theme', themeClass);

    if (window.AppState) {
      window.AppState.theme = themeClass;
    }

    const currentThemeLabel = document.getElementById('currentThemeName');
    if (currentThemeLabel) currentThemeLabel.innerText = themeName;

    this.closeDropdown();
  }

  /**
   * Deschide / Închide meniul dropdown de teme
   */
  toggleDropdown() {
    const menu = document.getElementById('themeDropdownMenu');
    if (menu) menu.classList.toggle('hidden');
  }

  /**
   * Închide meniul dropdown de teme
   */
  closeDropdown() {
    const menu = document.getElementById('themeDropdownMenu');
    if (menu) menu.classList.add('hidden');
  }

  /**
   * Închide meniul la click în exterior
   */
  bindEvents() {
    document.addEventListener('click', (e) => {
      const btn = document.getElementById('themeMenuBtn');
      const menu = document.getElementById('themeDropdownMenu');
      if (btn && menu && !btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.add('hidden');
      }
    });
  }
}

if (typeof window !== 'undefined') { window.ThemeManager = ThemeManager; }
if (typeof module !== 'undefined' && module.exports) { module.exports = { ThemeManager }; }
