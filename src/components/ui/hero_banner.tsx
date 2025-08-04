'use client';

import { Race } from "@/types/f1-types";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  nextRace: Race | undefined;
  previousRace: any | undefined;
}

export const HeroBanner: React.FC<Props> = ({ nextRace, previousRace }) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (!nextRace?.schedule) return;

    const events: { name: string; dateTime: Date }[] = [];

    for (const [eventName, event] of Object.entries(nextRace.schedule)) {
      if (event?.date && event?.time) {
        const [year, month, day] = event.date.split("-");
        const [hour, minute, second] = event.time.replace("Z", "").split(":");
        const dateTime = new Date(
          Number(year),
          Number(month) - 1,
          Number(day),
          Number(hour),
          Number(minute),
          Number(second || 0)
        );
        events.push({ name: eventName, dateTime });
      }
    }

    const now = new Date();
    const nextEvent = events
      .filter((e) => e.dateTime > now)
      .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())[0];

    if (!nextEvent) {
      setCountdown("No upcoming events");
      return;
    }

    function updateCountdown() {
      const now = new Date();
      const diff = nextEvent.dateTime.getTime() - now.getTime();
      if (diff <= 0) {
        setCountdown(`${nextEvent.name} is live!`);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setCountdown(
        `Next event: ${nextEvent.name} in ${days}d ${hours}h ${minutes}m ${seconds}s`
      );
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextRace]);

  const baseClass =
    "w-full bg-gradient-to-r rounded-lg mb-8 flex flex-col items-center px-4 py-6 sm:py-8 text-center";

  return nextRace && nextRace.schedule ? (
    <div className={`${baseClass} from-red-600 to-black text-white`}>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
        Next Grand Prix: {nextRace?.raceName}
      </h1>
      <p className="text-base sm:text-lg mb-2">
        {nextRace?.circuit?.circuitName}, {nextRace?.circuit?.country}
      </p>
      <p className="text-sm sm:text-base font-mono">{countdown}</p>
    </div>
  ) : (
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
          {previousRace.results[0].driver.name}{" "}
          {previousRace.results[0].driver.surname}
        </span>
        <span className="flex items-center gap-1">
          <Image
            src="/2ndPlaceMedal.svg"
            width={24}
            height={24}
            alt="2nd"
          />
          {previousRace.results[1].driver.name}{" "}
          {previousRace.results[1].driver.surname}
        </span>
        <span className="flex items-center gap-1">
          <Image
            src="/3rdPlaceMedal.svg"
            width={24}
            height={24}
            alt="3rd"
          />
          {previousRace.results[2].driver.name}{" "}
          {previousRace.results[2].driver.surname}
        </span>
      </div>
    </div>
  );
};
