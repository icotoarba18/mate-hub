/**
 * MATEHUB - AUTH SERVICE (OOP)
 * Gestionează autentificarea cu Supabase Cloud (Sign In, Sign Up, Log Out, Session Restore)
 * și sincronizarea progresului utilizatorului în cloud și fallback local.
 */
class AuthService {
  constructor() {
    this.supabaseUrl = "https://wmgsdltdafjzzmmvermx.supabase.co";
    this.supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtZ3NkbHRkYWZqenptbXZlcm14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwNTUxMTcsImV4cCI6MjEwNzYzMTExN30.lSluKz4xibSEMHHt-AP2H_-tto0gkNStojofwvxhnIQ";
    this.client = null;

    // Auto-bind all methods to this instance and register globally
    for (const prop of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
      if (typeof this[prop] === 'function' && prop !== 'constructor') {
        this[prop] = this[prop].bind(this);
        window[prop] = this[prop];
      }
    }
  }

  /**
   * Verifică dacă parametrii Supabase sunt configurați cu valori valide
   */
  isConfigured() {
    return typeof this.supabaseUrl === 'string' &&
           typeof this.supabaseAnonKey === 'string' &&
           this.supabaseUrl.startsWith("https://") &&
           !this.supabaseUrl.includes("XYZ_INLOCUIESTE") &&
           !this.supabaseAnonKey.includes("INLOCUIESTE") &&
           this.supabaseAnonKey.length > 25;
  }

  /**
   * Returnează instanța Supabase Client
   */
  getClient() {
    if (!this.client && typeof window.supabase !== 'undefined' && this.isConfigured()) {
      try {
        this.client = window.supabase.createClient(this.supabaseUrl, this.supabaseAnonKey);
        console.log("⚡ [MateHub] AuthService: Supabase Client conectat la:", this.supabaseUrl);
      } catch (err) {
        console.warn("⚠️ [MateHub] AuthService: Eroare la inițializarea Supabase:", err);
      }
    }
    return this.client;
  }

  /**
   * Actualizează insigna vizuală de conexiune la cloud
   */
  updateSupabaseStatusBadge() {
    const badge = document.getElementById('supabaseConnectionStatusBadge');
    if (!badge) return;
    if (this.isConfigured()) {
      badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400"></span><span class="text-emerald-300">Supabase Conectat</span>`;
    } else {
      badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-400"></span><span class="text-gray-400">Mod Local (Introdu cheile Supabase)</span>`;
    }
  }

  /**
   * Baza de date locală ca fallback
   */
  getUsersDatabase() {
    try {
      const raw = localStorage.getItem('matehub_users_db');
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  saveUsersDatabase(db) {
    localStorage.setItem('matehub_users_db', JSON.stringify(db));
  }

  /**
   * Obține sesiunea activă
   */
  getCurrentSession() {
    try {
      const raw = localStorage.getItem('matehub_session');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  /**
   * Salvează sesiunea activă și actualizează interfața
   */
  saveCurrentSession(session) {
    if (session) {
      localStorage.setItem('matehub_session', JSON.stringify(session));
    } else {
      localStorage.removeItem('matehub_session');
    }
    this.updateAuthUI();
    if (window.gamificationManager) {
      window.gamificationManager.updateUI();
    }
  }

  /**
   * Modale & Interfață Autentificare
   */
  openAuthModal(tab = 'signin') {
    this.switchAuthTab(tab);
    this.updateSupabaseStatusBadge();
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    this.hideAuthAlerts();
  }

  closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    this.hideAuthAlerts();
  }

  switchAuthTab(tab) {
    const btnIn = document.getElementById('tabBtnSignIn');
    const btnUp = document.getElementById('tabBtnSignUp');
    const formIn = document.getElementById('authFormSignIn');
    const formUp = document.getElementById('authFormSignUp');
    this.hideAuthAlerts();

    if (tab === 'signin') {
      if (btnIn) btnIn.className = "py-3.5 text-center transition flex items-center justify-center gap-2 themed-btn text-black font-black shadow-sm";
      if (btnUp) btnUp.className = "py-3.5 text-center transition flex items-center justify-center gap-2 text-gray-400 hover:text-white";
      if (formIn) formIn.classList.remove('hidden');
      if (formUp) formUp.classList.add('hidden');
    } else {
      if (btnUp) btnUp.className = "py-3.5 text-center transition flex items-center justify-center gap-2 themed-btn text-black font-black shadow-sm";
      if (btnIn) btnIn.className = "py-3.5 text-center transition flex items-center justify-center gap-2 text-gray-400 hover:text-white";
      if (formUp) formUp.classList.remove('hidden');
      if (formIn) formIn.classList.add('hidden');
    }
  }

  hideAuthAlerts() {
    const alertIn = document.getElementById('signInErrorAlert');
    const alertUp = document.getElementById('signUpErrorAlert');
    if (alertIn) alertIn.classList.add('hidden');
    if (alertUp) alertUp.classList.add('hidden');
  }

  togglePasswordVisibility(inputId, btnEl) {
    const input = document.getElementById(inputId);
    if (!input) return;
    if (input.type === 'password') {
      input.type = 'text';
      btnEl.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Ascunde';
    } else {
      input.type = 'password';
      btnEl.innerHTML = '<i class="fa-regular fa-eye"></i> Arată';
    }
  }

  /**
   * SIGN UP (Înregistrare cu Supabase Auth + Profil Cloud)
   */
  async handleSignUpSubmit(e) {
    e.preventDefault();
    this.hideAuthAlerts();

    const name = document.getElementById('signUpName').value.trim();
    const grade = document.getElementById('signUpGrade').value;
    const email = document.getElementById('signUpEmail').value.trim().toLowerCase();
    const password = document.getElementById('signUpPassword').value;
    const confirmPassword = document.getElementById('signUpConfirmPassword').value;

    const alertEl = document.getElementById('signUpErrorAlert');
    const alertText = document.getElementById('signUpErrorText');

    if (!name || !email || !password) {
      alertText.innerText = "Te rugăm să completezi toate câmpurile obligatorii.";
      alertEl.classList.remove('hidden');
      return;
    }

    if (password.length < 6) {
      alertText.innerText = "Parola trebuie să conțină minimum 6 caractere.";
      alertEl.classList.remove('hidden');
      return;
    }

    if (password !== confirmPassword) {
      alertText.innerText = "Parolele introduse nu coincid.";
      alertEl.classList.remove('hidden');
      return;
    }

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const origBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Se creează contul...';

    // 1. Supabase Auth
    const sb = this.getClient();
    if (sb) {
      try {
        const { data, error } = await sb.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              full_name: name,
              grade: grade
            }
          }
        });

        if (error) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origBtnText;
          alertText.innerText = error.message || "Eroare la crearea contului pe Supabase.";
          alertEl.classList.remove('hidden');
          return;
        }

        if (data && data.user) {
          const gm = window.gamificationManager;
          const guestGamification = gm ? gm.getData() : { xp: 0, streak: 1 };
          const guestLessons = (window.AppState && window.AppState.completedLessons) || [];
          guestGamification.xp = (guestGamification.xp || 0) + 100; // Bonus +100 XP

          const profilePayload = {
            id: data.user.id,
            email: email,
            full_name: name,
            grade: grade,
            xp: guestGamification.xp,
            streak: guestGamification.streak || 1,
            best_streak: guestGamification.bestStreak || 1,
            last_active_date: guestGamification.lastActiveDate || new Date().toISOString().split('T')[0],
            completed_lessons: guestLessons,
            unlocked_badges: guestGamification.unlockedBadges || {},
            worksheets_count: guestGamification.worksheetsCount || 0,
            exams_count: guestGamification.examsCount || 0,
            updated_at: new Date().toISOString()
          };

          const { error: profileErr } = await sb.from('profiles').upsert(profilePayload);
          if (profileErr) {
            console.warn("Avertisment upsert profil Supabase:", profileErr);
          }

          this.saveCurrentSession({
            id: data.user.id,
            email: email,
            name: name,
            grade: grade,
            avatar: name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'MH'
          });

          if (gm) gm.saveData(guestGamification);
          localStorage.setItem('matehub_completed', JSON.stringify(guestLessons));

          submitBtn.disabled = false;
          submitBtn.innerHTML = origBtnText;
          this.closeAuthModal();

          if (gm) gm.showXPToast(100, `Cont salvat în cloud Supabase! Bun venit, ${name}! 🎉`);
          this.showCelebrationBanner(`Contul tău a fost creat pe Supabase! Progresul tău este sincronizat în cloud.`);
          return;
        }
      } catch (sbErr) {
        console.warn("Eroare neașteptată Supabase signUp, folosim modul local:", sbErr);
      }
    }

    // 2. Modul Local Fallback
    const db = this.getUsersDatabase();
    if (db[email]) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = origBtnText;
      alertText.innerHTML = `Un cont cu adresa <strong>${email}</strong> există deja. <a href="javascript:authService.switchAuthTab('signin')" class="underline font-bold text-white">Conectează-te aici</a>.`;
      alertEl.classList.remove('hidden');
      return;
    }

    const gm = window.gamificationManager;
    const currentGamification = gm ? gm.getData() : { xp: 0, streak: 1 };
    currentGamification.xp = (currentGamification.xp || 0) + 100;

    const newUser = {
      name: name,
      grade: grade,
      email: email,
      password: password,
      avatar: name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'MH',
      createdAt: new Date().toISOString(),
      gamification: currentGamification,
      completedLessons: (window.AppState && window.AppState.completedLessons) || []
    };

    db[email] = newUser;
    this.saveUsersDatabase(db);

    this.saveCurrentSession({
      email: newUser.email,
      name: newUser.name,
      grade: newUser.grade,
      avatar: newUser.avatar
    });

    if (gm) gm.saveData(currentGamification);

    submitBtn.disabled = false;
    submitBtn.innerHTML = origBtnText;
    this.closeAuthModal();

    if (gm) gm.showXPToast(100, `Cont creat cu succes! Bun venit, ${name}! 🎉`);
    this.showCelebrationBanner(`Ai primit +100 XP pentru crearea contului MateHub!`);
  }

  /**
   * SIGN IN (Autentificare cu Supabase Auth + Profil Cloud)
   */
  async handleSignInSubmit(e) {
    e.preventDefault();
    this.hideAuthAlerts();

    const email = document.getElementById('signInEmail').value.trim().toLowerCase();
    const password = document.getElementById('signInPassword').value;

    const alertEl = document.getElementById('signInErrorAlert');
    const alertText = document.getElementById('signInErrorText');

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const origBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Se verifică datele...';

    // 1. Supabase Auth
    const sb = this.getClient();
    if (sb) {
      try {
        const { data, error } = await sb.auth.signInWithPassword({
          email: email,
          password: password
        });

        if (error) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origBtnText;
          const msg = error.message === 'Invalid login credentials' 
            ? "Email sau parolă incorectă." 
            : (error.message || "Eroare la autentificare pe Supabase.");
          alertText.innerText = msg;
          alertEl.classList.remove('hidden');
          return;
        }

        if (data && data.user) {
          const { data: profile } = await sb.from('profiles').select('*').eq('id', data.user.id).single();
          const fullName = (profile && profile.full_name) || data.user.user_metadata?.full_name || 'Elev';
          const grade = (profile && profile.grade) || data.user.user_metadata?.grade || 'Gimnaziu / Liceu';

          if (profile) {
            const cloudGamification = {
              xp: profile.xp || 0,
              streak: profile.streak || 1,
              bestStreak: profile.best_streak || 1,
              lastActiveDate: profile.last_active_date,
              unlockedBadges: profile.unlocked_badges || {},
              lessonsCount: (profile.completed_lessons || []).length,
              worksheetsCount: profile.worksheets_count || 0,
              examsCount: profile.exams_count || 0
            };
            if (window.gamificationManager) window.gamificationManager.saveData(cloudGamification);

            if (profile.completed_lessons && window.AppState) {
              window.AppState.completedLessons = profile.completed_lessons;
              localStorage.setItem('matehub_completed', JSON.stringify(profile.completed_lessons));
            }
          }

          this.saveCurrentSession({
            id: data.user.id,
            email: data.user.email,
            name: fullName,
            grade: grade,
            avatar: fullName.slice(0, 2).toUpperCase()
          });

          submitBtn.disabled = false;
          submitBtn.innerHTML = origBtnText;
          this.closeAuthModal();
          if (window.gamificationManager) {
            window.gamificationManager.showXPToast(20, `Bine ai revenit, ${fullName}! Sincronizat cu Supabase ☁️`);
          }
          return;
        }
      } catch (sbErr) {
        console.warn("Eroare conexiune Supabase signIn:", sbErr);
      }
    }

    // 2. Modul Local Fallback
    const db = this.getUsersDatabase();
    const user = db[email];

    if (!user) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = origBtnText;
      alertText.innerHTML = `Nu am găsit niciun cont cu emailul <strong>${email}</strong>. <a href="javascript:authService.switchAuthTab('signup')" class="underline font-bold text-white">Creează un cont nou?</a>`;
      alertEl.classList.remove('hidden');
      return;
    }

    if (user.password !== password) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = origBtnText;
      alertText.innerText = "Parolă incorectă. Te rugăm să verifici parola și să încerci din nou.";
      alertEl.classList.remove('hidden');
      return;
    }

    if (user.gamification && window.gamificationManager) {
      window.gamificationManager.saveData(user.gamification);
    }
    if (user.completedLessons && window.AppState) {
      window.AppState.completedLessons = user.completedLessons;
      localStorage.setItem('matehub_completed', JSON.stringify(user.completedLessons));
    }

    this.saveCurrentSession({
      email: user.email,
      name: user.name,
      grade: user.grade,
      avatar: user.avatar || user.name.slice(0, 2).toUpperCase()
    });

    submitBtn.disabled = false;
    submitBtn.innerHTML = origBtnText;
    this.closeAuthModal();
    if (window.gamificationManager) {
      window.gamificationManager.showXPToast(20, `Bine ai revenit, ${user.name}! 🚀`);
    }
  }

  showDemoCredentials() {
    const db = this.getUsersDatabase();
    const demoEmail = "demo@matehub.ro";
    if (!db[demoEmail]) {
      db[demoEmail] = {
        name: "Alexandru Popa",
        grade: "Clasa a VIII-a (Evaluare Națională)",
        email: demoEmail,
        password: "parola123",
        avatar: "AP",
        createdAt: new Date().toISOString(),
        gamification: {
          xp: 450,
          streak: 3,
          bestStreak: 5,
          lastActiveDate: new Date().toISOString().split('T')[0],
          unlockedBadges: { "first_lesson": "15.10.2026", "streak_3": "15.10.2026" },
          examsCount: 1,
          worksheetsCount: 2
        },
        completedLessons: ["viii-1-1", "viii-2-1"]
      };
      this.saveUsersDatabase(db);
    }

    const emailInput = document.getElementById('signInEmail');
    const passInput = document.getElementById('signInPassword');
    if (emailInput) emailInput.value = demoEmail;
    if (passInput) passInput.value = "parola123";
  }

  /**
   * LOG OUT
   */
  async logOutUser() {
    const sb = this.getClient();
    if (sb) {
      try {
        await sb.auth.signOut();
      } catch (e) {
        console.warn("Eroare la signOut Supabase:", e);
      }
    }

    const session = this.getCurrentSession();
    if (session) {
      const db = this.getUsersDatabase();
      if (db[session.email]) {
        if (window.gamificationManager) db[session.email].gamification = window.gamificationManager.getData();
        if (window.AppState) db[session.email].completedLessons = window.AppState.completedLessons || [];
        this.saveUsersDatabase(db);
      }
    }

    this.saveCurrentSession(null);
    this.closeUserMenu();
    if (window.gamificationManager) {
      window.gamificationManager.showXPToast(0, "Te-ai deconectat cu succes.");
    }
  }

  /**
   * Sincronizare automată în profilul din Supabase
   */
  async syncProgressToSupabase() {
    const sb = this.getClient();
    const session = this.getCurrentSession();
    if (!sb || !session || !session.id) return;

    try {
      const gm = window.gamificationManager;
      const gData = gm ? gm.getData() : {};
      const { error } = await sb.from('profiles').update({
        xp: gData.xp,
        streak: gData.streak,
        best_streak: gData.bestStreak,
        last_active_date: gData.lastActiveDate,
        unlocked_badges: gData.unlockedBadges,
        completed_lessons: (window.AppState && window.AppState.completedLessons) || [],
        worksheets_count: gData.worksheetsCount || 0,
        exams_count: gData.examsCount || 0,
        updated_at: new Date().toISOString()
      }).eq('id', session.id);

      if (error) {
        console.warn("Avertisment sincronizare profil Supabase:", error);
      }
    } catch (err) {
      console.warn("Eroare sincronizare cloud Supabase:", err);
    }
  }

  /**
   * Verifică la pornire sesiunea Supabase
   */
  async checkSupabaseSessionOnLoad() {
    const sb = this.getClient();
    if (!sb) return;

    try {
      const { data: { session } } = await sb.auth.getSession();
      if (session && session.user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', session.user.id).single();
        if (profile) {
          const gData = {
            xp: profile.xp || 0,
            streak: profile.streak || 1,
            bestStreak: profile.best_streak || 1,
            lastActiveDate: profile.last_active_date,
            unlockedBadges: profile.unlocked_badges || {},
            lessonsCount: (profile.completed_lessons || []).length,
            worksheetsCount: profile.worksheets_count || 0,
            examsCount: profile.exams_count || 0
          };
          if (window.gamificationManager) window.gamificationManager.saveData(gData);
          if (profile.completed_lessons && window.AppState) {
            window.AppState.completedLessons = profile.completed_lessons;
            localStorage.setItem('matehub_completed', JSON.stringify(profile.completed_lessons));
          }
          this.saveCurrentSession({
            id: session.user.id,
            email: session.user.email,
            name: profile.full_name || session.user.user_metadata?.full_name || 'Elev',
            grade: profile.grade || session.user.user_metadata?.grade || 'Gimnaziu / Liceu',
            avatar: (profile.full_name || session.user.email).slice(0, 2).toUpperCase()
          });
        }
      }
    } catch (err) {
      console.warn("Nu s-a putut restaura sesiunea Supabase:", err);
    }
  }

  toggleUserMenu() {
    const menu = document.getElementById('userDropdownMenu');
    if (menu) menu.classList.toggle('hidden');
  }

  closeUserMenu() {
    const menu = document.getElementById('userDropdownMenu');
    if (menu) menu.classList.add('hidden');
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Actualizează interfața din Header și Meniu Mobil
   */
  updateAuthUI() {
    const headerContainer = document.getElementById('authHeaderContainer');
    const drawerContainer = document.getElementById('mobileDrawerAuth');
    const session = this.getCurrentSession();

    if (!session) {
      // UTILIZATOR NEAUTENTIFICAT
      if (headerContainer) {
        headerContainer.innerHTML = `
          <button onclick="authService.openAuthModal('signin')" 
                  class="px-3 py-1.5 text-xs font-semibold rounded-xl text-gray-300 hover:text-white hover:bg-white/[0.08] transition whitespace-nowrap flex items-center gap-1.5">
            <i class="fa-regular fa-user text-[11px] text-gray-400"></i>
            <span>Autentificare</span>
          </button>
          <button onclick="authService.openAuthModal('signup')" 
                  class="px-3.5 py-1.5 text-xs font-bold rounded-xl themed-btn text-black shadow-md hover:brightness-110 transition whitespace-nowrap flex items-center gap-1.5">
            <i class="fa-solid fa-sparkles text-[10px]"></i>
            <span>Cont Nou</span>
          </button>
        `;
      }

      if (drawerContainer) {
        drawerContainer.innerHTML = `
          <div class="space-y-2">
            <button onclick="uiManager.toggleMobileMenu(); authService.openAuthModal('signin');" 
                    class="w-full py-2.5 px-4 rounded-xl text-center text-xs font-semibold text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 transition flex items-center justify-center gap-2">
              <i class="fa-regular fa-user text-xs"></i>
              <span>Autentificare</span>
            </button>
            <button onclick="uiManager.toggleMobileMenu(); authService.openAuthModal('signup');" 
                    class="w-full py-2.5 px-4 rounded-xl text-center text-xs font-bold themed-btn text-black shadow transition flex items-center justify-center gap-2">
              <i class="fa-solid fa-sparkles text-xs"></i>
              <span>Creează Cont Nou</span>
            </button>
          </div>
        `;
      }
    } else {
      // UTILIZATOR CONECTAT
      const initials = session.avatar || (session.name ? session.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() : 'MH');
      const cleanName = this.escapeHtml(session.name || 'Elev');
      const cleanEmail = this.escapeHtml(session.email || '');
      const cleanGrade = this.escapeHtml(session.grade || 'Elev');

      if (headerContainer) {
        headerContainer.innerHTML = `
          <div class="relative" id="userMenuWrapper">
            <button onclick="authService.toggleUserMenu()" class="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition group text-left">
              <div class="w-7 h-7 rounded-lg themed-btn flex items-center justify-center text-black font-extrabold text-xs shadow-sm">
                ${initials}
              </div>
              <div class="hidden xl:flex flex-col text-left">
                <span class="text-xs font-bold text-white leading-tight max-w-[110px] truncate">${cleanName}</span>
                <span class="text-[10px] text-gray-400 leading-tight">Conectat</span>
              </div>
              <i class="fa-solid fa-chevron-down text-[10px] text-gray-400 group-hover:text-white transition"></i>
            </button>

            <div id="userDropdownMenu" class="hidden absolute right-0 mt-2 w-56 glass-card rounded-2xl p-2 shadow-2xl z-50 border border-white/10 animate-fadeIn">
              <div class="px-3 py-2.5 border-b border-white/10 mb-1">
                <div class="text-xs font-bold text-white truncate">${cleanName}</div>
                <div class="text-[11px] text-gray-400 truncate">${cleanEmail}</div>
                <div class="text-[10px] text-amber-400 font-medium mt-0.5 truncate">${cleanGrade}</div>
              </div>
              <button onclick="authService.closeUserMenu(); gamificationManager.openProfileModal();" class="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-white/10 text-gray-200 flex items-center gap-2.5 transition">
                <i class="fa-solid fa-award text-yellow-400 w-4"></i> Profil & Realizări
              </button>
              <div class="h-px bg-white/10 my-1"></div>
              <button onclick="authService.logOutUser()" class="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-red-500/20 text-red-400 flex items-center gap-2.5 transition font-semibold">
                <i class="fa-solid fa-arrow-right-from-bracket text-red-400 w-4"></i> Deconectare
              </button>
            </div>
          </div>
        `;
      }

      if (drawerContainer) {
        drawerContainer.innerHTML = `
          <div class="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl themed-btn flex items-center justify-center text-black font-extrabold text-sm shadow">
                ${initials}
              </div>
              <div class="overflow-hidden">
                <div class="text-xs font-bold text-white truncate">${cleanName}</div>
                <div class="text-[11px] text-gray-400 truncate">${cleanEmail}</div>
                <div class="text-[10px] text-amber-400 font-medium truncate">${cleanGrade}</div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
              <button onclick="uiManager.toggleMobileMenu(); gamificationManager.openProfileModal();" class="py-2 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[11px] font-semibold text-gray-200 flex items-center justify-center gap-1.5 transition">
                <i class="fa-solid fa-award text-yellow-400"></i> Profil
              </button>
              <button onclick="uiManager.toggleMobileMenu(); authService.logOutUser();" class="py-2 px-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-[11px] font-semibold text-red-400 flex items-center justify-center gap-1.5 transition">
                <i class="fa-solid fa-arrow-right-from-bracket"></i> Ieșire
              </button>
            </div>
          </div>
        `;
      }
    }
  }

  showCelebrationBanner(message) {
    const banner = document.createElement('div');
    banner.className = "fixed top-20 left-1/2 transform -translate-x-1/2 z-50 glass-card px-5 py-3 rounded-2xl border border-emerald-400/50 shadow-2xl text-xs sm:text-sm font-bold text-white flex items-center gap-2.5 animate-fadeIn";
    banner.innerHTML = `<i class="fa-solid fa-sparkles text-amber-400 text-base"></i> <span>${message}</span>`;
    document.body.appendChild(banner);
    setTimeout(() => {
      banner.style.opacity = '0';
      banner.style.transition = 'opacity 0.4s ease';
      setTimeout(() => banner.remove(), 400);
    }, 3500);
  }

  bindEvents() {
    document.addEventListener('click', (e) => {
      const wrapper = document.getElementById('userMenuWrapper');
      if (wrapper && !wrapper.contains(e.target)) {
        this.closeUserMenu();
      }
    });
  }
}

if (typeof window !== 'undefined') { window.AuthService = AuthService; }
if (typeof module !== 'undefined' && module.exports) { module.exports = { AuthService }; }
