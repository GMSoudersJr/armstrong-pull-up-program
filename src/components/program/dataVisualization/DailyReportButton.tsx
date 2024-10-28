import { TDataToGet } from "@/definitions";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface DailyReportButtonProps {
  id: string;
  setDataVisualizationState: Dispatch<SetStateAction<TDataToGet>>;
  setShowModalState: Dispatch<SetStateAction<boolean>>;
  showModalState: boolean;
}

export const DailyReportButton = ({
  id,
  setDataVisualizationState,
  showModalState,
  setShowModalState,
}: DailyReportButtonProps) => {
  const router = useRouter();

  function showDayReport() {
    setDataVisualizationState({ getWorkoutById: id });
    setShowModalState(true);
    router.push("/program");
  }

  return <button onClick={showDayReport} disabled={showModalState}></button>;
};
