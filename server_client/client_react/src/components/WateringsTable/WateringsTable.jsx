import React from "react";
import style from "./WateringsTable.module.css";


const WateringsTable = ({ totalCountWaterings, deleteWatering }) => {
  return (
    <div className={style.table}>
      <div className={style.title}>
        <div>Номер</div>
        <div>Начало</div>
        <div>Кол-во литров</div>
        <div>Удалить</div>
  
      </div>
      {totalCountWaterings.length === 0 ? (
        <p align="center">Поливы отсутствуют </p>
      ) : (
        <div>
          {totalCountWaterings.map((watering) => (
            <div key={watering.id} className={style.watering_item}>
              <div className={style.titles_item}>
                <div>№{totalCountWaterings.indexOf(watering) + 1}</div>
                <div>{watering.start}</div>
                <div className={style.end}>
                  {watering.litres}
                </div>
                <div
                    className={style.button_drop}
                    onClick={() => deleteWatering(watering.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path
                        fillRule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WateringsTable;
