import React, { useState, useEffect } from "react";
import style from "./ControlButton.module.css";
import {
  getDataFromserver,
  sendDataToServer,
} from "../../utils/functionsTreatmentData";

let isManual = true

const ControlButton = () => {
  const [connectionError, setConnectionError] = useState("");
  const [manual, setManual] = useState(true)
  const [lightState, setLightState] = useState(false)
  const [pumpState, setPumpState] = useState(false)

  const send_json = (states) => {
    sendDataToServer(states, "/states");
  };

  useEffect(() => {
    setInterval(async () => {
      await getDataFromserver("/states")
        .then((res) => {
          if(isManual){
            console.log('now Manual is true')
            setLightState(res.data.lamps_state)
            setPumpState(res.data.pump_state)
          }
          

        })

        .catch((err) =>
          setConnectionError(`${err.code} на странице с кнопками управления`)
        );
    }, 1000);
  },[]);
  return (
    <div className={style.Main_button}>
      <div className={style.color_button}>
          <p>Управление</p>
      </div>
      {connectionError == "" ? (
        <div className={style.err_div}>
          <p className={style.err}>{connectionError}</p>
        </div>
      ) : (
        <div className={style.button_center}>
            <div className={style.ios_div}>
              <div>
                <p>Свет</p>
              </div>
              <div>
                <label className={style.checkbox_ios}>
                  <input
                    type="checkbox"
                    className={style.checkbox_ios}
                    checked={lightState}
                    onChange={(e) => {
                      setManual(false)
                      isManual = false
                      setLightState(e.target.checked)
                      send_json({
                        lamps_state: e.target.checked,
                        pump_state: pumpState,
                        manual: false,
                      });
                    }}
                  />
                  <span className={style.checkbox_ios_switch}></span>
                </label>
              </div>
            </div>
              
            <div className={style.ios_div}> 
              <div>
                <p>Насос</p>
              </div>
              <div>
                <label className={style.checkbox_ios}>
                  <input
                    type="checkbox"
                    className={style.checkbox_ios}
                    checked={pumpState}
                    onChange={(e) => {
                      setManual(false)
                      isManual = false
                      setPumpState(e.target.checked)
                      send_json({
                        lamps_state: lightState,
                        pump_state: e.target.checked,
                        manual: false,
                      });
                    }}
                  />
                  <span className={style.checkbox_ios_switch}></span>
                </label>
              </div>
             </div> 
          </div>
      )}
      <div className={style.return_button}>
        <button
              className={style.button_con}
              type="button"
              onClick={() => {
                setManual(true)
                isManual = true
                send_json({
                  lamps_state: lightState,
                  pump_state: pumpState,
                  manual: true,
                })
              }}
              hidden={manual}
            >
              Вернуть
          </button>
      </div>
    </div>
  );
};

export default ControlButton;
