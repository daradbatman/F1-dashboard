'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { F1Service } from "@/service/fi-dev-service";
import { ConstructorStandingResponse } from "@/types/f1-types";
import Image from "next/image";
import React, { useEffect } from "react";

export const ConstructorStandings: React.FC = () => {
    const [year, setYear] = React.useState(new Date().getFullYear());
    const [standings, setStandings] = React.useState<ConstructorStandingResponse | null>(null);
    const f1Service = new F1Service();

    useEffect(() => {
        const fetchStandings = async () => {
            const data = await f1Service.getConstructorStandingsByYear(year);
            setStandings(data);
        };
        fetchStandings();
    }, [year]);

    return (
        <div className="w-full max-w-none flex flex-col">
            <div>
                <h1 className="text-2xl font-bold mb-4">{year} Constructor Standings</h1>
                <Select onValueChange={(value) => setYear(Number(value))} value={year.toString()}>
                    <SelectTrigger className="w-32">
                        <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                        {Array.from({ length: new Date().getFullYear() - 1958 + 1 }, (_, i) => {
                            const yr = new Date().getFullYear() - i;
                            return (
                                <SelectItem key={yr} value={yr.toString()}>
                                    {yr}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </div>
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
                    {standings?.constructors_championship.map((standing) => (
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