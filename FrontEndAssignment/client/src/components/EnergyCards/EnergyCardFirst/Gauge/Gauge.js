import React from "react";
import { arc } from "d3-shape";
import { scaleLinear } from "d3-scale";
import "./Gauge.css";

function Gauge({ value, min , max }) {
  const backgroundGauge = arc()
    .innerRadius(0.93)
    .outerRadius(1.004)
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2)
    .cornerRadius(0)();
  const percentScale = scaleLinear().domain([min, max]).range([0, 1]);
  const percent = percentScale(value);
  const angleScale = scaleLinear()
    .domain([0, 1])
    .range([-Math.PI / 2, Math.PI / 2]);
  const angle = angleScale(percent);
  const filledGauge = arc()
    .innerRadius(0.93)
    .outerRadius(1.004)
    .startAngle(-Math.PI / 2)
    .endAngle(angle)
    .cornerRadius(0)();
  return (
    <div className="gauge">
      <svg
        width="14rem"
        viewBox={[-1, -1, 2, 1].join(" ")}
      >
        <path d={backgroundGauge} fill="#dbdbe7" />
        <path d={filledGauge} fill="rgba(255, 143, 31, 1)" />
      </svg>
    </div>
  );
}

export default Gauge;
