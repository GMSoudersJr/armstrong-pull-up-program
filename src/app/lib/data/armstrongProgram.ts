// Content for /armstrong-program. Written in original wording -- the facts
// (rest times, set structures, day rules) follow Major Armstrong's routine as
// described in ARMSTRONG_PROGRAM_SOURCE_URL, but the sentences are our own.

export const ARMSTRONG_PROGRAM_SOURCE_URL =
  "https://www.savannahstate.edu/cost/nrotc/documents/Inform2010-thearmstrongworkout_Enclosure15_5-2-10.pdf";

export type TProgramSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  steps?: string[];
};

export const PROGRAM_INTRO: TProgramSection[] = [
  {
    id: "introduction",
    heading: "Introduction",
    paragraphs: [
      "Major Charles Lewis Armstrong, a U.S. Marine, built this routine to train for a world record in pull-ups completed in a single session. It has since become one of the most popular ways to raise a pull-up max.",
      "The program works because it combines three things every good training plan needs: variety, overload, and regularity. People who follow it consistently often reach a set of 20 pull-ups in about 6 to 8 weeks. Consistency is the whole game. Showing up every training day matters more than any single workout.",
    ],
  },
  {
    id: "morning-routine",
    heading: "Morning push-up routine",
    paragraphs: [
      "Every morning, do three maximum-effort sets of regular push-ups, spread out over your morning. Armstrong did one set right after getting up, a second after his first trip to the bathroom, and a third after shaving.",
      "Push-ups strengthen the muscles around the shoulder girdle that pull-ups depend on. Keep this routine going for the entire program, every day of the week. It also helps ease the soreness most people feel during the first couple of weeks, and many people find it sticks around as a lifelong habit.",
    ],
  },
  {
    id: "training-regimen",
    heading: "Training regimen",
    paragraphs: [
      "The pull-up workouts are the core of the program. Wait two to three hours after your morning push-ups before starting them.",
      "Pull-ups are trained on five consecutive days, which fits neatly into a Monday-to-Friday week, followed by two days off. Don't skip days in the middle of the week. If you ever have to choose, the pull-ups matter more than the push-ups.",
      "The routine is designed to build the overhand pull-up (palms facing away). Mixing underhand and overhand grips is fine while you build up, until you can do 20 reps both ways.",
      "Quality comes first and rep counts second. Focus on clean, complete reps every time. Cutting corners only shortchanges you.",
    ],
  },
];

export const PROGRAM_DAYS: TProgramSection[] = [
  {
    id: "day-1",
    heading: "Day 1: Five max-effort sets",
    steps: [
      "Do five sets, each one to maximum effort.",
      "Rest 90 seconds between sets.",
      "Don't fixate on the numbers. Just give every set everything you have.",
      "Expect your last two sets to improve before your first three do.",
    ],
  },
  {
    id: "day-2",
    heading: "Day 2: The pyramid",
    steps: [
      "Do 1 rep, rest, then 2 reps, rest, then 3 reps, adding one rep each set.",
      "Keep climbing until you can't finish a set's target (for example, the set calls for 6 but you only get 4).",
      "Finish with one last maximum-effort set.",
      "Rest 10 seconds for every rep in the set you just did (50 seconds after a 5-rep set).",
    ],
  },
  {
    id: "day-3",
    heading: "Day 3: Three training sets, three grips",
    steps: [
      "Do nine training sets in total, resting 60 seconds between every set.",
      "Sets 1–3: normal grip, hands slightly wider than your shoulders, palms facing either way.",
      "Sets 4–6: close underhand grip, palms toward you, little fingers 0–4 inches apart.",
      "Sets 7–9: wide overhand grip, palms facing away.",
    ],
  },
  {
    id: "day-4",
    heading: "Day 4: Max training sets",
    steps: [
      "Do as many training sets as you can, resting 60 seconds between sets.",
      "Stop as soon as you can't complete a perfect training set.",
      "As you get stronger, this tends to become your longest training day.",
      "If you complete more than nine training sets, add one rep to your training set next week.",
    ],
  },
  {
    id: "day-5",
    heading: "Day 5: Repeat your hardest day",
    steps: [
      "Repeat whichever of Days 1–4 was hardest for you this week.",
      "Your hardest day may change from week to week.",
      "Optionally, use weighted pull-ups or a pull-up assist machine for this day.",
    ],
  },
  {
    id: "days-6-7",
    heading: "Days 6 and 7: Rest",
    steps: ["No pull-ups. Let your body recover before the next week."],
  },
];

export const PROGRAM_DETAILS: TProgramSection[] = [
  {
    id: "training-sets",
    heading: "Training sets",
    paragraphs: [
      "A training set is a fixed number of reps that you choose for yourself, so one person's training set might be 7 reps while another's is 2. Finding your number takes a little experimenting.",
      "Day 3 sets the standard: you need to finish all nine training sets that day. If your max is around 12 reps, your training set will probably be just 1 to 3 reps. Completing all nine sets matters far more than squeezing in an extra rep and only finishing six or seven.",
      "Day 4 is the best test. If you completed Day 3, try one more rep per training set on Day 4. If you manage at least nine sets at that higher number, it becomes your new training set. If not, stay with the number you used on Day 3.",
      "Never change your training set partway through a workout. If you started the day at 3 reps per set, don't drop to 2 when it gets hard. If you miss, you miss, and you try again tomorrow.",
    ],
  },
  {
    id: "modifications",
    heading: "Modifications",
    paragraphs: [
      "The program adapts to the flexed arm hang. Treat each training set as a target hang time instead of a rep count.",
      "You can substitute chin-ups if you prefer them, but still do Day 3 exactly as written, including the six sets with an overhand grip.",
      "Armstrong recommended training with the overhand grip whenever possible, because it carries over best to real-world tasks like climbing obstacles.",
    ],
  },
  {
    id: "what-to-expect",
    heading: "What to expect",
    paragraphs: [
      "Anyone who sticks with the program in good faith can expect it to work. Early on, your max-effort set may dip a little. That's a normal response called “tear down,” and you'll keep improving as you continue.",
      "Armstrong's midshipmen typically started at 12 to 15 reps and reached 20 fairly quickly. If you're starting below that, expect it to take longer than four weeks, but if you stay with it, you'll get there.",
    ],
  },
  {
    id: "disclaimer",
    heading: "Medical disclaimer",
    paragraphs: [
      "Before starting this or any physical training program, consult a licensed physician and make sure you are medically cleared for this type of exercise.",
    ],
  },
];
