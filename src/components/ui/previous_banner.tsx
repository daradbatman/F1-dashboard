'use client';

import { RaceWeekend } from "@/types/f1-types";
import Image from "next/image";

interface Props {
  previousRace: RaceWeekend | undefined;
}


export const PreviousBanner: React.FC<Props> = ({ previousRace }) => {
    const baseClass =
    "w-full bg-gradient-to-r rounded-lg mb-8 flex flex-col items-center px-4 py-6 sm:py-8 text-center";

    return previousRace && previousRace.results ? (
      <div className={`${baseClass} from-green-600 to-black text-white`}>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
        Previous Grand Prix: {previousRace?.raceName}
      </h1>
      <p className="text-base sm:text-lg mb-2">
        {previousRace?.circuit?.circuitName}, {previousRace?.circuit?.country}
      </p>
      <div className="flex flex-col items-center gap-1 text-sm sm:text-base">
        <span className="flex items-center gap-1">
          <Image
            src="/1stPlaceMedal.svg"
            width={24}
            height={24}
            alt="1st"
          />
          {previousRace?.results?.[0]?.driver?.name}{" "}
          {previousRace?.results?.[0]?.driver?.surname}
        </span>
        <span className="flex items-center gap-1">
          <Image
            src="/2ndPlaceMedal.svg"
            width={24}
            height={24}
            alt="2nd"
          />
          {previousRace?.results?.[1]?.driver?.name}{" "}
          {previousRace?.results?.[1]?.driver?.surname}
        </span>
        <span className="flex items-center gap-1">
          <Image
            src="/3rdPlaceMedal.svg"
            width={24}
            height={24}
            alt="3rd"
          />
          {previousRace?.results?.[2]?.driver?.name}{" "}
          {previousRace?.results?.[2]?.driver?.surname}
        </span>
      </div>
    </div>
  ) : (
    <div className={`${baseClass} from-gray-600 to-black text-white`}>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
        Data not available
      </h1>
    </div>
  );
}