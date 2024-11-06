"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { TDayComplete } from "@/definitions";
import {
  getWorkoutById,
  getWorkoutsByDayNumber,
  getWorkoutsbyWeekNumber,
} from "@/indexedDBActions";
import DataVisualization from "@/dataVisualization";
import { nunito } from "@/fonts";

const Page = ({ params }: { params: { getData: string; index: string } }) => {
  const initialData: TDayComplete[] = [];
  const [dataToGet, setDataToGet] = useState("");
  const [data, setData] = useState(initialData);
  const [heading, setHeading] = useState("");
  const [dataError, setDataError] = useState(false);

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
          setDataError(true);
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
          setDataError(true);
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
          setDataError(true);
        });
    }
  }, [dataToGet, params.getData, params.index]);

  return (
    <div className={styles.page}>
      {dataError ? (
        <h1>Click the link, please</h1>
      ) : (
        <>
          <h1 style={nunito.style} className={styles.heading}>
            {heading}
          </h1>
          <DataVisualization data={data} />
        </>
      )}
    </div>
  );
};

export default Page;
