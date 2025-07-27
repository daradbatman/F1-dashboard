import { Driver } from "@/types/f1-types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface DriverProps {
  position: number | undefined;
  points: number | undefined;
  wins: number | undefined;
  driver: Driver | undefined;
}

export const DriverCard: React.FC<DriverProps> = ({ position, points, wins, driver }) => {
  return (
    <Card className="w-[350px] hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
              <span className="text-lg font-semibold text-black">{driver?.shortName}</span>
            </div>
          <div>
            <CardTitle>{`${driver?.name} ${driver?.surname}`}</CardTitle>
            <CardDescription>{driver?.nationality}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Number</span>
            <span className="font-medium">{driver?.number}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Points</span>
            <span className="font-medium">{points || 0}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Position</span>
            <span className="font-medium">{position || '-'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Wins</span>
            <span className="font-medium">{wins || 0}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};