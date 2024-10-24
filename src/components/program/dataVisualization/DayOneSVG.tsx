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

interface DayOneSVGProps {
  data: TDayComplete;
}

export default function DayOneSVG({ data }: DayOneSVGProps) {
  const horizontalMargin = 20;
  const width = 259;
  const height = 259;
  const marginTop = 30;
  const marginRight = horizontalMargin;
  const marginBottom = 30;
  const marginLeft = horizontalMargin;
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
      svgElement.attr("viewBox", [0, 0, width, height]);
      svgElement.attr("style", `height: auto`);

      const xScale = d3
        .scaleBand()
        .domain(domain)
        .range([marginLeft, width - marginRight])
        .padding(0.35);

      const yScaleLeft = d3
        .scaleLinear()
        .nice()
        .domain(setSetMinMax(data.sets))
        .range([height - marginBottom, marginTop]);

      const yScaleRight = d3
        .scaleLinear()
        .nice()
        .domain(setRepMinMax(data.sets))
        .range([height - marginBottom, marginTop]);

      const xAxisGenerator = d3.axisBottom(xScale).tickSizeOuter(0);

      const yAxisLeftGenerator = d3
        .axisLeft(yScaleLeft)
        .tickSizeOuter(0)
        .ticks(d3.max(data.sets))
        .tickFormat(d3.format("d"));

      const yAxisRightGenerator = d3
        .axisRight(yScaleRight)
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
        .attr("transform", `translate(0, ${height - marginBottom})`)
        .attr("style", "color: #0074D9")
        .call(xAxisGenerator)
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
            .text(`MAX: ${setSetMinMax(data.sets)[1]}`),
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
    }
  }, []);

  return <svg ref={ref} />;
}
