import React from "react";
import style from "./MainSetLight.module.css";
const MainSetLight = ({
  timeStart,
  timeEnd,
  setTimeStart,
  setBackgroundColorButtonSave,
  setTimeEnd,
  validateInput,
  valid
}) => {
  return (
    <div className={style.Main_light}>
      <div className={style.color_light}>
        <p className={style.light_h1}>Настройки света</p>
      </div>

      <div className={style.center_light}>
        <div>
          <span className={style.err}>{valid}</span>
          <p>Начало дня</p>
          <input
          className={style.inp}
            type="time"
            value={timeStart}
            onChange={(e) => {
              setTimeStart(e.target.value);
              setBackgroundColorButtonSave("#FF8C00");
              validateInput(e);
            }}
          />
        </div>
        <div>
          <p>Конец дня</p>
          <input
          className={style.inp}
            type="time"
            value={timeEnd}
            onChange={(e) => {
              setTimeEnd(e.target.value);
              setBackgroundColorButtonSave("#D2691E");
              validateInput(e);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MainSetLight;
