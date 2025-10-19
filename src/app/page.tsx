import { F1Service } from "@/service/fi-dev-service";
import { DriverCard } from "@/components/drivers/driver";
import { TeamCard } from "@/components/teams/team";
import { HeroBanner } from "@/components/ui/hero_banner";
import { PreviousBanner } from "@/components/ui/previous_banner";

export default async function Home() {
  const f1Service = new F1Service();
  const standings = await f1Service.getCurrentDriverStandings();
  const constructorStandings = await f1Service.getCurrentConstructorStandings();
  const nextRaceSchedule = await f1Service.getNextRaceSchedule();
  const previousRaceResponse = await f1Service.getPreviousRaceResult()

  const topDriverStanding = standings?.drivers_championship[0];
  const topConstructorStanding = constructorStandings?.constructors_championship[0];
  const nextRace = nextRaceSchedule?.race?.[0];
  const previousRace = previousRaceResponse?.races

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen mt-0 pt-2 pb-12 px-4 gap-0 sm:pt-4 sm:px-8 font-[family-name:var(--font-geist-sans)]">
      <div className="row-start-1 w-full flex flex-col items-center sm:items-start">
        <PreviousBanner previousRace={previousRace} />
        <HeroBanner nextRace={nextRace} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
          {/* Championship Leader */}
          <div className="w-full">
            <DriverCard
              position={topDriverStanding?.position}
              points={topDriverStanding?.points}
              wins={topDriverStanding?.wins}
              driver={topDriverStanding?.driver}
            />
          </div>
          {/* Leading Constructor */}
          <div className="w-full">
            <TeamCard
              position={topConstructorStanding?.position}
              points={topConstructorStanding?.points}
              wins={topConstructorStanding?.wins}
              team={topConstructorStanding?.team}
              teamId={topConstructorStanding?.teamId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
