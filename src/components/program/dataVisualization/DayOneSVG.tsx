import { TDayComplete } from "@/definitions";
import * as d3 from "d3";
import { useRef, useEffect } from "react";
import { VIEWBOX, SVG_CHART, SVG_TEXT_BOX } from "./utils";

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

interface DayOneSVGProps {
  data: TDayComplete;
}

export default function DayOneSVG({ data }: DayOneSVGProps) {
  const domain = data.sets.map((_, i) => {
    return (i + 1).toString();
  });

  const ref = useRef(null);

  useEffect((): void => {
    if (ref.current) {
      const svgElement = d3.select(ref.current);
      const totalRepsData = setCumulativeRepsTotal(data.sets);

      svgElement.attr("height", "100%");
      svgElement.attr("width", "100%");
      svgElement.attr("viewBox", [
        VIEWBOX.minX,
        VIEWBOX.minY,
        VIEWBOX.width,
        VIEWBOX.height,
      ]);
      svgElement.attr("style", `height: auto`);
      svgElement.attr("font-family", "consolas");

      const xScale = d3
        .scaleBand()
        .domain(domain)
        .range([
          SVG_CHART.margin.left,
          SVG_CHART.width - SVG_CHART.margin.right,
        ])
        .padding(0.35);

      const yScaleLeft = d3
        .scaleLinear()
        .nice()
        .domain(setSetMinMax(data.sets))
        .range([
          SVG_CHART.height - SVG_CHART.margin.bottom,
          SVG_CHART.margin.top,
        ]);

      const yScaleRight = d3
        .scaleLinear()
        .nice()
        .domain(setRepMinMax(data.sets))
        .range([
          SVG_CHART.height - SVG_CHART.margin.bottom,
          SVG_CHART.margin.top,
        ]);

      const xAxisGenerator = d3.axisBottom(xScale).tickSizeOuter(0);

      const yAxisLeftGenerator = d3
        .axisLeft(yScaleLeft)
        .tickSizeOuter(0)
        .ticks(6)
        .tickFormat(d3.format("d"));

      const yAxisRightGenerator = d3
        .axisRight(yScaleRight)
        .ticks(6)
        .tickSizeOuter(0)
        .tickFormat(d3.format("d"));

      // Append bars for each set
      svgElement
        .append("g")
        .attr("fill", "#2ecc40")
        .selectAll()
        .data(data.sets)
        .join("rect")
        .attr("x", (_, i) => `${xScale((i + 1).toString())}`)
        .attr("y", (d) => yScaleLeft(d))
        .attr("height", (d) => yScaleLeft(0) - yScaleLeft(d))
        .attr("width", xScale.bandwidth());

      // append a plus symbol for the cumulative total
      const plusSymbol = d3.symbol().type(d3.symbolCross).size(60);

      svgElement
        .append("g")
        .selectAll(".plus")
        .data(totalRepsData)
        .enter()
        .append("path")
        .attr("class", "plus")
        .attr("d", plusSymbol)
        .attr("transform", (d, i) => {
          const x = xScale(domain[i]);
          return x !== undefined
            ? `translate(${x + xScale.bandwidth() / 2}, ${yScaleRight(d)})`
            : ``;
        })
        .attr("stroke", "currentColor")
        .attr("fill", "#FFFF00");

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
        .text(`max: ${Math.max(...data.sets)}`);

      svgElement
        .append("text")
        .attr("x", "75%")
        .attr("y", `${SVG_CHART.height + SVG_CHART.margin.bottom}`)
        .attr("dy", "10%")
        .attr("text-anchor", "middle")
        .attr("fill", "currentColor")
        .attr("font-family", "consolas")
        .text(`total: ${setRepMinMax(data.sets)[1]}`);
    }
  }, []);

  return <svg ref={ref} />;
}
