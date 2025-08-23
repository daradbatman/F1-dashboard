import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@radix-ui/react-navigation-menu";
import { CalendarDaysIcon, Medal, Trophy } from "lucide-react";
import Link from "next/link";
import { navigationMenuTriggerStyle } from "./navigation-menu";

export function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/drivers">
              <Medal />&nbsp; Driver Standings
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/constructors">
              <Trophy />&nbsp; Constructor Standings
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/race_calendar">
              <CalendarDaysIcon />&nbsp; Race Calendar
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
