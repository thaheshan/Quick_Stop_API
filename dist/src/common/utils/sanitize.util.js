"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeMessage = sanitizeMessage;
exports.containsOffPlatformContact = containsOffPlatformContact;
const OFF_PLATFORM = [
    /\b\d{7,15}\b/g,
    /(?:https?:\/\/)?(?:wa\.me|whatsapp\.com)/gi,
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/gi,
];
function sanitizeMessage(text) {
    let safe = text;
    for (const pattern of OFF_PLATFORM) {
        safe = safe.replace(pattern, '[removed]');
    }
    return safe;
}
function containsOffPlatformContact(text) {
    return OFF_PLATFORM.some((p) => new RegExp(p.source, p.flags).test(text));
}
//# sourceMappingURL=sanitize.util.js.map