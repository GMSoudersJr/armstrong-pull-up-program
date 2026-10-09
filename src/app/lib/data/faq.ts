import { TFAQ } from "@/definitions";
import {
  CalendarClockIcon,
  DumbbellIcon,
  GiftIcon,
  SproutIcon,
  WifiOffIcon,
} from "lucide-react";

export const FAQ: TFAQ[] = [
  {
    id: 0,
    day: 0,
    Icon: GiftIcon,
    heading: "Is it free?",
    body: [
      "Yes. Rep Yourself is completely free, with no account or sign-up needed.",
    ],
  },
  {
    id: 1,
    day: 0,
    Icon: DumbbellIcon,
    heading: "What equipment do I need?",
    body: [
      "Just a pull-up bar. The morning push-ups need no equipment at all.",
    ],
  },
  {
    id: 2,
    day: 0,
    Icon: WifiOffIcon,
    heading: "Does it work offline? Where is my data stored?",
    body: [
      "Yes, it works offline. Your workout data stays on your device and is never uploaded to a server.",
    ],
  },
  {
    id: 3,
    day: 0,
    Icon: CalendarClockIcon,
    heading: "How long until I can do 20 pull-ups?",
    body: [
      "Many people see results in 6 to 8 weeks of consistent training. If you're starting below about 12 reps, expect it to take longer, but steady weekly training gets you there.",
    ],
  },
  {
    id: 4,
    day: 0,
    Icon: SproutIcon,
    heading: "What if I can't do many pull-ups yet?",
    body: [
      "You can still start. Your training set is sized to you, so it can be as small as 1 to 3 reps.",
      "The program also adapts to the flexed arm hang, using hang times instead of reps, and Day 5 can be done on a pull-up assist machine.",
      "Starting lower just means reaching 20 takes longer than it would from 12 to 15 reps.",
    ],
  },
];
