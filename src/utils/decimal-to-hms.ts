import type { HMS } from "../types"

export function decimalToHms(hDec: number): HMS {
  const h = Math.floor(hDec)
  const hRem = hDec % 1
  const mDec = hRem * 60
  const m = Math.floor(mDec)
  const mRem = mDec % 1
  const s = mRem * 60

  return {
    h,
    m,
    s,
  }
}
