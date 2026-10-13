import { Driver, Meeting, Session, SessionResult } from "@/types/f1-types-v2";

const BASE_URL = 'https://api.openf1.org/v1';

// Cache for 5 minutes so every page load doesn't hit OpenF1 (it is rate limited)
async function getJson<T>(path: string, errorMessage: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`, { next: { revalidate: 300 } });
    if (!response.ok) {
        console.error(`Error fetching ${path}: ${response.status} ${response.statusText}`);
        throw new Error(errorMessage);
    }
    return response.json();
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