import { Meeting } from "@/types/f1-types-v2";
import Image from "next/image";

export interface PodiumEntry {
  position: number;
  name: string;
}

interface Props {
  meeting: Meeting | undefined;
  podium: PodiumEntry[];
}

const MEDALS: Record<number, { src: string; alt: string }> = {
  1: { src: "/1stPlaceMedal.svg", alt: "1st" },
  2: { src: "/2ndPlaceMedal.svg", alt: "2nd" },
  3: { src: "/3rdPlaceMedal.svg", alt: "3rd" },
};

export const PreviousBanner: React.FC<Props> = ({ meeting, podium }) => {
  const baseClass =
    "w-full bg-gradient-to-r rounded-lg mb-8 flex flex-col items-center px-4 py-6 sm:py-8 text-center";

  return meeting && podium.length > 0 ? (
    <div className={`${baseClass} from-green-600 to-black text-white`}>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
        Previous Grand Prix: {meeting.meeting_name}
      </h1>
      <p className="text-base sm:text-lg mb-2">
        {meeting.circuit_short_name}, {meeting.country_name}
      </p>
      <div className="flex flex-col items-center gap-1 text-sm sm:text-base">
        {podium.map(({ position, name }) => (
          <span key={position} className="flex items-center gap-1">
            <Image
              src={MEDALS[position].src}
              width={24}
              height={24}
              alt={MEDALS[position].alt}
            />
            {name}
          </span>
        ))}
      </div>
    </div>
  ) : (
    <div className={`${baseClass} from-gray-600 to-black text-white`}>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
        Data not available
      </h1>
    </div>
  );
};
