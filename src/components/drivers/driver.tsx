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

export const DriverCard: React.FC<DriverProps> = ({
  position,
  points,
  wins,
  driver,
}) => {
  return (
    <Card className="w-full h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <CardTitle className="text-base sm:text-lg">Championship Leader</CardTitle>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="relative w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
            <span className="text-lg font-semibold text-black">
              {driver?.shortName}
            </span>
          </div>
          <div>
            <CardTitle className="text-base sm:text-lg">{`${driver?.name} ${driver?.surname}`}</CardTitle>
            <CardDescription className="text-sm">
              {driver?.nationality}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm sm:text-base">
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-muted-foreground">Number</span>
            <span className="font-medium">{driver?.number}</span>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-muted-foreground">Points</span>
            <span className="font-medium">{points || 0}</span>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-muted-foreground">Position</span>
            <span className="font-medium">{position || "-"}</span>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-muted-foreground">Wins</span>
            <span className="font-medium">{wins || 0}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
