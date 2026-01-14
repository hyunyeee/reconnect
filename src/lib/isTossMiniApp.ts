export const isTossMiniApp = () => {
  if (typeof window === "undefined") return false;
  return (
    window.location.hostname.includes("apps.tossmini.com") ||
    window.location.hostname.includes("private-apps.tossmini.com")
  );
};
