import axios from "axios";
import React, { useEffect, useState } from "react";

function EnergySources() {
  const [energySources, setEnergySources] = useState([]);

  useEffect(() => {
    //To get data from json
    const getData = async () => {
      try {
        const response = await axios.get("/powerFlow");
        const data = response.data;
        //To filter out microgrid from data
        const resourceData = data.filter((src) => src.value);
        console.log("data", resourceData);
        setEnergySources(resourceData);
      } catch (err) {
        console.log("ERR:", err);
      }
    };
    getData();
  }, []);

  const displaySrcs = () => {
    if (energySources.length !== 0) {
      return energySources.map((src, index) => {
        const value = src.value;
        const name = src.label;
        return (
          <tr key={`energySource-${index}`}>
            <td>{name}</td>
            <td>{value}</td>
          </tr>
        );
      });
    }
  };
  const displaySum = () => {
    if (energySources.length !== 0) {
      const sum = energySources.reduce((acc, cur) => {
        return acc + cur.value;
      }, 0);
      return (
        <tr>
          <td>Total Energy</td>
          <td>{sum}</td>
        </tr>
      );
    }
  };
  return (
    <section>
      <h1> A List of Energy Resources</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value (kW) </th>
          </tr>
        </thead>
        <tbody>{displaySrcs()}</tbody>
        <tfoot>{displaySum()}</tfoot>
      </table>
    </section>
  );
}

export default EnergySources;
