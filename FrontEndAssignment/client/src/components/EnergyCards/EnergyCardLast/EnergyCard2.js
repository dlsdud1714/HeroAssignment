import React from "react";
import {
  IoFlash,
  IoArrowForward,
  IoArrowBack,
} from "react-icons/io5";
import "./EnergyCard2.css";
import Gauge from "./Gauge/Gauge";
function EnergyCard2({ source }) {
  //inline styles

  const cardC2Style = {
    background: `linear-gradient(90deg, rgba(${source.colorRGB}) 47.92%, rgba(${source.colorRGB}, 0.85) 79.17%, rgba(${source.colorRGB}, 0.8) 100%)`,
  };
  // const cardC2Style = { backgroundColor: source.color };
  //To display direction of current
  const displayDirection = () => {
    const value = source.value;
    let directionIcon1 = null;
    let directionIcon2 = null;
    if (value < 0) {
      directionIcon1 = <IoFlash style={{ color: "#FAC300" }} />;
      directionIcon2 = <IoArrowForward style={{ color: "#636363" }} />;
    } else if (value > 0) {
      directionIcon1 = <IoArrowBack style={{ color: "#636363" }} />;
      directionIcon2 = <IoFlash style={{ color: "#FAC300" }} />;
    } else {
      return;
    }
    return (
      <div className="card__iconsContainer">
        <div className="card__icon card__icon--secondary icon--flickering">
          {directionIcon1}
        </div>
        <div className="card__icon card__icon--secondary icon--overlap icon--flickering">
          {directionIcon2}
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <div className="card__c1">
        <div className="card__iconTextContainer">
          <div className="card__gaugeIconContainer">
            <div className="card__gauge">
              {source.type==="battery" && (
                <Gauge value={source.socValue} min={0} max={100} color={source.colorRGB}/>
              )}
            </div>
            <div className="card__icon card__icon--primary">{source.icon}</div>
          </div>
          <p className="card__text card__text--primary">{source.label}</p>
        </div>
        {displayDirection()}
      </div>
      <div className="card__c2">
        <div className="card__textContainer" style={cardC2Style}>
          <h5 className="card__text card__text--secondary" >
            {source.value} <span>{source.units}</span>
          </h5>
        </div>
      </div>
    </div>
  );
}

export default EnergyCard2;
