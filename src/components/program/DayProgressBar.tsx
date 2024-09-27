import { TDayAbbreviation } from "@/definitions";

interface DayProgressBarProps {
  dayAbbreviation: TDayAbbreviation;
  currentSetNumber: number;
  maxSetNumber: number;
}

const DayProgessBar = ({
  dayAbbreviation,
  currentSetNumber,
  maxSetNumber,
}: DayProgressBarProps) => {
  return (
    <progress
      id="day-progress"
      value={currentSetNumber}
      max={maxSetNumber}
      aria-label={`Progress for ${dayAbbreviation}`}
    ></progress>
  );
};

export default DayProgessBar;
