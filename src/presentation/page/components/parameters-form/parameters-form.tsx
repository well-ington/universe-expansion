import React from "react";
import styles from "./parameters-form.scss";
import Button from "../button/button";

const ParametersForm: React.FC<{
  setState: (value: number, key: string) => void;
  state;
  submit: () => void;
  reset: () => void;
}> = ({ setState, state, submit, reset }) => {
  const [hide, setHide] = React.useState(false);

  const densityParameters = [
    { name: "Radiation density", namePTBR: "radioativa", label: "unidade relativa",  step: 0.001 },
    { name: "Matter density", namePTBR: "de matéria", label: "unidade relativa",  step: 0.01 },
    { name: "Dark energy density", namePTBR: "de energia escura", label: "unidade relativa",  step: 0.01 },
    { name: "Metric density", namePTBR: "métrica", label: "unidade relativa",  step: 0.001 },
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
                <p style={{
                  fontSize: "1.2rem",
                  color: "#000000bb"
                }}>{isLastItem ? <span>⏳</span> : 'Densidade'}</p>
                <p className={styles.numberName}>{profile.namePTBR}</p>
                <p className={styles.numberLabel}>
                    {profile.label}
                </p>
              </div>
            );
          })}          
          </div>
          <div className={styles.buttonContainer}>              
              <Button type="blue" action={submit}>Calcular</Button>
              <Button type="orange" action={reset}>Reiniciar</Button>
          </div>
        </div>

        <div className={`${hide ? styles.showFormPanel : styles.hideFormPanel}`}>
          <Button className={`${hide ? styles.showButton : styles.hideButton}`} action={() => setHide(!hide)}>
            {hide ? "^" : "X"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParametersForm;
