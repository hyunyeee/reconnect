let isHandlingAuthExpire = false;

export function canHandleAuthExpire() {
  if (isHandlingAuthExpire) return false;
  isHandlingAuthExpire = true;
  return true;
}

// export function resetAuthExpireGuard() {
//   isHandlingAuthExpire = false;
// }
