import { HassEntity } from 'home-assistant-js-websocket';

import { HeaterMode, heaterModes } from './types';

import { pipe } from 'fp-ts/lib/pipeable';
import * as O from 'fp-ts/lib/Option';
import * as A from 'fp-ts/lib/Array';

type brightnessMatcher = (brightness: number) => boolean;

const heaterModeMatcher: { [key in HeaterMode]: brightnessMatcher } = {
  [HeaterMode.OFF]: b => b <= 25,
  [HeaterMode.ANTI_FREEZE]: b => b >= 26 && b <= 51,
  [HeaterMode.ECO]: b => b >= 52 && b <= 76,
  [HeaterMode.COMFORT2]: b => b >= 77 && b <= 102,
  [HeaterMode.COMFORT1]: b => b >= 103 && b <= 127,
  [HeaterMode.COMFORT]: b => b >= 128,
};

export const getHeaterBrightness = (entity: HassEntity): number => {
  return pipe(
    O.fromNullable(entity.attributes.brightness),
    O.getOrElse(() => 0),
  );
};

export const getHeaterMode = (entity: HassEntity): HeaterMode => {
  const brightness = getHeaterBrightness(entity);

  return pipe(
    heaterModes,
    A.findFirst(mode => heaterModeMatcher[mode](brightness)),
    O.getOrElse<HeaterMode>(() => HeaterMode.OFF),
  );
};
