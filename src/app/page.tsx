import { F1Service } from "@/service/fi-dev-service";
import { HeroBanner } from "@/components/ui/hero_banner";
import { PreviousBanner } from "@/components/ui/previous_banner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Race, RaceWeekend } from "@/types/f1-types";
import Image from "next/image";

function getNextEventDate(race: Race): Date | null {
  if (!race.schedule) return null;

  const events: { name: string; date: Date }[] = [];

  for (const [eventName, event] of Object.entries(race.schedule)) {
    if (event?.date && event?.time) {
      const [year, month, day] = event.date.split("-");
      const [hour, minute, second] = event.time.replace("Z", "").split(":");
      const isoString = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${hour.padStart(2, "0")}:${minute.padStart(2, "0")}:${(second || "00").padStart(2, "0")}Z`;
      const dateTime = new Date(isoString);
      events.push({ name: eventName, date: dateTime });
    }
  }

  return events.length > 0 ? new Date(Math.min(...events.map(e => e.date.getTime()))) : null;
}

function getNextRaceFromSchedule(races: Race[]): Race | undefined {
  const now = new Date();
  const futureRaces = races
    .map(race => ({ race, eventDate: getNextEventDate(race) }))
    .filter(({ eventDate }) => eventDate && eventDate > now)
    .sort((a, b) => (a.eventDate?.getTime() || 0) - (b.eventDate?.getTime() || 0));

  return futureRaces.length > 0 ? futureRaces[0].race : undefined;
}

function getPreviousRaceFromSchedule(races: Race[]): Race | undefined {
  const now = new Date();
  const pastRaces = races
    .map(race => ({ race, raceDate: race.schedule?.race?.date ? new Date(race.schedule.race.date + "T" + race.schedule.race.time) : null }))
    .filter(({ raceDate }) => raceDate && raceDate < now)
    .sort((a, b) => (b.raceDate?.getTime() || 0) - (a.raceDate?.getTime() || 0));

  return pastRaces.length > 0 ? pastRaces[0].race : undefined;
}

export default async function Home() {
  const f1Service = new F1Service();
  const currentYear = new Date().getFullYear();
  
  const standings = await f1Service.getCurrentDriverStandings();
  const constructorStandings = await f1Service.getCurrentConstructorStandings();
  const seasonSchedule = await f1Service.getRaceScheduleByYear(currentYear);

  const nextRace = seasonSchedule?.races ? getNextRaceFromSchedule(seasonSchedule.races) : undefined;
  const previousRaceData = seasonSchedule?.races ? getPreviousRaceFromSchedule(seasonSchedule.races) : undefined;

  let previousRace: RaceWeekend | undefined = undefined;
  if (previousRaceData) {
    const results = await f1Service.getRaceResultsByYear(currentYear, previousRaceData.round);
    previousRace = results?.races;
  }

  const topThreeDrivers = standings?.drivers_championship.slice(0, 3) || [];
  const topThreeConstructors = constructorStandings?.constructors_championship.slice(0, 3) || [];

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen mt-0 pt-2 pb-12 px-2 gap-0 sm:pt-4 sm:px-8 font-[family-name:var(--font-geist-sans)]">
      <div className="row-start-1 w-full flex flex-col items-center sm:items-start">
        <PreviousBanner previousRace={previousRace} />
        <HeroBanner nextRace={nextRace} />
        
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
