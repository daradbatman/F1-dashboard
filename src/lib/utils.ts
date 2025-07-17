import { Schedule } from "@/types/f1-types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function findNextEvent(schedule: Schedule) {
  const events = [
    { type: 'Free Practice 1', ...schedule.fp1 },
    { type: 'Free Practice 2', ...schedule.fp2 },
    { type: 'Free Practice 3', ...schedule.fp3 },
    { type: 'Qualifying', ...schedule.qualy },
    { type: 'Sprint Qualifying', ...schedule.sprintQualy },
    { type: 'Sprint Race', ...schedule.sprintRace },
    { type: 'Race', ...schedule.race },
  ];

  const currentDateTime = new Date();
  // Filter only future events with a valid date
  const futureEvents = events
    .filter(event => event.date)
    .map(event => ({
      ...event,
      eventDateTime: new Date(
        event.date +
          'T' +
          (event.time
            ? event.time.endsWith('Z')
              ? event.time
              : event.time + 'Z'
            : '00:00:00Z')
      ),
    }))
    .filter(event => {
      // If event is today, only include if time is later than now
      const isToday = event.eventDateTime.toDateString() === currentDateTime.toDateString();
      if (isToday) {
        return event.eventDateTime.getTime() > currentDateTime.getTime();
      }
      // Otherwise, only include if in the future
      return event.eventDateTime > currentDateTime;
    });

  // Find the event with the earliest date/time
  if (futureEvents.length === 0) return null;
  const nextEvent = futureEvents.reduce((earliest, event) =>
    event.eventDateTime < earliest.eventDateTime ? event : earliest
  );
  return {
    type: nextEvent.type,
    date: nextEvent.date,
    time: nextEvent.time
  };
}

export function getColorFromTeamId(teamId: string): string {
  const colors: Record<string, string> = {
    'red_bull': 'royalblue',
    'mercedes': 'lightslategrey',
    'ferrari': 'red',
    'mclaren': 'orange',
    'alpine': 'dodgerblue',
    'aston_martin': 'seagreen',
    'haas': 'white',
    'sauber': 'lawngreen',
    'williams': 'lightskyblue',
    'rb': 'cornflowerblue',
    // Add more teams and their colors as needed
  };
  return colors[teamId] || 'gray'; // Default color if teamId not found
}
