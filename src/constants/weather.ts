import { Weather } from "../types";

export const WEATHER_COVERAGE: Partial<Record<Exclude<Weather["coverage"], null>, string>> = {
  "areas": "areas of",
  "chance": "chance of",
  "definite": "",
  "periods": "periodic",
  "few": "a few",
  "slight_chance": "slight chance of",
}

export const WEATHER_INTENSITY: Partial<Record<Exclude<Weather["intensity"], null>, string>> = {
  "very_light": "",
  "heavy": "heavy",
  "light": "",
  "moderate": "",
}
