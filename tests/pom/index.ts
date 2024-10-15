import { MixinBaseWorkoutPage } from "./mixins/baseWorkoutPage";
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
