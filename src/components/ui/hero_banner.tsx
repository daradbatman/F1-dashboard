'use client';

import { Meeting, Session } from "@/types/f1-types-v2";
import { useEffect, useState } from "react";

interface Props {
  meeting: Meeting | undefined;
  nextSession: Session | undefined;
}

export const HeroBanner: React.FC<Props> = ({ meeting, nextSession }) => {
  const [countdown, setCountdown] = useState("");
  const [eventLabel, setEventLabel] = useState("");

  const start = nextSession?.date_start;
  const sessionName = nextSession?.session_name;

  useEffect(() => {
    if (!start) return;
    const target = new Date(start); // OpenF1 dates include the UTC offset, so no manual parsing

    // Formatted in the effect so server and client output can't mismatch on hydration
    setEventLabel(
      target.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      })
    );

    function tick() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setCountdown(`${sessionName} is live!`);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setCountdown(`Next event: ${sessionName} in ${days}d ${hours}h ${minutes}m ${seconds}s`);
    }

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [start, sessionName]);

  const baseClass =
    "w-full bg-gradient-to-r rounded-lg mb-8 flex flex-col items-center px-4 py-6 sm:py-8 text-center";

  return meeting && nextSession ? (
    <div className={`${baseClass} from-red-600 to-black text-white`}>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
        Next Grand Prix: {meeting.meeting_name}
      </h1>
      <p className="text-base sm:text-lg mb-2">
        {meeting.circuit_short_name}, {meeting.country_name}
      </p>
      <p className="text-sm sm:text-base mb-4">
        {eventLabel ? `Event Date: ${eventLabel}` : "Event Date: N/A"}
      </p>
      <p className="text-sm sm:text-base font-mono">{countdown}</p>
    </div>
  ) : (
    <div className={`${baseClass} from-gray-600 to-black text-white`}>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
        Data not available
      </h1>
    </div>
  );
};
