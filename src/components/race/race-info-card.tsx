import { Circuit } from "@/types/f1-types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RaceInfoCardProps {
  circuit: Circuit | undefined;
  raceName: string | undefined;
  round: number; 
}

export const RaceInfoCard: React.FC<RaceInfoCardProps> = ({ circuit, raceName, round }) => {
  // Find the next event from the schedule

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{raceName || circuit?.circuitName}</CardTitle>
            <CardDescription>Round {round}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {
          circuit && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Circuit</p>
                  <p className="font-medium">{circuit?.circuitName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Location</p>
                  <p className="font-medium">{circuit?.city}, {circuit.country}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Circuit Length</p>
                    <p className="font-medium">
                      {circuit.circuitLength} ({(parseFloat(circuit.circuitLength) * 0.621371).toFixed(2)} miles)
                    </p>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground mb-1">Track Record</p>
                  <p className="font-medium">{circuit.lapRecord}</p>
                  <p className="text-xs text-muted-foreground">
                    {circuit.fastestLapDriverId} ({circuit.fastestLapYear})
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Year of first race</p>
                  <p className="font-medium">{circuit.firstParticipationYear}</p>
                </div>
              </div>
            </div>
          ) || (
            <p className="font-medium">Data not available yet.</p>
          )
        }
      </CardContent>
    </Card>
  );
};