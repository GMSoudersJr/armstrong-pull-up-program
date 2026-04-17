"use client";

import styles from "./page.module.css";
import { useEffect, useState, use } from "react";
import { TDayComplete } from "@/definitions";
import {
  getWorkoutById,
  getWorkoutsByDayNumber,
  getWorkoutsbyWeekNumber,
} from "@/indexedDBActions";
import DataVisualization from "@/dataVisualization";
import { nunito } from "@/fonts";

const Page = (props: { params: Promise<{ getData: string; index: string }> }) => {
  const params = use(props.params);
  const initialData: TDayComplete[] = [];
  const [data, setData] = useState(initialData);
  const [heading, setHeading] = useState("");
  const [dataError, setDataError] = useState(false);

  useEffect(() => {
    if (params.getData === "workout") {
      getWorkoutById(params.index)
        .then((value) => {
          setData(value);
          setHeading(`W${value[0].weekNumber}-D${value[0].dayNumber} REVIEW`);
        })
        .catch((error) => {
          console.warn(error);
          setDataError(true);
        });
    }

    if (params.getData === "week") {
      getWorkoutsbyWeekNumber(Number.parseInt(params.index))
        .then((value) => {
          setData(value);
          setHeading(`W${params.index} REVIEW`);
        })
        .catch((error) => {
          console.warn(error);
          setDataError(true);
        });
    }

    if (params.getData === "day") {
      getWorkoutsByDayNumber(Number.parseInt(params.index))
        .then((value) => {
          setData(value);
          setHeading(`D${params.index} REVIEW`);
        })
        .catch((error) => {
          console.warn(error);
          setDataError(true);
        });
    }
  }, [params.getData, params.index]);

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
