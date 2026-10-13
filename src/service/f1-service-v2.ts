import { Driver, Meeting, Session, SessionResult } from "@/types/f1-types-v2";

const BASE_URL = 'https://api.openf1.org/v1';

// Cache for 5 minutes so every page load doesn't hit OpenF1 (it is rate limited)
async function getJson<T>(path: string, errorMessage: string, retries = 2): Promise<T> {
    for (let attempt = 0; ; attempt++) {
        // Caching happens one level up (unstable_cache), so don't cache individual calls here
        const response = await fetch(`${BASE_URL}${path}`, { cache: 'no-store' });
        if (response.ok) return response.json();

        if (response.status === 429 && attempt < retries) {
            const retryAfter = Number(response.headers.get('retry-after'));
            const delayMs = retryAfter > 0 ? retryAfter * 1000 : 1000 * 2 ** attempt;
            await new Promise((resolve) => setTimeout(resolve, delayMs));
            continue;
        }
        throw new Error(`${errorMessage} (HTTP ${response.status})`);
    }
}

export async function fetchMeetings(year: number = new Date().getFullYear()): Promise<Meeting[]> {
    return getJson(`/meetings?year=${year}`, 'Failed to fetch meetings');
}

// NEW: one call for every session in the season (avoids one request per meeting)
export async function fetchSessionsByYear(year: number = new Date().getFullYear()): Promise<Session[]> {
    return getJson(`/sessions?year=${year}`, 'Failed to fetch sessions');
}

export async function fetchSessions(meetingKey: number | string): Promise<Session[]> {
    return getJson(`/sessions?meeting_key=${meetingKey}`, 'Failed to fetch sessions');
}

export async function fetchSessionResults(sessionKey: number | string): Promise<SessionResult[]> {
    return getJson(`/session_result?session_key=${sessionKey}`, 'Failed to fetch session results');
}

// NEW: session_results only has driver_number, so we need this to get names
export async function fetchDrivers(sessionKey: number | string): Promise<Driver[]> {
    return getJson(`/drivers?session_key=${sessionKey}`, 'Failed to fetch drivers');
}