import { Dispatch, SetStateAction } from "react";

interface DailyReportButtonProps {
  id: string;
  setDataVisualizationState: Dispatch<SetStateAction<{}>>;
  setShowModalState: Dispatch<SetStateAction<boolean>>;
  showModalState: boolean;
}

export const DailyReportButton = ({
  id,
  setDataVisualizationState,
  showModalState,
  setShowModalState,
}: DailyReportButtonProps) => {
  function showDayReport() {
    setDataVisualizationState({ getWorkoutById: id });
    setShowModalState(true);
  }

  return <button onClick={showDayReport} disabled={showModalState}></button>;
};
