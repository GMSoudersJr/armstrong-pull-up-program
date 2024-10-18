import { nunito } from "@/fonts";
import { Dispatch, SetStateAction } from "react";

interface WeeklyReportButtonProps {
  weekNumber: number;
  setDataVisualizationState: Dispatch<SetStateAction<{}>>;
  setShowModalState: Dispatch<SetStateAction<boolean>>;
  showModalState: boolean;
}

export const WeeklyReportButton = ({
  weekNumber,
  setDataVisualizationState,
  showModalState,
  setShowModalState,
}: WeeklyReportButtonProps) => {
  function showWeeklyReport() {
    setShowModalState(true);
    setDataVisualizationState({ getWorkoutsByWeek: weekNumber });
  }

  return (
    <button onClick={showWeeklyReport} disabled={showModalState}>
      <h6 style={nunito.style}>{`W${weekNumber}`}</h6>
    </button>
  );
};
