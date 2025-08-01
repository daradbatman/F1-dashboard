import { F1Service } from "@/service/fi-dev-service";
import { DriverCard } from "@/components/drivers/driver";
import { TeamCard } from "@/components/teams/team";
import { HeroBanner } from "@/components/ui/hero_banner";

export default async function Home() {
  const f1Service = new F1Service();
  const standings = await f1Service.getCurrentDriverStandings();
  const constructorStandings = await f1Service.getCurrentConstructorStandings();
  const nextRaceSchedule = await f1Service.getNextRaceSchedule();

  const topDriverStanding = standings?.drivers_championship[0];
  const topConstructorStanding = constructorStandings?.constructors_championship[0];
  const nextRace = nextRaceSchedule?.race?.[0];

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen mt-0 pt-2 pb-12 px-4 gap-0 sm:pt-4 sm:px-8 font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 w-full flex flex-col items-center sm:items-start">
        <HeroBanner nextRace={nextRace} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          {/* Championship Leader */}
          <div>
            <h1 className="text-2xl font-bold mt-0 mb-4">Championship Leader</h1>
            <DriverCard
              position={topDriverStanding?.position}
              points={topDriverStanding?.points}
              wins={topDriverStanding?.wins}
              driver={topDriverStanding?.driver}
            />
          </div>
          {/* Leading Constructor */}
          <div>
            <h1 className="text-2xl font-bold mt-0 mb-4">Leading Constructor</h1>
            <TeamCard
              position={topConstructorStanding?.position}
              points={topConstructorStanding?.points}
              wins={topConstructorStanding?.wins}
              team={topConstructorStanding?.team}
              teamId={topConstructorStanding?.teamId}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
