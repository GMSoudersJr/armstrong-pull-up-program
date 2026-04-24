import { TDayComplete } from "@/definitions";
import styles from "./DataVisualization.module.css";
import DayOneSVG from "./DayOneSVG";
import DayTwoSVG from "./DayTwoSVG";
import DayThreeSVG from "./DayThreeSVG";
import DayFourSVG from "./DayFourSVG";

interface DataVisualizationProps {
  data: TDayComplete[];
}

const DataVisualization = ({ data }: DataVisualizationProps) => {
  return (
    <ul id="d3-section" className={styles.dataVisualizationList}>
      {data.map((entry) => {
        if (entry.dayAbbreviation === "5MES")
          return (
            <li key={entry.id}>
              <DayOneSVG data={entry} />
            </li>
          );
        if (entry.dayAbbreviation === "PYRA")
          return (
            <li key={entry.id}>
              <DayTwoSVG data={entry} />
            </li>
          );
        if (entry.dayAbbreviation === "3S3G")
          return (
            <li key={entry.id}>
              <DayThreeSVG data={entry} />
            </li>
          );
        if (entry.dayAbbreviation === "MXTS")
          return (
            <li key={entry.id}>
              <DayFourSVG data={entry} />
            </li>
          );
        if (entry.dayAbbreviation === "SKPD")
          return (
            <li key={entry.id}>
              <p className={styles.skippedEntry}>
                SKPD on {entry.date}
              </p>
            </li>
          );
      })}
    </ul>
  );
};

export default DataVisualization;
