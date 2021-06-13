import React from "react";
import styles from "./parameters-form.scss";
import Button from "../button/button";

const ParametersForm: React.FC<{
  setState: (value: number, key: string) => void;
  state;
  submit: () => void;
}> = ({ setState, state, submit }) => {
  const [hide, setHide] = React.useState(false);

  const densityParameters = [
    { name: "Radiation density", namePTBR: "Radioativa", label: "relativa",  step: 0.001 },
    { name: "Matter density", namePTBR: "Matéria", label: "relativa",  step: 0.01 },
    { name: "Dark energy density", namePTBR: "Energia escura", label: "relativa",  step: 0.01 },
    { name: "Metric density", namePTBR: "Métrica", label: "relativa",  step: 0.001 },
    { name: "Final time", namePTBR: "Tempo final", label: "em bilhões de anos",  step: 0.25 },
  ];
  return (
    <div>
      <div className={`${styles.container}`}>
        <div
          className={`${hide ? styles.hide : styles.show} ${styles.hideable}`}
        >
          <div className={styles.inputForm}>
          { densityParameters.map((profile, index) => {
            const density = profile.name;
            const itemKey = density
              .replace(/ (.){1}/gm, (_, group) => group.toUpperCase())
              .replace(/^(.)/, (_, group) => group.toLowerCase());
            const isLastItem = index === (densityParameters.length - 1);
            return (<div className={`${styles.numberContainer} ${isLastItem ? styles.finalTimeContainer : ""}`} >                
                <input
                  className={styles.numberInput}
                  type="number"
                  step={profile.step}
                  value={state[itemKey]}
                  onChange={(event: any) => {
                      if (event.target.value > 0) {
                        setState(Number(event.target.value), itemKey)
                      }
                  }
                  }
                />
                <p className={styles.numberName}>{profile.namePTBR}</p>
                <p className={styles.numberLabel}>
                    {profile.label}
                </p>
              </div>
            );
          })}          
          </div>
          <div className={styles.buttonContainer}>
              
              <Button action={submit}>Calcular</Button>
              </div>
        </div>

        <div className={`${hide ? "" : ""}`}>
          <Button action={() => setHide(!hide)}>
            {hide ? "show" : "hide"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParametersForm;
