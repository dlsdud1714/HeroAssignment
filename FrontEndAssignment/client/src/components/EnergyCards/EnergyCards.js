import axios from "axios";
import React, { useEffect, useState } from "react";
import EnergyCard2 from "./EnergyCardLast/EnergyCard2";
import EnergyCard1 from "./EnergyCardFirst/EnergyCard1";
import { FaSolarPanel } from "react-icons/fa";
import { MdOutlineElectricCar } from "react-icons/md";
import { TbBattery2 } from "react-icons/tb";
import { BsHouseDoor } from "react-icons/bs";
import { TiFlowChildren } from "react-icons/ti";
import solarImage from "../../images/img-solarpannel.jpg";
import batteryImage from "../../images/img-battery.jpg";
import loadImage from "../../images/img-load.jpg";
import microgridImage from "../../images/img-microgrid.jpg";
import evImage from "../../images/img-ev.jpg";
import "./EnergyCards.css";

function EnergyCards() {
  const [energySources, setEnergySources] = useState([]);

  useEffect(() => {
    //To get data from json
    const getData = async () => {
      try {
        const response = await axios.get("/powerFlow");
        const data = response.data;
        //update icons
        updateIconImgColor(data);
        //update microgrid value
        updateMicrogrid(data);
        //reorder data alphabetically
        const orderedData = updateOrderAsc(data);
        //set updated dat to a state
        setEnergySources(orderedData);
      } catch (err) {
        console.log("ERR:", err);
      }
    };
    getData();
  }, []);

  //To add icons and representative colors for data
  const updateIconImgColor = (data) => {
    data.forEach((src) => {
      switch (src.type.toLowerCase()) {
        case "solar":
          src.icon = <FaSolarPanel />;
          src.colorRGB = "170, 192, 30";
          src.image = solarImage;
          break;
        case "battery":
          src.icon = <TbBattery2 />;
          src.colorRGB = "255, 143, 31";
          src.image = batteryImage;
          break;
        case "ev":
          src.icon = <MdOutlineElectricCar />;
          src.colorRGB = "71, 111, 255";
          src.image = evImage;
          break;
        case "load":
          src.icon = <BsHouseDoor />;
          src.colorRGB = "239, 173, 45";
          src.image = loadImage;
          break;
        case "microgrid":
          src.icon = <TiFlowChildren />;
          src.colorRGB = "0,0,0";
          src.image = microgridImage;
          break;
        default:
          src.icon = null;
          src.colorRGB = null;
      }
    });
  };
  //To set energy sum value to microgrid in energySource array
  const updateMicrogrid = (data) => {
    const microgrid = data.find((src) => src?.type === "microgrid");
    if (!microgrid.value) {
      const sum = data.reduce((acc, cur) => {
        if (cur.value) {
          return acc + cur.value;
        }
        return acc;
      }, 0);
      //To set the energy value of microgrid
      microgrid.value = sum;
    }
  };

  // To update data alphabetically
  const updateOrderAsc = (data) => {
    const newArrAsc = data.sort((a, b) => {
      if (a.label < b.label) return -1;
      if (a.label > b.label) return 1;
      return 0;
    });
    return newArrAsc;
  };

  return (
    <>
      <section className="section__cards">
        <h4>Assignment1 Bonus (1)</h4>
        {energySources.length !== 0 && (
          <div className="cards__container">
            <div className="cards__row cards__row__1">
              {energySources.slice(0, 2).map((src, index) => {
                return (
                  <EnergyCard2 key={`energy-card-${index}`} source={src} />
                );
              })}
            </div>
            <div className="cards__row cards__row__2">
              {energySources.slice(2).map((src, index) => {
                return (
                  <EnergyCard2 key={`energy-card-${index}`} source={src} />
                );
              })}
            </div>
          </div>
        )}
      </section>

      <section className="section__cards">
      <h4>Assignment1 Bonus (2)</h4>
        {energySources.length !== 0 && (
          <div className="cards__container">
            <div className="cards__row cards__row__1">
              {energySources.slice(0, 2).map((src, index) => {
                return (
                  <EnergyCard1 key={`energy-card-${index}`} source={src} />
                );
              })}
            </div>
            <div className="cards__row cards__row__2">
              {energySources.slice(2).map((src, index) => {
                return (
                  <EnergyCard1 key={`energy-card-${index}`} source={src} />
                );
              })}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default EnergyCards;
