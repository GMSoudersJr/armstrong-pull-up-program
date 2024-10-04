type TDailyHint = {
  dayNumber: number;
  hints: (string | string[])[];
};

const FINAL_STEPS = [
  "Save your progress:",
  "Click save icon.",
  "Click rotating check icon.",
];

export const HINT_MODAL_HEADING = "HOW?";

export const DAILY_HINTS: TDailyHint[] = [
  {
    dayNumber: 1,
    hints: [
      "Max out!",
      "Enter how many you did.",
      "Tap ✓.",
      "Do 5 sets.",
      "The eraser... well, erases.",
      FINAL_STEPS,
    ],
  },
  {
    dayNumber: 2,
    hints: [
      "Attempt reps stated.",
      "On success, tap ✓.",
      [
        "On fail, tap X.",
        "Tap rep count.",
        "Recover.",
        "Max out.",
        "Tap max out count.",
      ],
      FINAL_STEPS,
    ],
  },
  {
    dayNumber: 3,
    hints: [
      "Submit training set reps.",
      ["Suggested grip order:", "pronated", "close", "wide"],
      "Do reps with chosen grip.",
      "On success, tap ✓.",
      ["On fail, tap X.", "Tap rep count."],
      ["After 3 sets, do next grip."],
      "Repeat for 3 grips.",
      FINAL_STEPS,
    ],
  },
  {
    dayNumber: 4,
    hints: [
      "Submit training sets reps.",
      "Attempt reps stated.",
      "On success, tap ✓.",
      ["On fail, tap X.", "Tap rep count."],
      FINAL_STEPS,
    ],
  },
  {
    dayNumber: 5,
    hints: ["Choose your hardest day!"],
  },
];
