// Base shared types
export interface TimingEvent {
    date: string | null;
    time: string | null;
}

export interface Schedule {
    race: TimingEvent;
    qualy: TimingEvent;
    fp1: TimingEvent;
    fp2: TimingEvent;
    fp3: TimingEvent;
    sprintQualy: TimingEvent;
    sprintRace: TimingEvent;
}

export interface FastLap {
    fast_lap: string | null;
    fast_lap_driver_id: string | null;
    fast_lap_team_id: string | null;
}

export interface Circuit {
    circuitId: string;
    circuitName: string;
    country: string;
    city: string;
    circuitLength: string;
    lapRecord: string;
    firstParticipationYear: number;
    corners: number;
    fastestLapDriverId: string;
    fastestLapTeamId: string;
    fastestLapYear: number;
    url: string;
}

export interface Driver {
    driverId: string;
    name: string;
    surname: string;
    nationality: string;
    birthday: string;
    number: number;
    shortName: string;
    url: string;
    teamId: string;
    points?: number;
    position?: number;
    wins?: number;
}

export interface Team {
    teamId: string;
    teamName: string;
    teamNationality: string;
    firstAppeareance: number;
    constructorsChampionships: number | null;
    driversChampionships: number | null;
    url: string;
    points?: number;
    position?: number;
    wins?: number;
}

export interface Championship {
    championshipId: string;
    championshipName: string;
    url: string;
    year: number;
}

export interface Race {
    raceId: string;
    championshipId: string;
    raceName: string | null;
    schedule: Schedule;
    laps: number | null;
    round: number;
    url: string | null;
    fast_lap: FastLap;
    circuit: Circuit;
    winner: Driver | null;
    teamWinner: Team | null;
}

// API Response interfaces
export interface BaseApiResponse {
    api: string;
    url: string;
    limit?: number;
    offset?: number;
    total: number;
    season: number | string;
}

export interface DriversResponse extends BaseApiResponse {
    championshipId: string;
    drivers: Driver[];
}

export interface DriverDetailResponse extends BaseApiResponse {
    driver: Driver;
    team: Team;
    results: Array<{
        race: Race;
        result: {
            finishingPosition: number;
            gridPosition: number;
            raceTime: string;
            pointsObtained: number;
            retired: boolean | null;
        };
        sprintResult: any | null;
    }>;
}

export interface TeamsResponse extends BaseApiResponse {
    championshipId: string;
    teams: Team[];
}

export interface TeamDetailResponse extends BaseApiResponse {
    team: Team[];
}

export interface TeamDriversResponse extends BaseApiResponse {
    teamId: string;
    team: Team;
    drivers: Array<{
        driver: Driver;
    }>;
}

export interface CircuitsResponse extends BaseApiResponse {
    circuits: Circuit[];
}

export interface CircuitDetailResponse extends BaseApiResponse {
    circuit: Circuit[];
}

export interface RaceScheduleResponse extends BaseApiResponse {
    round: number;
    championship: Championship;
    race: Race[];
}

export interface SeasonCalendarResponse extends BaseApiResponse {
    championship: Championship;
    races: Race[];
}

export interface QualifyingResult {
    classificationId: number;
    driverId: string;
    teamId: string;
    q1: string;
    q2: string;
    q3: string;
    gridPosition: number;
    driver: Driver;
    team: Team;
}

export interface SprintQualifyingResult {
    sprintQualyId: number;
    driverId: string;
    teamId: string;
    sq1: string;
    sq2: string;
    sq3: string;
    gridPosition: number;
    driver: Driver;
    team: Team;
}

export interface SprintRaceResult {
    sprintRaceId: number;
    driverId: string;
    teamId: string;
    position: number;
    gridPosition: number;
    points: number;
    driver: Driver;
    team: Team;
}

export interface RaceResult {
    position: number;
    points: number;
    grid: number;
    time: string;
    fastLap: string | null;
    retired: boolean | null;
    driver: Driver;
    team: Team;
}

export interface ChampionshipStandingResponse extends BaseApiResponse {
    championshipId: string;
    drivers_championship: Array<{
        classificationId: number;
        driverId: string;
        teamId: string;
        points: number;
        position: number;
        wins: number;
        driver: Driver;
        team: Team;
    }>;
}

export interface ConstructorStandingResponse extends BaseApiResponse {
    championshipId: string;
    constructors_championship: Array<{
        classificationId: number;
        teamId: string;
        points: number;
        position: number;
        wins: number;
        team: Team;
    }>;
}

export interface RaceResultsResponse extends BaseApiResponse {
    races: {
        round: number;
        date: string;
        time: string;
        raceName: string;
        circuit: Circuit;
        results: RaceResult[];
    }
}