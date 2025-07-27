import { RaceInfoCard } from "@/components/race/race-info-card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { F1Service } from "@/service/fi-dev-service";
import Link from "next/link";

export default async function RaceDetail({ params }: { params: { round: string } }) {
    const round = Number(params.round);
    const year = new Date().getFullYear();
    const f1Service = new F1Service();
    const raceResult = await f1Service.getRaceResultsByYear(year, round);
    const fp1Results = await f1Service.getFp1ResultsByYear(year, round);
    const fp2Results = await f1Service.getFp2ResultsByYear(year, round);
    const fp3Results = await f1Service.getFp3ResultsByYear(year, round);
    const qualyResults = await f1Service.getQualyResultsByYear(year, round);
    const sprintQualyResults = await f1Service.getSprintQualyResultsByYear(year, round);
    const sprintRaceResults = await f1Service.getSprintRaceResultsByYear(year, round);

    const allResults = [
        raceResult,
        fp1Results,
        fp2Results,
        fp3Results,
        qualyResults,
        sprintQualyResults,
        sprintRaceResults
    ];

    const firstValidResult = allResults.find(result => result !== null && result !== undefined);
    const circuit = firstValidResult?.races.circuit;
    const raceName = firstValidResult?.races.raceName;

    

    return (
        <div>
            <Button>
                <Link href="/race_calendar" className="flex items-center gap-2">
                    <span>Back to Calendar</span>
                </Link>
            </Button>
            <div>
                <RaceInfoCard circuit={circuit} raceName={raceName} round={round}/>
            </div>
            {
                raceResult && raceResult.races && raceResult.races.results &&
                <div>
                    <h2 className="text-2xl font-bold mb-4"> Race Results </h2>
                    <Table>
                        <TableHeader>
                            <TableHead>Position</TableHead>
                            <TableHead>Driver</TableHead>
                            <TableHead>Team</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Points</TableHead>
                        </TableHeader>
                        <TableBody>
                        {
                            raceResult.races.results.map((result => (
                                <TableRow>
                                    <TableCell>{result.position}</TableCell>
                                    <TableCell>{result.driver.name} {result.driver.surname}</TableCell>
                                    <TableCell>{result.team.teamName}</TableCell>
                                    <TableCell>{result.time}</TableCell>
                                    <TableCell>{result.points}</TableCell>
                                </TableRow>
                            )))
                        }
                        </TableBody>
                    </Table>
                </div>
            }
            {
                qualyResults && qualyResults.races && qualyResults.races.qualyResults &&
                <div>
                    <h2 className="text-2xl font-bold mb-4"> Qualifying Results </h2>
                    <Table>
                        <TableHeader>
                            <TableHead>Position</TableHead>
                            <TableHead>Driver</TableHead>
                            <TableHead>Team</TableHead>
                            <TableHead>Q1</TableHead>
                            <TableHead>Q2</TableHead>
                            <TableHead>Q3</TableHead>
                        </TableHeader>
                        <TableBody>
                        {
                            qualyResults.races.qualyResults.map((result => (
                                <TableRow key={result.classificationId}>
                                    <TableCell>{result.gridPosition}</TableCell>
                                    <TableCell>{result.driver.name} {result.driver.surname}</TableCell>
                                    <TableCell>{result.team.teamName}</TableCell>
                                    <TableCell>{result.q1 || "N/A"}</TableCell>
                                    <TableCell>{result.q2 || "N/A"}</TableCell>
                                    <TableCell>{result.q3 || "N/A"}</TableCell>
                                </TableRow>
                            )))
                        }
                        </TableBody>
                    </Table>
                </div>

            }
            {
                sprintRaceResults && sprintRaceResults.races && sprintRaceResults.races.sprintRaceResults &&
                <div>
                    <h2 className="text-2xl font-bold mb-4">Sprint Race Results</h2>
                    <Table>
                        <TableHeader>
                            <TableHead>Position</TableHead>
                            <TableHead>Driver</TableHead>
                            <TableHead>Team</TableHead> 
                            <TableHead>Points</TableHead>
                        </TableHeader>
                        <TableBody>
                        {
                            sprintRaceResults.races.sprintRaceResults.map((result => (
                                <TableRow key={result.sprintRaceId}>
                                    <TableCell>{result.position}</TableCell>
                                    <TableCell>{result.driver.name} {result.driver.surname}</TableCell>
                                    <TableCell>{result.team.teamName}</TableCell>
                                    <TableCell>{result.points}</TableCell>
                                </TableRow>
                            )))
                        }
                        </TableBody>
                    </Table>
                </div>
            }
        </div>

    )
}