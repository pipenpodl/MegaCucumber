import React, { useState, useEffect } from "react";
import { getDataFromserver } from "../../utils/functionsTreatmentData";

import style from "./SensorsInfo.module.css";

const SensorsInfo = () => {
  const [data, setData] = useState({});
  const [connectionError, setConnectionError] = useState("");

  useEffect(() => {
    setInterval(async () => {
      setTimeout(
        await getDataFromserver("/sensors")
          .then((res) => {
            setData(res.data);
            setConnectionError("");
          })
          .catch((err) => {
            setConnectionError(`${err.code} на странице с датчиками`);
          }),
        1000
      );
    }, 1000);
  }, []);
  return (
    <div className={style.Main_two}>
      <div className={style.Time}>
        {connectionError !== "" ? (
          <h1 className={style.err}>{connectionError}</h1>
        ) : (
          <div>
            <h1>{data["time"]}</h1>
            <h3>{data["date"]}</h3>
          </div>
        )}
      </div>
      <div className={style.Main_block}>
        <div className={style.Sensors_water}>
          <div className={style.Lux}>
            <p>{data["lux"]}</p>
          </div>
          <div className={style.Temp_solution}>
            <span>{data["temperature_solution"]}</span>
          </div>
        </div>
        <div className={style.Sensors_air}>
          <div className={style.Temperature}>
            <p>{data["temperature"]}</p>

          </div>
          <div className={style.Humidity}>
            <p>{data["humidity"]}</p>
          </div>
        </div>
      </div>
      <div className={style.Water_state}>
        <p className={style.txt}>{data["water_state"]}</p>
      </div>
    </div>
  );
};

export default SensorsInfo;
