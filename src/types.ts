import * as t from 'io-ts';

export enum HeaterMode {
  OFF = 0,
  ANTI_FREEZE = 38,
  ECO = 63,
  COMFORT2 = 89,
  COMFORT1 = 114,
  COMFORT = 252,
}

export const heaterModes: Array<HeaterMode> = [
  HeaterMode.OFF,
  HeaterMode.ANTI_FREEZE,
  HeaterMode.ECO,
  HeaterMode.COMFORT2,
  HeaterMode.COMFORT1,
  HeaterMode.COMFORT,
];

export const heaterModeLabels: { [key in HeaterMode]: string } = {
  [HeaterMode.OFF]: 'Off',
  [HeaterMode.ANTI_FREEZE]: 'Hors Gel',
  [HeaterMode.ECO]: 'Eco',
  [HeaterMode.COMFORT2]: 'Confort -2',
  [HeaterMode.COMFORT1]: 'Confort -1',
  [HeaterMode.COMFORT]: 'Confort',
};

export interface QubinoFlushWirePilotConfig {
  type: string;
  entity: string;
}

export const QubinoFlushWirePilotConfigType = t.type({
  type: t.string,
  entity: t.string,
});
