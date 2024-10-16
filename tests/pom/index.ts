import { MixinBaseWorkoutPage } from "./mixins/baseWorkoutPage";
import { CreateDayFivePOM } from "./mixins/dayFive";
import { CreateDayFourPOM } from "./mixins/dayFour";
import { CreateDayOnePOM } from "./mixins/dayOne";
import { CreateDayThreePOM } from "./mixins/dayThree";
import { CreateDayTwoPOM } from "./mixins/dayTwo";
import { MixinHintModal } from "./mixins/hintModal";
import { MixinTimerModal } from "./mixins/timerModal";

export const DayOneWorkoutPage = CreateDayOnePOM(
  MixinHintModal(MixinTimerModal(MixinBaseWorkoutPage())),
);

export const DayTwoWorkoutPage = CreateDayTwoPOM(
  MixinHintModal(MixinTimerModal(MixinBaseWorkoutPage())),
);

export const DayThreeWorkoutPage = CreateDayThreePOM(
  MixinHintModal(MixinTimerModal(MixinBaseWorkoutPage())),
);

export const DayFourWorkoutPage = CreateDayFourPOM(
  MixinHintModal(MixinTimerModal(MixinBaseWorkoutPage())),
);

export const DayFiveWorkoutPage = CreateDayFivePOM(
  MixinHintModal(MixinTimerModal(MixinBaseWorkoutPage())),
);
