"use client";

import { Modal } from "@/components/program/Modal";
import { use, useEffect, useState } from "react";
import { TDayComplete } from "@/definitions";
import {
  getWorkoutById,
  getWorkoutsByDayNumber,
  getWorkoutsbyWeekNumber,
} from "@/indexedDBActions";
import DataVisualization from "@/dataVisualization";

export default function Page({
  params,
}: {
  params: Promise<{ getData: string; index: string }>;
}) {
  const { getData, index } = use(params);
  const initialData: TDayComplete[] = [];
  const [data, setData] = useState(initialData);
  const [heading, setHeading] = useState("");

  useEffect(() => {
    if (getData === "workout") {
      getWorkoutById(index)
        .then((value) => {
          setData(value);
          setHeading(`W${value[0].weekNumber}-D${value[0].dayNumber} REVIEW`);
        })
        .catch((error) => console.warn(error));
    }

    if (getData === "week") {
      getWorkoutsbyWeekNumber(Number.parseInt(index))
        .then((value) => {
          setData(value);
          setHeading(`W${index} REVIEW`);
        })
        .catch((error) => console.warn(error));
    }

    if (getData === "day") {
      getWorkoutsByDayNumber(Number.parseInt(index))
        .then((value) => {
          setData(value);
          setHeading(`D${index} REVIEW`);
        })
        .catch((error) => console.warn(error));
    }
  }, [getData, index]);

  return (
    <Modal heading={heading}>
      <DataVisualization data={data} />
    </Modal>
  );
}
