import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { F1Service } from "@/service/fi-dev-service";
import { RaceResultsResponse, SeasonCalendarResponse } from "@/types/f1-types";
import Image from "next/image";
import Link from "next/link";

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
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-center">
                {calendar?.championship?.championshipName}
            </h1>
            { totalRaces > 0 ? (
                <div className="grid gap-4">
                    {calendar?.races.map((race) => (
                        <Link href={`/race_calendar/${race.round}`} key={race.round}>
                            <Card>
                                <CardHeader>
                                    <div className="grid grid-cols-4 gap-4 items-center">
                                        <h2 className="text-xl font-semibold col-span-1">
                                            Round {race.round}
                                        </h2>
                                        <h2 className="text-lg font-semibold col-span-1">
                                            {race.circuit.city}, {race.circuit.country}
                                        </h2>
                                        <h2 className="text-xl font-semibold col-span-1">
                                            {race.raceName}
                                        </h2>
                                        <div className="text-right col-span-1">
                                            {race.schedule?.fp1?.date ? new Date(race.schedule.fp1.date).toLocaleDateString() : "N/A"} - {race.schedule?.race?.date ? new Date(race.schedule.race.date).toLocaleDateString() : "N/A"}
                                        </div>
                                    </div>
                                </CardHeader>
                                {raceResultsMap[race.round]?.races?.results &&
                                    <CardContent className="flex flex-col">
                                        <h2 className="text-lg font-semibold mb-2">Top 3:</h2>
                                        <ul className="flex gap-4">
                                            {raceResultsMap[race.round]?.races.results.slice(0, 3).map((entry: any, idx: number) => (
                                                <li key={idx} className="flex items-center gap-2 text-md">
                                                    {idx === 0 && <span><Image src="/1stPlaceMedal.svg" width={24} height={24} alt="1st"/></span>}
                                                    {idx === 1 && <span><Image src="/2ndPlaceMedal.svg" width={24} height={24} alt="2nd"/></span>}
                                                    {idx === 2 && <span><Image src="/3rdPlaceMedal.svg" width={24} height={24} alt="3rd"/></span>}
                                                    <span className="font-semibold">
                                                        {entry.driver.name} {entry.driver.surname} {entry.team.name}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                }
                            </Card>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500">
                    Season over
                </div>
            ) 
            }
        </div>
    );
}