import { RaceInfoCard } from "@/components/race/race-info-card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { F1Service } from "@/service/fi-dev-service";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

export default async function RaceDetail(props: { params: Promise<{ round: string }> }) {
    const params = await props.params;
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
            <div className="mb-4">
                <Button asChild>
                <Link href="/race_calendar" className="flex items-center gap-2">
                    <span>Back to Calendar</span>
                </Link>
            </Button>
            </div>
            <div className="mb-8">
                <RaceInfoCard circuit={circuit} raceName={raceName} round={round}/>
            </div>
            {
                raceResult && raceResult.races && raceResult.races.results &&
                <div className="mb-8">
                    <Collapsible>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between">
                                <h2 className="text-2xl font-bold mb-4"> Race Results </h2><ArrowDown />
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
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
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            }
            {
                qualyResults && qualyResults.races && qualyResults.races.qualyResults &&
                <div className="mb-8">
                    <Collapsible>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between">
                                <h2 className="text-2xl font-bold mb-4"> Qualifying Results </h2><ArrowDown />
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
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
                        </CollapsibleContent>
                    </Collapsible>
                </div>

            }
            {
                sprintRaceResults && sprintRaceResults.races && sprintRaceResults.races.sprintRaceResults &&
                <div className="mb-8">
                    <Collapsible>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between">
                                <h2 className="text-2xl font-bold mb-4"> Sprint Race Results </h2><ArrowDown />
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
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
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            }
            {
                sprintQualyResults && sprintQualyResults.races && sprintQualyResults.races.sprintQualyResults &&
                <div className="mb-8">
                    <Collapsible>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between">
                                <h2 className="text-2xl font-bold mb-4"> Sprint Qualifying Results </h2><ArrowDown />
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <Table>
                                <TableHeader>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Driver</TableHead>
                                    <TableHead>Team</TableHead>
                                    <TableHead>SQ1</TableHead>
                                    <TableHead>SQ2</TableHead>
                                    <TableHead>SQ3</TableHead>
                                </TableHeader>
                                <TableBody>
                                {
                                    sprintQualyResults.races.sprintQualyResults.map((result => (
                                        <TableRow>
                                            <TableCell>{result.gridPosition}</TableCell>
                                            <TableCell>{result.driver.name} {result.driver.surname}</TableCell>
                                            <TableCell>{result.team.teamName}</TableCell>
                                            <TableCell>{result.sq1 || "N/A"}</TableCell>
                                            <TableCell>{result.sq2 || "N/A"}</TableCell>
                                            <TableCell>{result.sq3 || "N/A"}</TableCell>
                                        </TableRow>
                                    )))
                                }
                                </TableBody>
                            </Table>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            }
            {
                fp3Results && fp3Results.races && fp3Results.races.fp3Results &&
                <div className="mb-8">
                    <Collapsible>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between">
                                <h2 className="text-2xl font-bold mb-4"> Free Practice 3 Results </h2><ArrowDown />
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <Table>
                                <TableHeader>
                                    <TableHead>Driver</TableHead>
                                    <TableHead>Team</TableHead>
                                    <TableHead>Time</TableHead>
                                </TableHeader>
                                <TableBody>
                                {
                                    fp3Results.races.fp3Results.map((result => (
                                        <TableRow>
                                            <TableCell>{result.driver.name} {result.driver.surname}</TableCell>
                                            <TableCell>{result.team.teamName}</TableCell>
                                            <TableCell>{result.time || "N/A"}</TableCell>
                                        </TableRow>
                                    )))
                                }
                                </TableBody>
                            </Table>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            }
            {
                fp2Results && fp2Results.races && fp2Results.races.fp2Results &&
                <div className="mb-8">
                    <Collapsible>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between">
                                <h2 className="text-2xl font-bold mb-4"> Free Practice 2 Results </h2><ArrowDown />
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <Table>
                                <TableHeader>
                                    <TableHead>Driver</TableHead>
                                    <TableHead>Team</TableHead>
                                    <TableHead>Time</TableHead>
                                </TableHeader>
                                <TableBody>
                                {
                                    fp2Results.races.fp2Results.map((result => (
                                        <TableRow>
                                            <TableCell>{result.driver.name} {result.driver.surname}</TableCell>
                                            <TableCell>{result.team.teamName}</TableCell>
                                            <TableCell>{result.time || "N/A"}</TableCell>
                                        </TableRow>
                                    )))
                                }
                                </TableBody>
                            </Table>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            }
            {
                fp1Results && fp1Results.races && fp1Results.races.fp1Results &&
                <div className="mb-8">
                    <Collapsible>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between">
                                <h2 className="text-2xl font-bold mb-4"> Free Practice 1 Results </h2><ArrowDown />
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <Table>
                                <TableHeader>
                                    <TableHead>Driver</TableHead>
                                    <TableHead>Team</TableHead>
                                    <TableHead>Time</TableHead>
                                </TableHeader>
                                <TableBody>
                                {
                                    fp1Results.races.fp1Results.map((result => (
                                        <TableRow>
                                            <TableCell>{result.driver.name} {result.driver.surname}</TableCell>
                                            <TableCell>{result.team.teamName}</TableCell>
                                            <TableCell>{result.time || "N/A"}</TableCell>
                                        </TableRow>
                                    )))
                                }
                                </TableBody>
                            </Table>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            }
        </div>
    )
}