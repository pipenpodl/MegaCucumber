import React, { useState } from "react";
import style from "./Modal.module.css";

const Modal = ({ visible, addNewWatering, setVisible }) => {
  const [start, setStart] = useState("");
  const [validTitle, setValidTitle] = useState("");
  const [validLitres, setValidLitres] = useState("");
  const [numberOfLitres, setNumberOfLitres] = useState(0);

  const closeModal = () => {
    setVisible(false);
    setValidTitle("");
  };

  let classes = [style.myModal];

  if (visible) {
    classes.push(style.active);
  }
  const buttonAddWatering = () => {
    if (start === "" || numberOfLitres === "") {
      setValidTitle("Поля не могу быть пустыми!");
    } else {
      if (numberOfLitres <= 0) {
        setValidLitres("Кол-во должно быть больше 0!");
      } else {
        setValidLitres("");
        setValidTitle("");
        addNewWatering({
          id: Math.random() * 100000,
          start: start,
          litres: numberOfLitres,
        });
        setStart("");
        setNumberOfLitres("");
        setVisible(false);
      }
    }
  };

  return (
    <div className={classes.join(" ")} onClick={() => closeModal()}>
      <div className={style.content} onClick={(e) => e.stopPropagation()}>
        <div className={style.er}>
          <div>
            <span>{validTitle}</span>
          </div>
          <div>
            <span>{validLitres}</span>
          </div>
        </div>
        <div>
          <div>
            <span>Начало полива</span>
          </div>

          <input
            type="time"
            className={style.start}
            value={start}
            onChange={(event) => setStart(event.target.value)}
          />
        </div>
        <div>
          <div>
            <span>Количество литров на полив</span>
          </div>

          <input
            type="number"
            value={numberOfLitres}
            onChange={(e) => {
              setNumberOfLitres(e.target.value);
            }}
          />
        </div>
        <div className={style.div_button_add}>
          <button className={style.add_but} onClick={() => buttonAddWatering()}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
