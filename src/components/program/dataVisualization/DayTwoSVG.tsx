import { TDayComplete } from "@/definitions";
import * as d3 from "d3";
import { useRef, useEffect } from "react";

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

interface DayTwoSVGProps {
  data: TDayComplete;
}

export default function DayTwoSVG({ data }: DayTwoSVGProps) {
  const horizontalMargin = 20;
  const width = 259;
  const height = 259;
  const marginTop = 30;
  const marginRight = horizontalMargin;
  const marginBottom = 30;
  const marginLeft = horizontalMargin;

  const ref = useRef(null);

  useEffect((): void => {
    if (ref.current) {
      const svgElement = d3.select(ref.current);
      const pyramidData = createPyramidData(data.sets);
      const totalRepsData = setCumulativeRepsTotal(pyramidData);
      console.log("total rep data", totalRepsData);
      console.log("pyramid data", pyramidData);

      svgElement.attr("height", "100%");
      svgElement.attr("width", "100%");
      svgElement.attr("viewBox", [0, 0, width, height]);
      svgElement.attr("style", `height: auto`);

      const xScaleLinear = d3
        .scaleLinear()
        .domain([0, pyramidData.length - 1])
        .range([marginLeft, width - marginRight]);

      const yScaleLeft = d3
        .scaleLinear()
        .nice()
        .domain(setSetMinMax(pyramidData))
        .range([height - marginBottom, marginTop]);

      const yScaleRight = d3
        .scaleLinear()
        .nice()
        .domain(setRepMinMax(data.sets))
        .range([height - marginBottom, marginTop]);

      const areaLinear = d3
        .area<number>()
        .x((_, i) => xScaleLinear(i))
        .y0(height - marginBottom)
        .y1((d) => yScaleLeft(d));

      const line = d3
        .line<number>()
        .x((_, i) => xScaleLinear(i))
        .y((d) => yScaleLeft(d));

      const xLinearAxisGenerator = d3
        .axisBottom(xScaleLinear)
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
        .ticks(d3.max(data.sets))
        .tickFormat(d3.format("d"));

      svgElement
        .append("path")
        .datum(pyramidData)
        .attr("class", "area")
        .attr("d", areaLinear)
        .attr("fill", "#2ECC40")
        .attr("opacity", "50%");

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
        .attr("transform", `translate(0, ${height - marginBottom})`)
        .attr("style", "color: #0074D9")
        .call(xLinearAxisGenerator)
        .call((g) =>
          g
            .append("text")
            .attr("x", width / 2)
            .attr("y", 30)
            .attr("fill", "currentColor")
            .attr("text-anchor", "middle")
            .text(`SETS`),
        );

      // append the left y-axis
      svgElement
        .append("g")
        .attr("transform", `translate(${marginLeft}, 0)`)
        .attr("style", "color: #2ecc40")
        .call(yAxisLeftGenerator)
        .call((g) =>
          g
            .append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(`PEAK: ${setSetMinMax(data.sets)[1]}`),
        );

      const totalRepsXValueOffset = (reps: number): number => {
        if (reps === 0) return 0;
        if (reps < 100) return 8;
        return 16;
      };

      // append the right y-axis
      svgElement
        .append("g")
        .attr("transform", `translate(${width - marginRight}, 0)`)
        .attr("style", "color: #0074d9")
        .call(yAxisRightGenerator)
        .call((g) =>
          g
            .append("text")
            .attr(
              "x",
              -marginRight +
                totalRepsXValueOffset(setCumulativeRepsTotal(data.sets)[-1]),
            )
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "middle")
            .text(`TOTAL: ${d3.max(setCumulativeRepsTotal(data.sets))}`),
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
          (d, i) => `translate(${xScaleLinear(i + 1)}, ${yScaleRight(d)})`,
        )
        .attr("stroke", "currentColor")
        .attr("fill", "#FFFF00");
    }
  }, []);

  return <svg ref={ref} />;
}
