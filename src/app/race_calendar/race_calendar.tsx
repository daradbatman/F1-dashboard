import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { F1Service } from "@/service/fi-dev-service";
import { RaceResult, RaceResultsResponse, SeasonCalendarResponse } from "@/types/f1-types";
import Image from "next/image";
import Link from "next/link";

function getRaceDateTime(race: any) {
  // Use race.schedule.race.date and race.schedule.race.time if available, else fallback to fp1
  const date = race.schedule?.race?.date
  const time = race.schedule?.race?.time || "00:00:00Z";
  return new Date(date + "T" + (time.endsWith("Z") ? time : time + "Z"));
}

export default async function RaceCalendar() {
  const f1Service = new F1Service();
  const calendar: SeasonCalendarResponse | null = await f1Service.getRaceScheduleByYear(new Date().getFullYear());
  const totalRaces = calendar?.races.length || 0;

  const raceResultsMap: Record<number, RaceResultsResponse | null> = {};
  await Promise.all(
    (calendar?.races ?? []).map(async (race) => {
      const result = await f1Service.getRaceResultsByYear(new Date().getFullYear(), race?.round);
      raceResultsMap[race?.round] = result;
    })
  );

  // Sort races by date/time
  const sortedRaces = [...(calendar?.races ?? [])].sort((a, b) => {
    return getRaceDateTime(a).getTime() - getRaceDateTime(b).getTime();
  });

  const now = new Date();

  // Find next race and previous race
  const nextRace = sortedRaces.find(race => getRaceDateTime(race) > now);
  const previousRace = [...sortedRaces].reverse().find(race => getRaceDateTime(race) < now);

  // Past races (excluding previous)
  const pastRaces = sortedRaces.filter(race => {
    const dt = getRaceDateTime(race);
    return dt < now && race.round !== previousRace?.round;
  });

  // Upcoming races (excluding next)
  const upcomingRaces = sortedRaces.filter(race => {
    const dt = getRaceDateTime(race);
    return dt > now && race.round !== nextRace?.round;
  });

  return (
    <div className="px-4 sm:px-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {calendar?.championship?.championshipName}
      </h1>

      {/* Next Race */}
      {nextRace && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2 text-primary">Next Race</h2>
          <Link href={`/race_calendar/${nextRace.round}`}>
            <Card className="hover:shadow-lg hover:bg-muted transition duration-200 ease-in-out rounded-lg">
              <CardHeader>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-2 sm:gap-4 items-start sm:items-center">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold">
                    Round {nextRace.round}
                  </h2>
                  <h2 className="text-sm sm:text-base lg:text-lg font-medium">
                    {nextRace.circuit.city}, {nextRace.circuit.country}
                  </h2>
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold break-words">
                    {nextRace.raceName}
                  </h2>
                  <div className="text-sm sm:text-right text-left">
                    {nextRace.schedule?.fp1?.date
                      ? new Date(nextRace.schedule.fp1.date).toLocaleDateString()
                      : "N/A"}{" "}
                    -{" "}
                    {nextRace.schedule?.race?.date
                      ? new Date(nextRace.schedule.race.date).toLocaleDateString()
                      : "N/A"}
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        </div>
      )}

      {/* Previous Race */}
      {previousRace && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2 text-primary">Most Recent Race</h2>
          <Link href={`/race_calendar/${previousRace.round}`}>
            <Card className="hover:shadow-lg hover:bg-muted transition duration-200 ease-in-out rounded-lg">
              <CardHeader>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-2 sm:gap-4 items-start sm:items-center">
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold">
                    Round {previousRace.round}
                  </h2>
                  <h2 className="text-sm sm:text-base lg:text-lg font-medium">
                    {previousRace.circuit.city}, {previousRace.circuit.country}
                  </h2>
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold break-words">
                    {previousRace.raceName}
                  </h2>
                  <div className="text-sm sm:text-right text-left">
                    {previousRace.schedule?.fp1?.date
                      ? new Date(previousRace.schedule.fp1.date).toLocaleDateString()
                      : "N/A"}{" "}
                    -{" "}
                    {previousRace.schedule?.race?.date
                      ? new Date(previousRace.schedule.race.date).toLocaleDateString()
                      : "N/A"}
                  </div>
                </div>
              </CardHeader>
              {raceResultsMap[previousRace.round]?.races?.results && (
                <CardContent className="flex flex-col">
                  <h2 className="text-lg font-semibold mb-2">Top 3:</h2>
                  <ul className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    {(raceResultsMap[previousRace.round]?.races?.results || [])
                      .slice(0, 3)
                      .map((entry: RaceResult, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-md"
                        >
                          {idx === 0 && (
                            <Image
                              src="/1stPlaceMedal.svg"
                              width={24}
                              height={24}
                              alt="1st"
                            />
                          )}
                          {idx === 1 && (
                            <Image
                              src="/2ndPlaceMedal.svg"
                              width={24}
                              height={24}
                              alt="2nd"
                            />
                          )}
                          {idx === 2 && (
                            <Image
                              src="/3rdPlaceMedal.svg"
                              width={24}
                              height={24}
                              alt="3rd"
                            />
                          )}
                          <span className="font-semibold">
                            {entry.driver.name} {entry.driver.surname}
                          </span>
                        </li>
                      ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          </Link>
        </div>
      )}

      {/* Past Races */}
      {pastRaces.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Past Races</h2>
          <div className="grid gap-6">
            {pastRaces.map((race) => (
              <Link href={`/race_calendar/${race.round}`} key={race.round}>
                <Card className="hover:shadow-lg hover:bg-muted transition duration-200 ease-in-out rounded-lg">
                  <CardHeader>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-2 sm:gap-4 items-start sm:items-center">
                      <h2 className="text-base sm:text-lg lg:text-xl font-semibold">
                        Round {race.round}
                      </h2>
                      <h2 className="text-sm sm:text-base lg:text-lg font-medium">
                        {race.circuit.city}, {race.circuit.country}
                      </h2>
                      <h2 className="text-base sm:text-lg lg:text-xl font-semibold break-words">
                        {race.raceName}
                      </h2>
                      <div className="text-sm sm:text-right text-left">
                        {race.schedule?.fp1?.date
                          ? new Date(race.schedule.fp1.date).toLocaleDateString()
                          : "N/A"}{" "}
                        -{" "}
                        {race.schedule?.race?.date
                          ? new Date(race.schedule.race.date).toLocaleDateString()
                          : "N/A"}
                      </div>
                    </div>
                  </CardHeader>
                  {raceResultsMap[race.round]?.races?.results && (
                    <CardContent className="flex flex-col">
                      <h2 className="text-lg font-semibold mb-2">Top 3:</h2>
                      <ul className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        {(raceResultsMap[race.round]?.races?.results || [])
                          .slice(0, 3)
                          .map((entry: RaceResult, idx: number) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2 text-md"
                            >
                              {idx === 0 && (
                                <Image
                                  src="/1stPlaceMedal.svg"
                                  width={24}
                                  height={24}
                                  alt="1st"
                                />
                              )}
                              {idx === 1 && (
                                <Image
                                  src="/2ndPlaceMedal.svg"
                                  width={24}
                                  height={24}
                                  alt="2nd"
                                />
                              )}
                              {idx === 2 && (
                                <Image
                                  src="/3rdPlaceMedal.svg"
                                  width={24}
                                  height={24}
                                  alt="3rd"
                                />
                              )}
                              <span className="font-semibold">
                                {entry.driver.name} {entry.driver.surname}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </CardContent>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Races */}
      {upcomingRaces.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-2">Upcoming Races</h2>
          <div className="grid gap-6">
            {upcomingRaces.map((race) => (
              <Link href={`/race_calendar/${race.round}`} key={race.round}>
                <Card className="hover:shadow-lg hover:bg-muted transition duration-200 ease-in-out rounded-lg">
                  <CardHeader>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-2 sm:gap-4 items-start sm:items-center">
                      <h2 className="text-base sm:text-lg lg:text-xl font-semibold">
                        Round {race.round}
                      </h2>
                      <h2 className="text-sm sm:text-base lg:text-lg font-medium">
                        {race.circuit.city}, {race.circuit.country}
                      </h2>
                      <h2 className="text-base sm:text-lg lg:text-xl font-semibold break-words">
                        {race.raceName}
                      </h2>
                      <div className="text-sm sm:text-right text-left">
                        {race.schedule?.fp1?.date
                          ? new Date(race.schedule.fp1.date).toLocaleDateString()
                          : "N/A"}{" "}
                        -{" "}
                        {race.schedule?.race?.date
                          ? new Date(race.schedule.race.date).toLocaleDateString()
                          : "N/A"}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {totalRaces === 0 && (
        <div className="text-center text-gray-500">Season over</div>
      )}
    </div>
  );
}
