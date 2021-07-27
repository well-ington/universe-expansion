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
    {
      name: "Radiation density",
      namePTBR: "radioativa",
      label: "unidade relativa",
      step: 0.001,
    },
    {
      name: "Matter density",
      namePTBR: "de matéria",
      label: "unidade relativa",
      step: 0.01,
    },
    {
      name: "Dark energy density",
      namePTBR: "de energia escura",
      label: "unidade relativa",
      step: 0.01,
    },
    {
      name: "Metric density",
      namePTBR: "métrica",
      label: "unidade relativa",
      step: 0.001,
    },
    {
      name: "Final time",
      namePTBR: "Tempo final",
      label: "em bilhões de anos",
      step: 0.25,
      max: 13.5,
    },
  ];

  const floorDecimalNumbers = (num: number) => {
    return num
  }

  return (
    <div>
      <div className={`${styles.container} ${hide ? '' : styles.blackContainer}`}>
        <div
          className={`${hide ? styles.hide : styles.show} ${styles.hideable}`}
        >
          <div className={styles.inputForm}>
            {densityParameters.map((profile, index) => {
              const density = profile.name;
              const getObjectName = (str: string) =>
                str
                  .replace(/ (.){1}/gm, (_, group) => group.toUpperCase())
                  .replace(/^(.)/, (_, group) => group.toLowerCase());

              const itemKey = getObjectName(density);
              const isLastItem = index === densityParameters.length - 1;
              return (
                <div
                  className={`${styles.numberContainer} ${
                    isLastItem ? styles.finalTimeContainer : ""
                  }`}
                >
                  <input
                    className={styles.numberInput}
                    type="number"
                    step={profile.step}
                    value={Number(`${Math.floor((state[itemKey] * 1000000000) + 0.1)/1000000000}`)}
                    onChange={(event: any) => {
                      if (profile.max) {
                        if (profile.max < event.target.value) {
                          setState(profile.max, itemKey);
                          return;
                        }
                      }
                      if (event.target.value > 0) {
                        const metricDensityKey = getObjectName(densityParameters[3].name)
                        const radiationDensityKey = getObjectName(densityParameters[0].name)
                        const matterDensityKey = getObjectName(densityParameters[1].name)
                        const darkEnergyDensityKey = getObjectName(densityParameters[2].name)

                        const oldMetricDensity = state[metricDensityKey]

                        const oldRadiationDensity = state[radiationDensityKey]
                        const oldMatterDensity = state[matterDensityKey]
                        const oldDarkEnergyDensity = state[darkEnergyDensityKey]

                        const relativeRadiationDensity = oldRadiationDensity / oldMetricDensity
                        const relativeMatterDensity = oldMatterDensity / oldMetricDensity
                        const relativeDarkEnergyDensity = oldDarkEnergyDensity / oldMetricDensity

                        switch (itemKey) {
                          case metricDensityKey:
                            const maxMetricDensity = Math.min(event.target.value, 3)
                            setState(floorDecimalNumbers(relativeRadiationDensity * maxMetricDensity), radiationDensityKey)
                            setState(floorDecimalNumbers(relativeMatterDensity * maxMetricDensity), matterDensityKey)
                            setState(floorDecimalNumbers(relativeDarkEnergyDensity * maxMetricDensity), darkEnergyDensityKey)
                            setState(floorDecimalNumbers(Number(maxMetricDensity)), itemKey)
                          return

                          case radiationDensityKey:

                            const deltaRadiation = event.target.value - oldRadiationDensity

                            const darkEnergyMatterProportion = oldDarkEnergyDensity / (oldMatterDensity + oldDarkEnergyDensity)
                            const matterProportion = 1 - darkEnergyMatterProportion

                            const newMatterDensity = oldMatterDensity - (matterProportion * deltaRadiation)
                            const newDarkEnergyDensity = oldDarkEnergyDensity - (darkEnergyMatterProportion * deltaRadiation)

                            if(newMatterDensity < 0 || newDarkEnergyDensity < 0) return 

                            setState(newMatterDensity, matterDensityKey)
                            setState(newDarkEnergyDensity, darkEnergyDensityKey)

                            setState(Number(event.target.value), itemKey)
                          return

                          case matterDensityKey:
                            const deltaMatter = event.target.value - oldMatterDensity

                            const darkEnergyRadiationProportion = oldDarkEnergyDensity / (oldRadiationDensity + oldDarkEnergyDensity)
                            const radiationProportion = 1 - darkEnergyRadiationProportion

                            const newRadiationDensity = oldRadiationDensity - (radiationProportion * deltaMatter)
                            const newDarkEnergyMatterDensity = oldDarkEnergyDensity - (darkEnergyRadiationProportion * deltaMatter)

                            if(newRadiationDensity < 0 || newDarkEnergyMatterDensity < 0) return

                            setState(newRadiationDensity, radiationDensityKey)
                            setState(newDarkEnergyMatterDensity, darkEnergyDensityKey)

                            setState(Number(event.target.value), itemKey)
                          return

                          case darkEnergyDensityKey:
                            const deltaDarkEnergy = event.target.value - oldDarkEnergyDensity

                            const matterRadiationProportion = oldMatterDensity / (oldRadiationDensity + oldMatterDensity)

                            const radiationDarkEnergyPropotion = 1 - matterRadiationProportion

                            const newRadDensity = oldRadiationDensity - (radiationDarkEnergyPropotion * deltaDarkEnergy)
                            const newMatDensity = oldMatterDensity - (matterRadiationProportion * deltaDarkEnergy)

                            if(newRadDensity < 0 || newMatDensity < 0) {
                              return
                            }

                            setState(newRadDensity, radiationDensityKey)
                            setState(newMatDensity, matterDensityKey)

                            setState(Number(event.target.value), itemKey)



                            setState(Number(event.target.value), itemKey)
                          return
                          default:
                            setState(Number(event.target.value), itemKey)
                            return;
                        }
                      }
                    }}
                  />
                  <p
                    style={{
                      fontSize: "1.2rem",
                      color: "#000000bb",
                    }}
                  >
                    {isLastItem ? <span>⏳</span> : "Densidade"}
                  </p>
                  <p className={styles.numberName}>{profile.namePTBR}</p>
                  <p className={styles.numberLabel}>{profile.label}</p>
                </div>
              );
            })}
          </div>
          <div className={styles.buttonContainer}>
            <Button type="blue" action={submit}>
              Calcular
            </Button>
            <Button type="orange" action={reset}>
              Reiniciar
            </Button>
          </div>
        </div>

        <div
          className={`${hide ? styles.showFormPanel : styles.hideFormPanel}`}
        >
          <Button
            className={`${hide ? styles.showButton : styles.hideButton}`}
            action={() => setHide(!hide)}
          >
            {hide ? "^" : "X"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParametersForm;
