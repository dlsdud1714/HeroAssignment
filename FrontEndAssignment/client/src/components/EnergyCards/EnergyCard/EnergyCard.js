import React from "react";
import {
  IoFlash,
  IoFlashOff,
  IoArrowForward,
  IoArrowBack,
} from "react-icons/io5";
import "./EnergyCard.css";
function EnergyCard({ source }) {
  //inline styles
  const cardC1Style = {
    backgroundImage: `linear-gradient(rgba(103,103,103,0.8),rgba(103,103,103,0.8)), url(${source.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  const cardC2Style = { backgroundColor: source.color };
  //To display direction of current
  const displayDirection = () => {
    const value = source.value;
    let directionIcon1 = null;
    let directionIcon2 = null;
    if (value < 0) {
      directionIcon1 = <IoFlash style={{color:"#FFDF35"}}/>;
      directionIcon2 = <IoArrowForward style={{color:"#E5FF46"}}/>;
    } else if (value > 0) {
      directionIcon1 = <IoArrowBack style={{color:"#E5FF46"}}/>;
      directionIcon2 = <IoFlash style={{color:"#FFDF35"}}/>;
    } else if (value === 0) {
      directionIcon1 = <IoFlashOff style={{color:"#FFDF35"}}/>;
    }
    return (
      <div className="card__iconsContainer">
        <div className="card__icon card__icon--secondary icon--flickering">{directionIcon1}</div>
        <div className="card__icon card__icon--secondary icon--overlap icon--flickering">{directionIcon2}</div>
      </div>
    );
  };
  return (
    <div className="card">
      <div className="card__c1" style={cardC1Style}>
        <div className="card__iconContainer">
          <div className="card__iconTextContainer">
            <div className="card__icon card__icon--primary">{source.icon}</div>
            <p className="card__text card__text--primary">{source.label}</p>
          </div>
          {displayDirection()}
        </div>
      </div>
      <div className="card__c2" style={cardC2Style}>
        <h4 className="card__text card__text--secondary">
          {source.value} <span>{source.units}</span>
        </h4>
      </div>
    </div>
  );
}

export default EnergyCard;
