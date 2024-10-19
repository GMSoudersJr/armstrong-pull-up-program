import { TDataToGet } from "@/definitions";
import { nunito } from "@/fonts";
import { Dispatch, SetStateAction } from "react";

interface DayCompareButtonProps {
  dayNumber: number;
  text: string;
  setDataVisualizationState: Dispatch<SetStateAction<TDataToGet>>;
  setShowModalState: Dispatch<SetStateAction<boolean>>;
  showModalState: boolean;
}

export const DayCompareButton = ({
  dayNumber,
  text,
  setDataVisualizationState,
  showModalState,
  setShowModalState,
}: DayCompareButtonProps) => {
  function showDayComparison() {
    setDataVisualizationState({ getWorkoutsByDayNumber: dayNumber });
    setShowModalState(true);
  }

  return (
    <button onClick={showDayComparison} disabled={showModalState}>
      <h6 style={nunito.style}>{text}</h6>
    </button>
  );
};
