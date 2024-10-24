import { TDayComplete } from "@/definitions";
import * as d3 from "d3";
import { useRef, useEffect } from "react";

function setSetMinMax(sets: number[]): [number, number] {
  const min = 0;
  let max = 0;
  if (sets.length > 0) {
    max = Math.max(...sets);
  }
  return [min, max];
}

function setRepMinMax(sets: number[]): [number, number] {
  const min = 0;
  let max = 0;
  if (sets.length > 0) {
    max = sets.reduce((a, b) => a + b);
  }
  return [min, max];
}

function setCumulativeRepsTotal(sets: number[]): number[] {
  const result: number[] = [];
  for (let i = 0; i < sets.length; i++) {
    if (i === 0) {
      result.push(sets[i]);
    } else {
      result.push(result[i - 1] + sets[i]);
    }
  }
  return result;
}

interface DayThreeSVGProps {
  data: TDayComplete;
}

export default function DayThreeSVG({ data }: DayThreeSVGProps) {
  const horizontalMargin = 20;
  const width = 259;
  const height = 259;
  const marginTop = 30;
  const marginRight = horizontalMargin;
  const marginBottom = 30;
  const marginLeft = horizontalMargin;

  const radius = Math.min(height, width) / 2;

  const ref = useRef(null);
  useEffect((): void => {
    if (ref.current && data.grips) {
      const svgElement = d3.select(ref.current);

      const gripAndRepData = data.grips.map((grip, i) => {
        if (data.trainingSetReps) {
          return {
            grip: grip,
            sets: data.sets.slice(i * 3, i * 3 + 3),
            goal: data.trainingSetReps * 3,
          };
        } else {
          return {
            grip: grip,
            sets: data.sets.slice(i * 3, i * 3 + 3),
          };
        }
      });

      const arc: d3.Arc<any, d3.PieArcDatum<number>> = d3
        .arc<d3.PieArcDatum<number>>()
        .innerRadius(radius * 0.618)
        .outerRadius(radius - 1);

      const pie = d3
        .pie<number>()
        .padAngle(1 / radius)
        .sort(null)
        .value((d) => d.valueOf());

      const color = d3.scaleQuantize(setSetMinMax(data.sets), d3.schemeYlGn[3]);
      const firstGripColor = d3.scaleQuantize(
        setSetMinMax(data.sets),
        d3.schemeYlGnBu[5],
      );

      svgElement.attr("height", "100%");
      svgElement.attr("width", "100%");
      svgElement.attr("viewBox", [-width / 2, -height / 2, width, height]);
      svgElement.attr("style", `height: auto`);

      svgElement
        .append("g")
        .selectAll()
        .data(pie(gripAndRepData.flatMap((entry) => entry.sets)))
        .join("path")
        .attr("fill", (d) => firstGripColor(d.value))
        .attr("d", arc)
        .attr("opacity", "40%")
        .append("title")
        .text((d) => `${d.data}`);

      svgElement
        .append("g")
        .attr("font-family", "consolas")
        .attr("font-size", 12)
        .attr("text-anchor", "middle")
        .selectAll()
        .data(pie(data.sets))
        .join("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .call((text) =>
          text
            .filter((d) => d.endAngle - d.startAngle > 0.25)
            .append("tspan")
            .attr("x", 0)
            .attr("y", "0.3em")
            .attr("font-weight", "bold")
            .attr("fill-opacity", 0.7)
            .text((d) => d.data.valueOf()),
        );
    }
  }, [data]);

  return <svg ref={ref} />;
}
