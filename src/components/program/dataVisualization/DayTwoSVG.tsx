import { TDayComplete } from "@/definitions";
import * as d3 from "d3";
import { useRef, useEffect } from "react";
import {
  VIEWBOX,
  SVG_CHART,
  setTotalRepsMinMax,
  createCumulativeTotals,
} from "./utils";

function createPyramidData(setData: number[]): number[] {
  return [0].concat(setData);
}

function setSetMinMax(sets: number[]): [number, number] {
  const min = 0;
  let max = 0;
  if (sets.length > 0) {
    max = Math.max(...sets);
  }
  return [min, max];
}

interface DayTwoSVGProps {
  data: TDayComplete;
}

export default function DayTwoSVG({ data }: DayTwoSVGProps) {
  const pyramidData = createPyramidData(data.sets);
  const totalRepsData = createCumulativeTotals(pyramidData);
  const yRightDomain = setTotalRepsMinMax(pyramidData);

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
        .scaleLinear()
        .domain([0, pyramidData.length - 1])
        .range([
          SVG_CHART.margin.left,
          SVG_CHART.width - SVG_CHART.margin.right,
        ]);

      const yScaleLeft = d3
        .scaleLinear()
        .nice()
        .domain(setSetMinMax(pyramidData))
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

      const area = d3
        .area<number>()
        .x((_, i) => xScale(i))
        .y0(SVG_CHART.height - SVG_CHART.margin.bottom)
        .y1((d) => yScaleLeft(d));

      const line = d3
        .line<number>()
        .x((_, i) => xScale(i))
        .y((d) => yScaleLeft(d));

      const xLinearAxisGenerator = d3
        .axisBottom(xScale)
        .tickSizeOuter(0)
        .ticks(pyramidData.length)
        .tickFormat(d3.format("d"));

      const yAxisLeftGenerator = d3
        .axisLeft(yScaleLeft)
        .tickSizeOuter(0)
        .ticks(d3.max(pyramidData))
        .tickFormat(d3.format("d"));

      const yAxisRightGenerator = d3
        .axisRight(yScaleRight)
        .tickSizeOuter(0)
        .ticks(6)
        .tickFormat(d3.format("d"));

      svgElement
        .append("path")
        .datum(pyramidData)
        .attr("class", "area")
        .attr("d", area)
        .attr("fill", "#2ECC40")
        .attr("opacity", "40%");

      // append line
      svgElement
        .append("path")
        .datum(pyramidData)
        .attr("class", "line")
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke-width", 1)
        .attr("stroke", "#2ECC40");

      // append the linear x-axis
      svgElement
        .append("g")
        .attr(
          "transform",
          `translate(0, ${SVG_CHART.height - SVG_CHART.margin.bottom})`,
        )
        .attr("style", "color: #0074D9")
        .call(xLinearAxisGenerator)
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
            .text(`PEAK`),
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

      // append a star symbol for the cumulative total
      const starSymbol = d3.symbol().type(d3.symbolStar).size(60);

      svgElement
        .append("g")
        .selectAll(".star")
        .data(totalRepsData.slice(1))
        .enter()
        .append("path")
        .attr("class", "star")
        .attr("d", starSymbol)
        .attr(
          "transform",
          (d, i) => `translate(${xScale(i + 1)}, ${yScaleRight(d)})`,
        )
        .attr("stroke", "currentColor")
        .attr("fill", "#FFFF00");
      //
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
        .text(`Peak: ${Math.max(...data.sets)}`);

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
  }, [data]);

  return <svg ref={ref} />;
}
