import { useQuery } from "@tanstack/react-query"
import { geolocate } from "../utils"
import { locationQueryKey } from "../constants"
import type { Point } from "../types"
import { DEFAULT_COORDINATES } from "../constants"

async function getLocation(): Promise<Point> {
  if (!navigator.geolocation) {
    console.warn('Cannot geolocate')
  }

  try {
    const location = await geolocate()

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }
  } catch (err) {
    console.warn(err)
  }

  return DEFAULT_COORDINATES
}

export function useLocation() {
  return useQuery({
    queryKey: locationQueryKey,
    queryFn: getLocation,
    initialData: DEFAULT_COORDINATES,
  })
}
