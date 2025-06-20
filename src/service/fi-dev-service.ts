import { 
    ChampionshipStandingResponse,
    ConstructorStandingResponse,
    DriverDetailResponse, 
    DriversResponse, 
    TeamDriversResponse, 
    TeamsResponse 
} from '../types/f1-types';

const BASE_URL = 'https://f1api.dev/api';
const currentYear = new Date().getFullYear();

export class F1Service {
    async getCurrentDrivers(): Promise<DriversResponse> {
        const response = await fetch(`${BASE_URL}/${currentYear}/drivers`);
        return response.json();
    }

    async getCurrentDriverDetails(driverId: string): Promise<DriverDetailResponse> {
        const response = await fetch(`${BASE_URL}/${currentYear}/drivers/${driverId}`);
        return response.json();
    }

    async getCurrentTeams(): Promise<TeamsResponse> {
        const response = await fetch(`${BASE_URL}/${currentYear}/teams`);
        return response.json();
    }

    async getCurrentTeamsDrivers(teamId: string): Promise<TeamDriversResponse> {
        const response = await fetch(`${BASE_URL}/${currentYear}/teams/${teamId}/drivers`);
        return response.json();
    }

    async getCurrentDriverStandings(): Promise<ChampionshipStandingResponse> {
        const response = await fetch(`${BASE_URL}/${currentYear}/drivers-championship`);
        return response.json();
    }

    async getCurrentConstructorStandings(): Promise<ConstructorStandingResponse> {
        const response = await fetch(`${BASE_URL}/${currentYear}/constructors-championship`);
        return response.json();
    }
}