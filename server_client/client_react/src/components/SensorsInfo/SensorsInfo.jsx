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
            <p className={style.err}>{connectionError}</p>
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
                <div className={style.color_sensors_up}>Освещенность</div>
                <div className={style.custom_ts}>
                  <p>{data["lux"]}</p>
                </div>
          </div>
         
          <div className={style.Temp_solution}>
              <div className={style.color_sensors_down}>Температура раствора</div>
              <div className={style.custom_ts}>
                <span>{data["temperature_solution"]}</span>
              </div>
          </div>
        </div>
        <div className={style.Sensors_air}>
          <div className={style.Temperature}>
            <div className={style.sensors_air_color}>Температура</div>
            <div className={style.info_sens_air}>
              <p>{data["temperature"]}</p>
            </div>
          </div>
          <div className={style.Humidity}>
            <div className={style.sensors_air_color}>Влажность</div>
            <div className={style.info_sens_air}>
              <p>{data["humidity"]}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={style.Water_state}>
        <div className={style.side_color}></div>
        <p className={style.txt}>{data["water_state"]}</p>
        <div className={style.side_color}></div>
      </div>
    </div>
  );
};

export default SensorsInfo;
