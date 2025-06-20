import { Team } from "@/types/f1-types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";


export interface TeamCardProps {
    teamId: string;
    position: number;
    points: number;
    wins: number;
    team: Team;
}

export const TeamCard: React.FC<TeamCardProps> = ({wins, points, position, team, teamId}) => {
  return (
    <Card className="w-[350px] hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 overflow-hidden">
            <Image
              src={`/${teamId}.svg`}
              alt={`${team.teamName}`}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div>
            <CardTitle>{`${team.teamName}`}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
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
}   