import { F1Service } from "@/service/fi-dev-service";
import { DriverCard } from "@/components/drivers/driver";
import { TeamCard } from "@/components/teams/team";

export default async function Home() {
  const f1Service = new F1Service();
  const standings = await f1Service.getCurrentDriverStandings();
  const constructorStandings = await f1Service.getCurrentConstructorStandings();
  const topDriverStanding = standings.drivers_championship[0];
  const topConstructorStanding = constructorStandings.constructors_championship[0];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Next Race</h1>
        <h1 className="text-4xl font-bold">Championship Leader</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <DriverCard
            position={topDriverStanding.position}
            points={topDriverStanding.points}
            wins={topDriverStanding.wins}
            driver={topDriverStanding.driver}
            teamName={topDriverStanding.team.teamName}
          />
        </div>
        <h1 className="text-4xl font-bold">Leading Constructor</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <TeamCard
            position={topConstructorStanding.position}
            points={topConstructorStanding.points}
            wins={topConstructorStanding.wins}
            team={topConstructorStanding.team}
            teamId={topConstructorStanding.teamId}
          />
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
