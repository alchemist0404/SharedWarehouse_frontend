export enum LengthUnit {
  FEET = 'Feet',
  METER = 'Meters'
}

export const lengthUnitTypeKey = val => Object.keys(LengthUnit).filter(k => LengthUnit[k] === val)[0];
