"use client";

import { Modal } from "@/components/program/Modal";
import { useEffect, useState, use } from "react";
import { TDayComplete } from "@/definitions";
import {
  getWorkoutById,
  getWorkoutsByDayNumber,
  getWorkoutsbyWeekNumber,
} from "@/indexedDBActions";
import DataVisualization from "@/dataVisualization";

export default function Page(
  props: {
    params: Promise<{ getData: string; index: string }>;
  }
) {
  const params = use(props.params);
  const initialData: TDayComplete[] = [];
  const [data, setData] = useState(initialData);
  const [heading, setHeading] = useState("");

  useEffect(() => {
    if (params.getData === "workout") {
      getWorkoutById(params.index)
        .then((value) => {
          setData(value);
          setHeading(`W${value[0].weekNumber}-D${value[0].dayNumber} REVIEW`);
        })
        .catch((error) => console.warn(error));
    }

    if (params.getData === "week") {
      getWorkoutsbyWeekNumber(Number.parseInt(params.index))
        .then((value) => {
          setData(value);
          setHeading(`W${params.index} REVIEW`);
        })
        .catch((error) => console.warn(error));
    }

    if (params.getData === "day") {
      getWorkoutsByDayNumber(Number.parseInt(params.index))
        .then((value) => {
          setData(value);
          setHeading(`D${params.index} REVIEW`);
        })
        .catch((error) => console.warn(error));
    }
  }, [params.getData, params.index]);

  return (
    <Modal heading={heading}>
      <DataVisualization data={data} />
    </Modal>
  );
}
