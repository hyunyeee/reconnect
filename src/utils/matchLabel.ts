export function getMatchLabel(info: { targetInsta?: string; targetTiktok?: string }) {
  if (info.targetInsta) {
    return {
      label: "인스타그램",
      value: `@${info.targetInsta}`,
    };
  }

  if (info.targetTiktok) {
    return {
      label: "틱톡",
      value: `@${info.targetTiktok}`,
    };
  }

  return null;
}
