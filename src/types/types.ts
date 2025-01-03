import { components } from "./schema";

export type Point = {
  latitude: number;
  longitude: number;
}

export type Gridpoint = components["schemas"]["Gridpoint"] & {
  temperature?: components["schemas"]["GridpointQuantitativeValueLayer"];
}

type GridpointWeather = components["schemas"]["Gridpoint"]["weather"];

export type Weather = {
  type: Exclude<GridpointWeather, undefined>["values"][0]["value"][0]["weather"];
  coverage: Exclude<GridpointWeather, undefined>["values"][0]["value"][0]["coverage"];
  intensity: Exclude<GridpointWeather, undefined>["values"][0]["value"][0]["intensity"];
}

export type TemperatureUnit = 'c' | 'f' | null

export type Temperature = {
  unit: TemperatureUnit;
  value: number | null;
}

export type ProcessedGridpointData = {
  temperature: Temperature;
  weather: Weather;
}

export type Star = {
  id: string;
  tyc: string;
  gaia: string;
  hyg: string;
  hip: string;
  hd: string;
  hr: string;
  gl: string;
  bayer: string;
  flam: string;
  con: string;
  proper: string;
  ra: string;
  dec: string;
  pos_src: string;
  dist: string;
  x0: string;
  y0: string;
  z0: string;
  dist_src: string;
  mag: string;
  absmag: string;
  ci: string;
  mag_src: string;
  rv: string;
  rv_src: string;
  pm_ra: string;
  pm_dec: string;
  pm_src: string;
  vx: string;
  vy: string;
  vz: string;
  spect: string;
  spect_src: string;
}

export type HMS = {
  h: number;
  m: number;
  s: number;
}

export type AltAz = {
  altitude: number;
  azimuth: number;
}

export type Constellation = {
  type: 'constellation' | 'asterism';
  id: string;
  label: string;
  lines: Star[][];
}
