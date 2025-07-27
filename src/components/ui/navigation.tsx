import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@radix-ui/react-navigation-menu";
import { CalendarDaysIcon, Medal, Trophy } from "lucide-react";
import Link from "next/link";
import { navigationMenuTriggerStyle } from "./navigation-menu";

export function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList style={{ display: "flex", gap: "1rem" }}>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/drivers">
              <Medal /> Driver Standings
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/constructors">
              <Trophy /> Constructor Standings
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/race_calendar">
              <CalendarDaysIcon /> Race Calendar
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
