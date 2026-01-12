export const calculateBMI = (weight: number, height: number) => {
  const hM = height / 100;
  const bmi = weight / (hM * hM);
  let interpretation = '';
  if (bmi < 18.5) interpretation = 'Underweight';
  else if (bmi < 25) interpretation = 'Normal weight';
  else if (bmi < 30) interpretation = 'Overweight';
  else interpretation = 'Obese';
  return { value: bmi.toFixed(1), unit: 'kg/m²', interpretation };
};

export const calculateBSA = (weight: number, height: number) => {
  const bsa = Math.sqrt((height * weight) / 3600);
  return { value: bsa.toFixed(2), unit: 'm²' };
};

export const calculateGFR = (age: number, weight: number, creatinine: number, isFemale: boolean) => {
  let gfr = ((140 - age) * weight) / (72 * creatinine);
  if (isFemale) gfr *= 0.85;
  return { value: gfr.toFixed(1), unit: 'mL/min', interpretation: gfr < 60 ? 'Decreased Renal Function' : 'Normal' };
};

export const calculateMAP = (sbp: number, dbp: number) => {
  const map = (sbp + 2 * dbp) / 3;
  return { value: Math.round(map), unit: 'mmHg', interpretation: map < 65 ? 'Possible Hypoperfusion' : 'Adequate' };
};

export const calculateAnionGap = (na: number, cl: number, hco3: number) => {
  const gap = na - (cl + hco3);
  return { value: gap.toFixed(1), unit: 'mEq/L', interpretation: gap > 12 ? 'High Gap Acidosis' : 'Normal Gap' };
};

export const calculateFENa = (naSerum: number, naUrine: number, crSerum: number, crUrine: number) => {
  const fena = ((naUrine * crSerum) / (naSerum * crUrine)) * 100;
  let interpretation = '';
  if (fena < 1) interpretation = 'Prerenal (Volume Depleted)';
  else if (fena > 2) interpretation = 'Intrinsic (ATN)';
  else interpretation = 'Indeterminate';
  return { value: fena.toFixed(2), unit: '%', interpretation };
};

export const calculateCorrectedCalcium = (ca: number, alb: number) => {
  const corrected = ca + 0.8 * (4.0 - alb);
  return { value: corrected.toFixed(1), unit: 'mg/dL' };
};

export const calculateParkland = (weight: number, tbsa: number) => {
  const totalFluid = 4 * weight * tbsa;
  return { value: totalFluid, unit: 'mL', interpretation: `First 8h: ${totalFluid / 2} mL (${(totalFluid / 16).toFixed(0)} mL/h)` };
};

export const calculateMaintFluid = (weight: number) => {
  let rate = 0;
  if (weight <= 10) rate = weight * 4;
  else if (weight <= 20) rate = 40 + (weight - 10) * 2;
  else rate = 60 + (weight - 20) * 1;
  return { value: rate, unit: 'mL/h', interpretation: '4-2-1 Rule' };
};

export const calculateSodiumDeficit = (weight: number, currentNa: number, targetNa: number, isFemale: boolean) => {
  const factor = isFemale ? 0.5 : 0.6;
  const deficit = factor * weight * (targetNa - currentNa);
  return { value: Math.round(deficit), unit: 'mmol' };
};

export const calculateWaterDeficit = (weight: number, currentNa: number, isFemale: boolean) => {
  const factor = isFemale ? 0.5 : 0.6;
  const tbw = weight * factor;
  const deficit = tbw * ((currentNa / 140) - 1);
  return { value: deficit.toFixed(1), unit: 'Liters' };
};

export const calculateCorrectedSodium = (na: number, glucose: number) => {
  const corrected = na + 0.016 * (glucose - 100);
  return { value: corrected.toFixed(1), unit: 'mEq/L' };
};

export const calculateBicarbDeficit = (weight: number, currentHco3: number, targetHco3: number) => {
  const deficit = 0.4 * weight * (targetHco3 - currentHco3);
  return { value: Math.round(deficit), unit: 'mEq' };
};

export const calculateOsmolalGap = (na: number, glucose: number, bun: number, measuredOsm: number) => {
  const calcOsm = (2 * na) + (glucose / 18) + (bun / 2.8);
  const gap = measuredOsm - calcOsm;
  return { value: gap.toFixed(1), unit: 'mOsm/kg', interpretation: gap > 10 ? 'Significant Gap' : 'Normal' };
};

export const calculateIVRate = (volume: number, timeHours: number, dropFactor: number = 20) => {
  const rateMlHr = volume / timeHours;
  const rateGttMin = (volume * dropFactor) / (timeHours * 60);
  return { value: Math.round(rateMlHr), unit: 'mL/h', interpretation: `${Math.round(rateGttMin)} gtt/min (at ${dropFactor} gtt/mL)` };
};

export const calculateEDD = (lmpDate: string) => {
  const lmp = new Date(lmpDate);
  const edd = new Date(lmp);
  edd.setDate(lmp.getDate() + 7);
  edd.setMonth(lmp.getMonth() - 3);
  edd.setFullYear(lmp.getFullYear() + 1);
  return { value: edd.toLocaleDateString(), unit: 'Date' };
};

export const calculateLDL = (tc: number, hdl: number, tg: number) => {
  const ldl = tc - hdl - (tg / 5);
  return { value: Math.round(ldl), unit: 'mg/dL' };
};

export const calculateMELD = (cr: number, bili: number, inr: number) => {
  const meld = 3.78 * Math.log(bili) + 11.2 * Math.log(inr) + 9.57 * Math.log(cr) + 6.43;
  return { value: Math.round(meld), unit: 'Score' };
};

export const calculatePoints = (items: any) => {
  const total = Object.values(items).reduce((acc: number, val: any) => acc + (typeof val === 'number' ? val : 0), 0);
  return { value: total, unit: 'Points' };
};