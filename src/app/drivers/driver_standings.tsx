'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getColorFromTeamId } from "@/lib/utils";
import { F1Service } from "@/service/fi-dev-service";
import { ChampionshipStandingResponse } from "@/types/f1-types";
import Image from "next/image";
import React from "react";

export const DriverStandings: React.FC = () => {
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [standings, setStandings] =
    React.useState<ChampionshipStandingResponse | null>(null);
  const f1Service = new F1Service();

  React.useEffect(() => {
    const fetchStandings = async () => {
      const data = await f1Service.getDriverStandingsByYear(year);
      setStandings(data);
    };
    fetchStandings();
  }, [year]);

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-8 py-6 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">
          {year} Driver Standings
        </h1>
        <Select
          onValueChange={(value) => setYear(Number(value))}
          value={year.toString()}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {Array.from(
              { length: new Date().getFullYear() - 1954 + 1 },
              (_, i) => {
                const yr = new Date().getFullYear() - i;
                return (
                  <SelectItem key={yr} value={yr.toString()}>
                    {yr}
                  </SelectItem>
                );
              }
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full overflow-x-auto rounded-md border">
        <Table className="min-w-[600px] w-full text-sm sm:text-base">
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
            {standings?.drivers_championship.map((standing) => (
              <TableRow key={standing.classificationId}>
                <TableCell>
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
                <TableCell>
                  <span
                    style={{ color: getColorFromTeamId(standing.teamId) }}
                    className="font-semibold"
                  >
                    {standing.driver.number}
                  </span>{" "}
                  {standing.driver.name} {standing.driver.surname}
                </TableCell>
                <TableCell className="whitespace-nowrap">
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
    </div>
  );
};
