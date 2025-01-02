import * as dragon from 'dragon-astronomy'
import type { Point } from '../types';
import { DEFAULT_COORDINATES } from '../constants';

export function getLmst(localPosition: Point = DEFAULT_COORDINATES) {
  const date = new Date()

  return dragon.getLocalMeanSiderealTime(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    localPosition.longitude,
  )
}
