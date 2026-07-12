/* ==========================================================================
   VIVAHA — AUTH (demo)
   There is no backend in this project, so accounts live in localStorage.
   This is sufficient to demo the full flow end-to-end, but is NOT secure —
   wire this up to a real auth provider / API before going to production.
   ========================================================================== */

const VivahaAuth = (() => {
  const USERS_KEY = "vivaha_users";
  const SESSION_KEY = "vivaha_current_user";

  function getUsers() { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); }
  function saveUsers(users) { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }

  // Not real security — just avoids storing raw passwords in plain view.
  function obfuscate(str) { return btoa(unescape(encodeURIComponent(str))); }

  function register({ fullName, email, phone, weddingDate, password }) {
    const users = getUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, reason: "exists" };
    }
    users.push({
      id: "u_" + Date.now(),
      fullName, email, phone, weddingDate,
      passwordHash: obfuscate(password),
      createdAt: new Date().toISOString()
    });
    saveUsers(users);
    return { ok: true };
  }

  function login({ email, password }) {
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === obfuscate(password));
    if (!user) return { ok: false };
    const { passwordHash, ...safeUser } = user;
    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
    return { ok: true, user: safeUser };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  function currentUser() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch { return null; }
  }

  function isLoggedIn() { return !!currentUser(); }

  function updateProfile(patch) {
    const user = currentUser();
    if (!user) return;
    const merged = { ...user, ...patch };
    localStorage.setItem(SESSION_KEY, JSON.stringify(merged));
    const users = getUsers().map(u => u.id === user.id ? { ...u, ...patch } : u);
    saveUsers(users);
  }

  // Redirects to login if not authenticated; call at the top of protected pages.
  function requireAuth(redirectTo = "login.html") {
    if (!isLoggedIn()) {
      sessionStorage.setItem("vivaha_redirect_after_login", location.pathname.split("/").pop());
      location.href = redirectTo;
      return false;
    }
    return true;
  }

  function seedDemoUserIfEmpty() {
    // Gives reviewers something to log in with immediately.
    if (getUsers().length === 0) {
      register({
        fullName: "Ananya Sharma", email: "demo@vivaha.in", phone: "9876543210",
        weddingDate: "2027-01-18", password: "demo1234"
      });
    }
  }

  return { register, login, logout, currentUser, isLoggedIn, updateProfile, requireAuth, seedDemoUserIfEmpty };
})();

VivahaAuth.seedDemoUserIfEmpty();
