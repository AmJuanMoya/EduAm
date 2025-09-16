// Demo store en memoria (usa Redis/DB en producción)
import crypto from 'node:crypto';

const SESSIONS = new Map(); // sid -> { user, exp }
const TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 días

export function createSession(user) {
  const sid = crypto.randomUUID();
  SESSIONS.set(sid, { user, exp: Date.now() + TTL_MS });
  return sid;
}

export function getSession(sid) {
  if (!sid) return null;
  const s = SESSIONS.get(sid);
  if (!s) return null;
  if (Date.now() > s.exp) {
    SESSIONS.delete(sid);
    return null;
  }
  return s;
}

export function destroySession(sid) {
  if (!sid) return;
  SESSIONS.delete(sid);
}