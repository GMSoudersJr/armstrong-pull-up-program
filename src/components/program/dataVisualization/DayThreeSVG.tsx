import { TDayComplete } from "@/definitions";
import * as d3 from "d3";
import { useRef, useEffect } from "react";
import { RADIUS, SVG_CHART, VIEWBOX, setTotalRepsMinMax, COLOR } from "./utils";

interface DayThreeSVGProps {
  data: TDayComplete;
}

export default function DayThreeSVG({ data }: DayThreeSVGProps) {
  const ref = useRef(null);

  useEffect((): void => {
    if (ref.current && data.grips) {
      const svgElement = d3.select(ref.current);

      const gripAndRepData = data.grips.map((grip, i) => {
        return {
          grip: [grip, grip, grip],
          sets: data.sets.slice(i * 3, i * 3 + 3),
        };
      });

      const arc: d3.Arc<any, d3.PieArcDatum<number>> = d3
        .arc<d3.PieArcDatum<number>>()
        .innerRadius(RADIUS * 0.618)
        .outerRadius(RADIUS - 1)
        .cornerRadius(4);

      const pie = d3
        .pie<number>()
        .padAngle(4 / RADIUS)
        .sort(null)
        .value((d) => d.valueOf());

      svgElement.attr("height", "100%");
      svgElement.attr("width", "100%");
      svgElement.attr("viewBox", [
        VIEWBOX.minX,
        VIEWBOX.minY,
        VIEWBOX.width,
        VIEWBOX.height,
      ]);
      svgElement.attr("style", `height: auto`);

      svgElement
        .append("g")
        .attr(
          "transform",
          `translate(${SVG_CHART.width / 2}, ${SVG_CHART.height / 2})`,
        )
        .selectAll()
        .data(pie(gripAndRepData.flatMap((entry) => entry.sets)))
        .join("path")
        .attr(
          "fill",
          (d) =>
            `${data.trainingSetReps === d.value ? COLOR.success : COLOR.fail}`,
        )
        .attr("d", arc)
        .attr("opacity", "30%");

      svgElement
        .append("g")
        .attr(
          "transform",
          `translate(${SVG_CHART.width / 2}, ${SVG_CHART.height / 2})`,
        )
        .selectAll()
        .data(pie(data.sets))
        .join("path")
        .attr("fill", "none")
        .attr("d", arc)
        .attr("stroke-width", 1)
        .attr(
          "stroke",
          (d) =>
            `${data.trainingSetReps === d.value ? COLOR.success : COLOR.fail}`,
        )
        .append("title")
        .text((d) => `${d.data}`);

      svgElement
        .append("g")
        .attr(
          "transform",
          `translate(${SVG_CHART.width / 2}, ${SVG_CHART.height / 2})`,
        )
        .attr("font-family", "consolas")
        .attr("font-size", 12)
        .attr("text-anchor", "middle")
        .selectAll()
        .data(pie(data.sets))
        .join("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .call((text) =>
          text
            .append("tspan")
            .attr("y", "0.3em")
            .attr("font-weight", "bold")
            .text((d, i) => {
              if (d.endAngle - d.startAngle > 0.25) {
                return gripAndRepData.flatMap((entry) => entry.grip)[i];
              } else {
                return "";
              }
            }),
        )
        .call((text) =>
          text
            .append("tspan")
            .attr("x", 0)
            .attr("y", "0.3em")
            .attr("fill", "#FFFF00")
            .attr("font-weight", "bold")
            .attr("font-size", 36)
            .attr("fill-opacity", 0.3)
            .text((d) => {
              if (d.endAngle - d.startAngle > 0.3) {
                return d.data.valueOf();
              } else {
                return "";
              }
            }),
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
        .attr("x", "50%")
        .attr("y", `${SVG_CHART.height + SVG_CHART.margin.bottom}`)
        .attr("dy", "7%")
        .attr("text-anchor", "middle")
        .attr("fill", "currentColor")
        .attr("font-family", "consolas")
        .text(`Training set reps: ${data.trainingSetReps}`);

      svgElement
        .append("text")
        .attr("x", "33.3%")
        .attr("y", `${SVG_CHART.height + SVG_CHART.margin.bottom}`)
        .attr("dy", "14%")
        .attr("text-anchor", "middle")
        .attr("fill", "currentColor")
        .attr("font-family", "consolas")
        .text(
          `Sets: ${data.sets.filter((set) => set === data.trainingSetReps).length}`,
        );

      svgElement
        .append("text")
        .attr("x", "66.6%")
        .attr("y", `${SVG_CHART.height + SVG_CHART.margin.bottom}`)
        .attr("dy", "14%")
        .attr("text-anchor", "middle")
        .attr("fill", "currentColor")
        .attr("font-family", "consolas")
        .text(`Total: ${setTotalRepsMinMax(data.sets)[1]}`);

      svgElement
        .append("text")
        .attr("x", "50%")
        .attr("y", `${SVG_CHART.height + SVG_CHART.margin.bottom}`)
        .attr("dy", "21%")
        .attr("text-anchor", "middle")
        .attr("fill", "currentColor")
        .attr("font-family", "consolas")
        .text(`Grips: ${data.grips.join(" | ")}`);
    }
  }, [data]);

  return <svg ref={ref} />;
}
