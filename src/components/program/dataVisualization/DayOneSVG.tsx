import { TDayComplete } from "@/definitions";
import * as d3 from "d3";
import { useRef, useEffect } from "react";
import {
  VIEWBOX,
  SVG_CHART,
  setTotalRepsMinMax,
  createCumulativeTotals,
  createDomain,
} from "./utils";

interface DayOneSVGProps {
  data: TDayComplete;
}

export default function DayOneSVG({ data }: DayOneSVGProps) {
  const xDomain = data.sets.map((_, i) => {
    return (i + 1).toString();
  });

  const yLeftDomain = createDomain(data.sets);
  const yRightDomain = setTotalRepsMinMax(data.sets);
  const totalRepsData = createCumulativeTotals(data.sets);

  const ref = useRef(null);

  useEffect((): void => {
    if (ref.current) {
      const svgElement = d3.select(ref.current);

      svgElement.attr("height", "100%");
      svgElement.attr("width", "100%");
      svgElement.attr("viewBox", [
        VIEWBOX.minX,
        VIEWBOX.minY,
        VIEWBOX.width,
        VIEWBOX.height,
      ]);
      svgElement.attr("style", `height: auto`);

      const xScale = d3
        .scaleBand()
        .domain(xDomain)
        .range([
          SVG_CHART.margin.left,
          SVG_CHART.width - SVG_CHART.margin.right,
        ])
        .padding(0.35);

      const yScaleLeft = d3
        .scaleLinear()
        .nice()
        .domain(yLeftDomain)
        .range([
          SVG_CHART.height - SVG_CHART.margin.bottom,
          SVG_CHART.margin.top,
        ]);

      const yScaleRight = d3
        .scaleLinear()
        .nice()
        .domain(yRightDomain)
        .range([
          SVG_CHART.height - SVG_CHART.margin.bottom,
          SVG_CHART.margin.top,
        ]);

      const xAxisGenerator = d3.axisBottom(xScale).tickSizeOuter(0);

      const yAxisLeftGenerator = d3
        .axisLeft(yScaleLeft)
        .tickSizeOuter(0)
        .ticks(Math.min(Math.max(...data.sets), 6))
        .tickFormat(d3.format("d"));

      const yAxisRightGenerator = d3
        .axisRight(yScaleRight)
        .ticks(6)
        .tickSizeOuter(0)
        .tickFormat(d3.format("d"));

      // Append bars for each set
      svgElement
        .append("g")
        .attr("fill", "#2ECC40")
        .attr("opacity", "40%")
        .selectAll()
        .data(data.sets)
        .join("rect")
        .attr("x", (_, i) => `${xScale((i + 1).toString())}`)
        .attr("y", (d) => yScaleLeft(d))
        .attr("height", (d) => yScaleLeft(0) - yScaleLeft(d))
        .attr("width", xScale.bandwidth());

      // Append bars for each set
      svgElement
        .append("g")
        .attr("fill", "none")
        .attr("stroke-width", 1)
        .attr("stroke", "#2ECC40")
        .selectAll()
        .data(data.sets)
        .join("rect")
        .attr("x", (_, i) => `${xScale((i + 1).toString())}`)
        .attr("y", (d) => yScaleLeft(d))
        .attr("height", (d) => yScaleLeft(0) - yScaleLeft(d))
        .attr("width", xScale.bandwidth());

      // append a plus symbol for the cumulative total
      const plusSymbol = d3.symbol().type(d3.symbolCross).size(100);

      svgElement
        .append("g")
        .selectAll(".plus")
        .data(totalRepsData)
        .enter()
        .append("path")
        .attr("class", "plus")
        .attr("d", plusSymbol)
        .attr("transform", (d, i) => {
          const x = xScale(xDomain[i]);
          return x !== undefined
            ? `translate(${x + xScale.bandwidth() / 2}, ${yScaleRight(d)})`
            : ``;
        })
        .attr("stroke", "#FFFF00")
        .attr("fill", "currentColor");

      // append the x-axis
      svgElement
        .append("g")
        .attr(
          "transform",
          `translate(0, ${SVG_CHART.height - SVG_CHART.margin.bottom})`,
        )
        .attr("style", "color: #0074D9")
        .call(xAxisGenerator)
        .call((g) =>
          g
            .append("text")
            .attr("x", SVG_CHART.width / 2)
            .attr("y", SVG_CHART.margin.bottom)
            .attr("fill", "currentColor")
            .attr("text-anchor", "middle")
            .text(`SETS`),
        );

      // append the left y-axis
      svgElement
        .append("g")
        .attr("transform", `translate(${SVG_CHART.margin.left}, 0)`)
        .attr("style", "color: #2ecc40")
        .call(yAxisLeftGenerator)
        .call((g) =>
          g
            .append("text")
            .attr("x", 0)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "middle")
            .text(`REPS`),
        );

      // append the right y-axis
      svgElement
        .append("g")
        .attr(
          "transform",
          `translate(${SVG_CHART.width - SVG_CHART.margin.right}, 0)`,
        )
        .attr("style", "color: #0074d9")
        .call(yAxisRightGenerator)
        .call((g) =>
          g
            .append("text")
            .attr("x", 0)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "middle")
            .text(`TOTAL`),
        );

      // append text summary
      svgElement
        .append("text")
        .attr("x", "50%")
        .attr("y", `${SVG_CHART.height + SVG_CHART.margin.bottom}`)
        .attr("text-anchor", "middle")
        .attr("fill", "currentColor")
        .attr("font-family", "consolas")
        .text(`${data.dayAbbreviation} on ${data.date}`);

      svgElement
        .append("text")
        .attr("x", "25%")
        .attr("y", `${SVG_CHART.height + SVG_CHART.margin.bottom}`)
        .attr("dy", "10%")
        .attr("text-anchor", "middle")
        .attr("fill", "currentColor")
        .attr("font-family", "consolas")
        .text(`Max: ${Math.max(...data.sets)}`);

      svgElement
        .append("text")
        .attr("x", "75%")
        .attr("y", `${SVG_CHART.height + SVG_CHART.margin.bottom}`)
        .attr("dy", "10%")
        .attr("text-anchor", "middle")
        .attr("fill", "currentColor")
        .attr("font-family", "consolas")
        .text(`Total: ${setTotalRepsMinMax(data.sets)[1]}`);
    }
  }, [data, totalRepsData, yLeftDomain, yRightDomain, xDomain]);

  return <svg ref={ref} />;
}
