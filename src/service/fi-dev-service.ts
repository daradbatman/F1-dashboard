import { 
    ChampionshipStandingResponse,
    ConstructorStandingResponse,
    DriverDetailResponse, 
    DriversResponse, 
    RaceResultsResponse, 
    RaceScheduleResponse, 
    SeasonCalendarResponse, 
    TeamDriversResponse, 
    TeamsResponse 
} from '../types/f1-types';

const BASE_URL = 'https://f1api.dev/api';
const currentYear = new Date().getFullYear();

export class F1Service {
    async getCurrentDrivers(): Promise<DriversResponse | null> {
        const response = await fetch(`${BASE_URL}/${currentYear}/drivers`, {
            next: { revalidate: 3600}
        });
        if (!response.ok) {
            return null;
        }

        return response.json();
    }

    async getCurrentDriverDetails(driverId: string): Promise<DriverDetailResponse | null> {
        const response = await fetch(`${BASE_URL}/${currentYear}/drivers/${driverId}`, {
            next: { revalidate: 3600}
        });
        if (!response.ok) {
            return null;
        }

        return response.json();
    }

    async getCurrentTeams(): Promise<TeamsResponse | null> {
        const response = await fetch(`${BASE_URL}/${currentYear}/teams`, {
            next: { revalidate: 3600}
        });
        if (!response.ok) {
            return null;
        }

        return response.json();
    }

    async getCurrentTeamsDrivers(teamId: string): Promise<TeamDriversResponse | null> {
        const response = await fetch(`${BASE_URL}/${currentYear}/teams/${teamId}/drivers`, {
            next: { revalidate: 3600}
        });
        if (!response.ok) {
            return null;
        }

        return response.json();
    }

    async getCurrentDriverStandings(): Promise<ChampionshipStandingResponse | null> {
        const response = await fetch(`${BASE_URL}/${currentYear}/drivers-championship`, {
            next: { revalidate: 3600}
        });
        if (!response.ok) {
            return null;
        }

        return response.json();
    }

    async getCurrentConstructorStandings(): Promise<ConstructorStandingResponse | null> {
        const response = await fetch(`${BASE_URL}/${currentYear}/constructors-championship`, {
            next: { revalidate: 3600}
        });
        if (!response.ok) {
            return null;
        }

        return response.json();
    }

    async getNextRaceSchedule(): Promise<RaceScheduleResponse | null> {
        const response = await fetch(`${BASE_URL}/current/next`, {
            next: { revalidate: 3600}
        });
        if (!response.ok) {
            return null;
        }

        return response.json();
    }

    async getPreviousRaceResult(): Promise<RaceResultsResponse | null> {
        const response = await fetch(`${BASE_URL}/current/last/race`, {
            next: { revalidate: 3600}
        });
        if (!response.ok) {            
            return null;
        }
        return response.json();
    }

    async getConstructorStandingsByYear(year: number): Promise<ConstructorStandingResponse | null> {
        const response = await fetch(`${BASE_URL}/${year}/constructors-championship`, {
            next: { revalidate: 3600}
        });
        if (!response.ok) {
            return null;
        }

        return response.json();
    }

    async getDriverStandingsByYear(year: number): Promise<ChampionshipStandingResponse | null> {
        const response = await fetch(`${BASE_URL}/${year}/drivers-championship`, {
            next: { revalidate: 3600}
        });
        if (!response.ok) {
            return null;
        }

        return response.json();
    }

    async getRaceScheduleByYear(year: number): Promise<SeasonCalendarResponse | null> {
        const response = await fetch(`${BASE_URL}/${year}`, {
            next: { revalidate: 3600}
        });
        if (!response.ok) {
            return null;
        }

        return response.json();
    }

    async getRaceResultsByYear(year: number, round: number): Promise<RaceResultsResponse | null> {
        const response = await fetch(`${BASE_URL}/${year}/${round}/race`, {
            next: { revalidate: 3600}
        });
        if (!response.ok) {
            return null;
        }

        return response.json();
    }

    async getFp1ResultsByYear(year: number, round: number): Promise<RaceResultsResponse | null> {
        const response = await fetch(`${BASE_URL}/${year}/${round}/fp1`, {
            next: { revalidate: 3600}
        });
        if (!response.ok) {
            return null;
        }

        return response.json();
    }

    async getFp2ResultsByYear(year: number, round: number): Promise<RaceResultsResponse | null> {
        const response = await fetch(`${BASE_URL}/${year}/${round}/fp2`, {
            next: { revalidate: 3600}
        });
        if (!response.ok) {
            return null;
        }

        return response.json();
    }

    async getFp3ResultsByYear(year: number, round: number): Promise<RaceResultsResponse | null> {
        const response = await fetch(`${BASE_URL}/${year}/${round}/fp3`, {
            next: { revalidate: 3600}
        });
        if (!response.ok) {
            return null;
        }

        return response.json();
    }

    async getQualyResultsByYear(year: number, round: number): Promise<RaceResultsResponse | null> {
        const response = await fetch(`${BASE_URL}/${year}/${round}/qualy`, {
            next: { revalidate: 3600}
        });
        if (!response.ok) {
            return null;
        }

        return response.json();
    }

    async getSprintRaceResultsByYear(year: number, round: number): Promise<RaceResultsResponse | null> {
        const response = await fetch(`${BASE_URL}/${year}/${round}/sprint/race`, {
            next: { revalidate: 3600}
        });
        if (!response.ok) {
            return null;
        }

        return response.json();
    }

    async getSprintQualyResultsByYear(year: number, round: number): Promise<RaceResultsResponse | null> {
        const response = await fetch(`${BASE_URL}/${year}/${round}/sprint/qualy`, {
            next: { revalidate: 3600}
        });
        if (!response.ok) {
            return null;
        }

        return response.json();
    }

    async getPredictions(): Promise<any[] | null> {
        const response = await fetch("https://f1-race-predictor-210638339309.us-central1.run.app/predictions", {cache: 'no-store'})
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data
    }
}