export interface Meeting {
    meeting_key: number;
    meeting_name: string;
    meeting_official_name: string;
    location: string;
    circuit_short_name: string;
    country_name: string;
    date_start: Date;
    date_end: Date;
    year: number;
    is_cancelled: boolean;
}

export interface Session {
    meeting_key: number;
    session_key: number;
    session_name: string;
    session_type: string;
    date_start: Date;
    date_end: Date;
    year: number;
    is_cancelled: boolean;
}

export interface SessionResult {
    session_key: number;
    driver_number: number;
    position: number;
}

export interface Driver {
  driver_number: number;
  full_name: string;
  team_name: string;
  // ...
}
