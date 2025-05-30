export function setAuthToken(token) {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    document.cookie = `token=${token}; path=/; SameSite=Strict`;
  }
}
