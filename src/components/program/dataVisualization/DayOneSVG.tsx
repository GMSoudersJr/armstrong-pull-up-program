import { TDayComplete } from "@/definitions";
import * as d3 from "d3";
import { attachReactRefresh } from "next/dist/build/webpack-config";
import { useRef, useEffect, useState } from "react";

function setMinMax(sets: number[]): [number, number] {
  const min = 0;
  let max = 0;
  if (sets.length > 0) {
    max = Math.max(...sets);
  }
  return [min, max];
}

interface DayOneSVGProps {
  data: TDayComplete;
}

export default function DayOneSVG({ data }: DayOneSVGProps) {
  const horizontalMargin = 20;
  const width = 260;
  const height = 260;
  const marginTop = 30;
  const marginRight = horizontalMargin;
  const marginBottom = 30;
  const marginLeft = horizontalMargin;

  const ref = useRef(null);

  useEffect((): void => {
    if (ref.current) {
      const svgElement = d3.select(ref.current);

      svgElement.attr("height", "100%");
      svgElement.attr("width", "100%");
      svgElement.attr("viewBox", [0, 0, width, height]);
      svgElement.attr("style", `border: 1px solid, green;`);

      const xScale = d3
        .scaleBand()
        .domain(["1", "2", "3", "4", "5"])
        .range([marginLeft, width - marginRight])
        .padding(0.2);

      const yScaleLeft = d3
        .scaleLinear()
        .domain(setMinMax(data.sets))
        .range([height - marginBottom, marginBottom - marginTop]);

      const xAxisGenerator = d3.axisBottom(xScale).tickSizeOuter(0);
      const yAxisLeftGenerator = d3.axisLeft(yScaleLeft).tickSizeOuter(0);

      svgElement
        .append("g")
        .attr("fill", "steelBlue")
        .selectAll()
        .data(data.sets)
        .join("rect")
        .attr("x", (_, i) => `${xScale((i + 1).toString())}`)
        .attr("y", (d) => yScaleLeft(d))
        .attr("height", (d) => yScaleLeft(0) - yScaleLeft(d))
        .attr("width", xScale.bandwidth());

      svgElement
        .append("g")
        .attr("transform", `translate(0, ${height - marginBottom})`)
        .call(xAxisGenerator);

      svgElement
        .append("g")
        .attr("transform", `translate(${marginLeft}, 0)`)
        .call(yAxisLeftGenerator);
    }
  }, []);

  return <svg ref={ref} />;
}
