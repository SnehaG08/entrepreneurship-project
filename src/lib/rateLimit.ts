const attempts = new Map<string, { count: number; reset: number }>();
export function allowRequest(key: string, limit = 8, windowMs = 15 * 60_000) { const now = Date.now(); const hit = attempts.get(key); if (!hit || hit.reset < now) { attempts.set(key, { count: 1, reset: now + windowMs }); return true; } if (hit.count >= limit) return false; hit.count += 1; return true; }
