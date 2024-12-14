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
