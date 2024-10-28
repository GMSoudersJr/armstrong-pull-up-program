import { TDayComplete } from "@/definitions";
import styles from "./DataVisualization.module.css";
import { nunito } from "@/fonts";
import DayOneSVG from "./DayOneSVG";
import DayTwoSVG from "./DayTwoSVG";
import DayThreeSVG from "./DayThreeSVG";
import DayFourSVG from "./DayFourSVG";

interface DataVisualizationProps {
  heading: string;
  data: TDayComplete[];
}

const DataVisualization = ({ data, heading }: DataVisualizationProps) => {
  return (
    <div id="data-visualization-content" className={styles.content}>
      <h1 className={styles.heading} style={nunito.style}>
        {heading}
      </h1>
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
        })}
      </ul>
    </div>
  );
};

export default DataVisualization;
