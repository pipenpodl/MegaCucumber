import React from "react";
import style from "./SettingsForm.module.css";
import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import {
  getDataFromserver,
  sendDataToServer,
} from "../../utils/functionsTreatmentData";
import WateringsTable from "../WateringsTable/WateringsTable";
import MainSetLight from "../MainSetLight/MainSetlight";
import ControlButton from "../ControlButton/ControlButton";
const SettingsForm = () => {
  const [timeStart, setTimeStart] = useState("06:00");
  const [visible, setVisible] = useState(false);
  const [timeEnd, setTimeEnd] = useState("20:00");
  const [valid, setValid] = useState("");
  const [blockSave, setBlockSave] = useState(false);
  const [backgroundColorButtonSave, setBackgroundColorButtonSave] =
    useState("");

  const [numberOfWatering, setNumberOfWatering] = useState(0);
  
  const [totalCountWaterings, setTotalCountWaterings] = useState([]);

  useEffect(() => {
        getDataFromserver("/settings").then((res) => {
        const data = res.data;
        console.log(data)
        setTimeStart(data["start"] || "06:00");
        setTimeEnd(data["end"] || "20:00");
        setTotalCountWaterings(data["waterings"] || []);
      });
      
  }, []);

  const addNewWatering = (watering) => {
    setBackgroundColorButtonSave("#D2691E");
    setTotalCountWaterings([...totalCountWaterings, watering]);
  };

  const deleteWatering = (id) => {
    setBackgroundColorButtonSave("#D2691E");
    if (numberOfWatering !== 0) {
      setNumberOfWatering(numberOfWatering - 1);
    } else {
      setNumberOfWatering(0);
    }
    setTotalCountWaterings(
      totalCountWaterings.filter((watering) => watering.id !== id)
    );
  };

  const validateInput = (e) => {
    if (e.target.value === "") {
      setBlockSave(true);
      setValid("Поля не могу быть пустыми");
    } else {
      setBlockSave(false);
      setValid("");
    }
  };
  return (
    <div className={style.Main_one}>
      <Modal
        visible={visible}
        setVisible={setVisible}
        addNewWatering={addNewWatering}
      ></Modal>
      <div className={style.Main_light_button}>
        <MainSetLight
          timeStart={timeStart}
          timeEnd={timeEnd}
          setTimeStart={setTimeStart}
          setTimeEnd={setTimeEnd}
          setBackgroundColorButtonSave={setBackgroundColorButtonSave}
          validateInput={validateInput}
          valid={valid}
        ></MainSetLight>
        <ControlButton></ControlButton>
      </div>
      <div className={style.Main_water}>
        <h1>Поливы</h1>
          <WateringsTable
            totalCountWaterings={totalCountWaterings}
            deleteWatering={deleteWatering}
          ></WateringsTable>
        <div className={style.block_add}>
          <button className={style.but} type="button" onClick={() => setVisible(true)}>
            Добавить
          </button>
            <button
              className={style.but}
              type="button"
              disabled={blockSave}
              onClick={() => {
                setBackgroundColorButtonSave("");
                sendDataToServer(
                  {"settings": {"start": timeStart, "end": timeEnd, "waterings": totalCountWaterings}}
                  ,
                  "/settings"
                );
              }}
              style={{ backgroundColor: backgroundColorButtonSave }}
            >
              Сохранить
            </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsForm;
