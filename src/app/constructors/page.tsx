import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { F1Service } from "@/service/fi-dev-service";
import Image from "next/image";

export default async function ConstructorStandings() {
    const f1Service = new F1Service();
    const standings = await f1Service.getCurrentConstructorStandings();

    return (
        <div className="w-full max-w-none flex flex-col">
            <h1 className="text-2xl font-bold mb-4">{new Date().getFullYear()} Constructor Standings</h1>
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>Position</TableHead>
                        <TableHead>Constructor</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead>Wins</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {standings.constructors_championship.map((standing) => (
                        <TableRow key={standing.classificationId}>
                            <TableCell>
                                <span style={{ color: standing.position === 1 ? "gold" : standing.position === 2 ? 'silver' : standing.position === 3 ? '#cd7f32' : 'white' }}>
                                    {standing.position}
                                </span>
                            </TableCell>
                            <TableCell className="flex items-center">
                                <Image
                                    src={`/${standing.teamId}.svg`}
                                    alt={standing.team.teamName}
                                    width={24}
                                    height={24}
                                    className="inline-block mr-2"
                                />
                                {standing.team.teamName}
                            </TableCell>
                            <TableCell>{standing.points}</TableCell>
                            <TableCell>{standing.wins}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}