import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getColorFromTeamId } from "@/lib/utils";
import { F1Service } from "@/service/fi-dev-service";
import Image from "next/image";

export default async function DriverStandings() {
  const f1Service = new F1Service()
  const standings = await f1Service.getCurrentDriverStandings();
  return (
    <div className="p-w-full max-w-none flex flex-col">
      <h1 className="text-2xl font-bold mb-4">{new Date().getFullYear()} Driver Standings</h1>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Position</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Wins</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {standings.drivers_championship.map((standing) => (
            <TableRow key={standing.classificationId}>
              <TableCell>
                <span style={{ color: standing.position === 1 ? "gold" : standing.position === 2 ? 'silver' : standing.position === 3 ? '#cd7f32' : 'white' }}>
                  {standing.position}
                </span>
              </TableCell>
              <TableCell>
                <span style={{ color: getColorFromTeamId(standing.teamId) }} className="font-semibold">
                  {standing.driver.number}
                </span>{" "}
                {standing.driver.name} {standing.driver.surname}
              </TableCell>
              <TableCell>
                <Image
                  src={`/${standing.teamId}.svg`}
                  alt={standing.team.teamName}
                  width={24}
                  height={24}
                  className="inline-block mr-2"></Image>
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