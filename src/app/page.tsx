import { F1Service } from "@/service/fi-dev-service";
import {
  fetchDrivers,
  fetchMeetings,
  fetchSessionResults,
  fetchSessionsByYear,
} from "@/service/f1-service-v2";
import { HeroBanner } from "@/components/ui/hero_banner";
import { PodiumEntry, PreviousBanner } from "@/components/ui/previous_banner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Meeting, Session } from "@/types/f1-types-v2";
import Image from "next/image";

const byStart = (a: Session, b: Session) =>
  new Date(a.date_start).getTime() - new Date(b.date_start).getTime();

async function getBannerData(year: number) {
  let meetings: Meeting[] = [];
  let sessions: Session[] = [];
  try {
    [meetings, sessions] = await Promise.all([
      fetchMeetings(year),
      fetchSessionsByYear(year),
    ]);
  } catch {
    return { nextMeeting: undefined, nextSession: undefined, prevMeeting: undefined, podium: [] as PodiumEntry[] };
  }

  // Skip pre-season testing etc.
  const grandPrix = meetings.filter((m) => m.meeting_name.includes("Grand Prix"));
  const gpKeys = new Set(grandPrix.map((m) => m.meeting_key));
  const gpSessions = sessions.filter((s) => gpKeys.has(s.meeting_key)).sort(byStart);

  const now = Date.now();

  // Next event: the first session (FP1, Quali, Sprint, Race...) that hasn't started yet
  const nextSession = gpSessions.find((s) => new Date(s.date_start).getTime() > now);
  const nextMeeting = grandPrix.find((m) => m.meeting_key === nextSession?.meeting_key);

  // Previous race: the most recent "Race" session that has finished
  const prevRaceSession = [...gpSessions]
    .reverse()
    .find((s) => s.session_name === "Race" && new Date(s.date_end).getTime() < now);
  const prevMeeting = grandPrix.find((m) => m.meeting_key === prevRaceSession?.meeting_key);
  console.log("prevRaceSession", prevRaceSession, "prevMeeting", prevMeeting);

  let podium: PodiumEntry[] = [];
  if (prevRaceSession) {
    try {
      const [results, drivers] = await Promise.all([
        fetchSessionResults(prevRaceSession.session_key),
        fetchDrivers(prevRaceSession.session_key),
      ]);
      console.log("results", results, "drivers", drivers);
      const nameByNumber = new Map(drivers.map((d) => [d.driver_number, d.full_name]));
      podium = results
        .filter((r) => r.position != null && r.position <= 3)
        .sort((a, b) => a.position - b.position)
        .map((r) => ({
          position: r.position,
          name: nameByNumber.get(r.driver_number) ?? `#${r.driver_number}`,
        }));
    } catch {
      console.error("Failed to fetch podium data for previous race session", prevRaceSession.session_key);
    }
  }

  return { nextMeeting, nextSession, prevMeeting, podium };
}

export default async function Home() {
  const f1Service = new F1Service();
  const currentYear = new Date().getFullYear();

  const [standings, constructorStandings, banners] = await Promise.all([
    f1Service.getCurrentDriverStandings(),
    f1Service.getCurrentConstructorStandings(),
    getBannerData(currentYear),
  ]);

  const { nextMeeting, nextSession, prevMeeting, podium } = banners;

  const topThreeDrivers = standings?.drivers_championship.slice(0, 3) || [];
  const topThreeConstructors = constructorStandings?.constructors_championship.slice(0, 3) || [];

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen mt-0 pt-2 pb-12 px-2 gap-0 sm:pt-4 sm:px-8 font-[family-name:var(--font-geist-sans)]">
      <div className="row-start-1 w-full flex flex-col items-center sm:items-start">
        <PreviousBanner meeting={prevMeeting} podium={podium} />
        <HeroBanner meeting={nextMeeting} nextSession={nextSession} />

        {/* Top 3 Drivers Table */}
        <div className="w-full mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Top 3 Drivers</h2>
          <div className="w-full overflow-x-auto rounded-md border">
            <Table className="w-full text-xs sm:text-sm lg:text-base">
              <TableHeader>
                <TableRow>
                  <TableHead className="px-1 sm:px-2">Pos</TableHead>
                  <TableHead className="px-1 sm:px-2">Driver</TableHead>
                  <TableHead className="px-1 sm:px-2 hidden sm:table-cell">Team</TableHead>
                  <TableHead className="px-1 sm:px-2">Pts</TableHead>
                  <TableHead className="px-1 sm:px-2 hidden sm:table-cell">Wins</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topThreeDrivers.map((standing) => (
                  <TableRow key={standing.classificationId}>
                    <TableCell className="px-1 sm:px-2 py-2">
                      <span
                        style={{
                          color:
                            standing.position === 1
                              ? "gold"
                              : standing.position === 2
                              ? "silver"
                              : standing.position === 3
                              ? "#cd7f32"
                              : "inherit",
                        }}
                      >
                        {standing.position}
                      </span>
                    </TableCell>
                    <TableCell className="px-1 sm:px-2 py-2">
                      <span className="text-xs sm:text-sm">
                        {standing.driver.name.split(" ")[0]} {standing.driver.surname}
                      </span>
                    </TableCell>
                    <TableCell className="px-1 sm:px-2 py-2 hidden sm:table-cell">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Image
                          src={`/${standing.teamId}.svg`}
                          alt={standing.team.teamName}
                          width={16}
                          height={16}
                          className="sm:w-6 sm:h-6"
                        />
                        <span className="text-xs sm:text-sm">{standing.team.teamName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-1 sm:px-2 py-2">{standing.points}</TableCell>
                    <TableCell className="px-1 sm:px-2 py-2 hidden sm:table-cell">{standing.wins}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Top 3 Teams Table */}
        <div className="w-full">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Top 3 Teams</h2>
          <div className="w-full overflow-x-auto rounded-md border">
            <Table className="w-full text-xs sm:text-sm lg:text-base">
              <TableHeader>
                <TableRow>
                  <TableHead className="px-1 sm:px-2">Pos</TableHead>
                  <TableHead className="px-1 sm:px-2">Constructor</TableHead>
                  <TableHead className="px-1 sm:px-2">Pts</TableHead>
                  <TableHead className="px-1 sm:px-2 hidden sm:table-cell">Wins</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topThreeConstructors.map((standing) => (
                  <TableRow key={standing.classificationId}>
                    <TableCell className="px-1 sm:px-2 py-2">
                      <span
                        style={{
                          color:
                            standing.position === 1
                              ? "gold"
                              : standing.position === 2
                              ? "silver"
                              : standing.position === 3
                              ? "#cd7f32"
                              : "inherit",
                        }}
                      >
                        {standing.position}
                      </span>
                    </TableCell>
                    <TableCell className="px-1 sm:px-2 py-2">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Image
                          src={`/${standing.teamId}.svg`}
                          alt={standing.team.teamName}
                          width={16}
                          height={16}
                          className="sm:w-6 sm:h-6"
                        />
                        <span className="text-xs sm:text-sm">{standing.team.teamName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-1 sm:px-2 py-2">{standing.points}</TableCell>
                    <TableCell className="px-1 sm:px-2 py-2 hidden sm:table-cell">{standing.wins}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
