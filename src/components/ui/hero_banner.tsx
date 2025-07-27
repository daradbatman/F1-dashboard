'use client';

import { Race } from "@/types/f1-types";
import { useEffect, useState } from "react";

interface Props {
    nextRace: Race | undefined;
}

export const HeroBanner: React.FC<Props> = ({ nextRace }) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (!nextRace?.schedule) return;

    // Gather all events with their datetime
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

    // Find the next event after now
    const now = new Date();
    const nextEvent = events
      .filter(e => e.dateTime > now)
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

  return (
    <div className="w-full bg-gradient-to-r from-red-600 to-black text-white py-8 px-4 rounded-lg mb-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-2">Next Grand Prix: {nextRace?.raceName}</h1>
      <p className="text-lg mb-2">
        {nextRace?.circuit?.circuitName}, {nextRace?.circuit?.country}
      </p>
      <p className="text-xl font-mono">{countdown}</p>
    </div>
  );
}