/** Regex patterns for off-platform contact detection */
const OFF_PLATFORM = [
  /\b\d{7,15}\b/g,
  /(?:https?:\/\/)?(?:wa\.me|whatsapp\.com)/gi,
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/gi,
];

export function sanitizeMessage(text: string): string {
  let safe = text;
  for (const pattern of OFF_PLATFORM) {
    safe = safe.replace(pattern, '[removed]');
  }
  return safe;
}

export function containsOffPlatformContact(text: string): boolean {
  return OFF_PLATFORM.some((p) => new RegExp(p.source, p.flags).test(text));
}
