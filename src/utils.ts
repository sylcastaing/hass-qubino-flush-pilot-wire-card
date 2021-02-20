import { HassEntity } from 'home-assistant-js-websocket';

import { HeaterMode, heaterModes, QubinoFlushWirePilotConfig } from './types';

export function validateConfig(config: QubinoFlushWirePilotConfig): QubinoFlushWirePilotConfig {
  if (!config || !config.entity) {
    throw new Error('Invalid configuration');
  }

  return config;
}

type BrightnessMatcher = (brightness: number) => boolean;

const heaterModeMatcher: Record<HeaterMode, BrightnessMatcher> = {
  [HeaterMode.OFF]: b => b <= 25,
  [HeaterMode.ANTI_FREEZE]: b => b >= 26 && b <= 51,
  [HeaterMode.ECO]: b => b >= 52 && b <= 76,
  [HeaterMode.COMFORT2]: b => b >= 77 && b <= 102,
  [HeaterMode.COMFORT1]: b => b >= 103 && b <= 127,
  [HeaterMode.COMFORT]: b => b >= 128,
};

export function getHeaterBrightness(entity: HassEntity): number {
  return entity.attributes.brightness ?? 0;
}

export function getHeaterMode(entity: HassEntity): HeaterMode {
  const brightness = getHeaterBrightness(entity);

  return heaterModes.find(mode => heaterModeMatcher[mode](brightness)) ?? HeaterMode.OFF;
}

export function isHeaterOn(entity: HassEntity): boolean {
  return getHeaterMode(entity) !== HeaterMode.OFF;
}
