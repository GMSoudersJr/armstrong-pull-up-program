"use client";

import styles from "./page.module.css";
import { use, useEffect, useState } from "react";
import { TDayComplete } from "@/definitions";
import {
  getWorkoutById,
  getWorkoutsByDayNumber,
  getWorkoutsbyWeekNumber,
} from "@/indexedDBActions";
import DataVisualization from "@/dataVisualization";
import { nunito } from "@/fonts";

const Page = ({
  params,
}: {
  params: Promise<{ getData: string; index: string }>;
}) => {
  const { getData, index } = use(params);
  const initialData: TDayComplete[] = [];
  const [data, setData] = useState(initialData);
  const [heading, setHeading] = useState("");
  const [dataError, setDataError] = useState(false);

  useEffect(() => {
    if (getData === "workout") {
      getWorkoutById(index)
        .then((value) => {
          setData(value);
          setHeading(`W${value[0].weekNumber}-D${value[0].dayNumber} REVIEW`);
        })
        .catch((error) => {
          console.warn(error);
          setDataError(true);
        });
    }

    if (getData === "week") {
      getWorkoutsbyWeekNumber(Number.parseInt(index))
        .then((value) => {
          setData(value);
          setHeading(`W${index} REVIEW`);
        })
        .catch((error) => {
          console.warn(error);
          setDataError(true);
        });
    }

    if (getData === "day") {
      getWorkoutsByDayNumber(Number.parseInt(index))
        .then((value) => {
          setData(value);
          setHeading(`D${index} REVIEW`);
        })
        .catch((error) => {
          console.warn(error);
          setDataError(true);
        });
    }
  }, [getData, index]);

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
