"use client";

import { Modal } from "@/components/program/Modal";
import { useEffect, useState } from "react";
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
  params: { getData: string; index: string };
}) {
  const initialData: TDayComplete[] = [];
  const [dataToGet, setDataToGet] = useState("");
  const [data, setData] = useState(initialData);
  const [heading, setHeading] = useState("");

  useEffect(() => {
    setDataToGet(params.getData);

    if (dataToGet === "workout") {
      const id = params.index;
      getWorkoutById(id)
        .then((value) => {
          setData(value);
          setHeading(`W${value[0].weekNumber}-D${value[0].dayNumber} REVIEW`);
        })
        .catch((error) => {
          console.warn(error);
        });
    }

    if (dataToGet === "week") {
      const weekNumber = params.index;
      getWorkoutsbyWeekNumber(Number.parseInt(weekNumber))
        .then((value) => {
          setData(value);
          setHeading(`W${weekNumber} REVIEW`);
        })
        .catch((error) => {
          console.warn(error);
        });
    }

    if (dataToGet === "day") {
      const dayNumber = params.index;
      getWorkoutsByDayNumber(Number.parseInt(dayNumber))
        .then((value) => {
          setData(value);
          setHeading(`D${dayNumber} REVIEW`);
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  }, [dataToGet]);

  return (
    <Modal heading={heading}>
      <DataVisualization data={data} />
    </Modal>
  );
}
