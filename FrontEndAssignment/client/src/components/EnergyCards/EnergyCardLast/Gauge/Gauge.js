import React from "react";
import { arc } from "d3-shape";
import { scaleLinear } from "d3-scale";
import "./Gauge.css";

function Gauge({ value, min, max, color }) {
  const backgroundGauge = arc()
    .innerRadius(0.85)
    .outerRadius(1)
    .startAngle(-Math.PI)
    .endAngle(Math.PI)
    .cornerRadius(0)();
  const percentScale = scaleLinear().domain([min, max]).range([0, 1]);
  const percent = percentScale(value);
  const angleScale = scaleLinear()
    .domain([0, 1])
    .range([-Math.PI / 2, Math.PI / 2]);
  const angle = angleScale(percent);
  const filledGauge = arc()
    .innerRadius(0.85)
    .outerRadius(1)
    .startAngle(-Math.PI)
    .endAngle(angle)
    .cornerRadius(10)();
  return (
    <div className="gauge">
      <svg width="100%" viewBox={[-1, -1, 2, 2].join(" ")}>
        <path d={backgroundGauge} fill="#dbdbe7" />
        <path d={filledGauge} fill={`rgb(${color})`} />
      </svg>
    </div>
  );
}

export default Gauge;
