import { Race } from "@/types/f1-types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { findNextEvent } from "@/lib/utils";

interface RaceInfoCardProps {
  race: Race;
}

export const RaceInfoCard: React.FC<RaceInfoCardProps> = ({ race }) => {
  // Find the next event from the schedule
  const nextEvent = findNextEvent(race.schedule);

  return (
    <Card className="w-[350px] hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{race.raceName || race.circuit.circuitName}</CardTitle>
            <CardDescription>Round {race.round}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="col-span-2 w-full">
            <p className="text-sm font-semibold">Next Event: {nextEvent?.type}</p>
            <p className="text-xs text-muted-foreground">
              {nextEvent?.date && new Date(nextEvent.date).toLocaleDateString()}
            </p>
            {nextEvent?.time && (
              <p className="text-xs text-muted-foreground">
                {new Date('1970-01-01T' + nextEvent.time).toLocaleTimeString()}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Circuit</p>
              <p className="font-medium">{race.circuit.circuitName}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Location</p>
              <p className="font-medium">{race.circuit.country}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Circuit Length</p>
              <p className="font-medium">{race.circuit.circuitLength}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Laps</p>
              <p className="font-medium">{race.laps || 'TBA'}</p>
            </div>
          </div>
          
          <div className="text-sm">
            <p className="text-muted-foreground mb-1">Lap Record</p>
            <p className="font-medium">{race.circuit.lapRecord}</p>
            <p className="text-xs text-muted-foreground">
              {race.circuit.fastestLapDriverId} ({race.circuit.fastestLapYear})
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};