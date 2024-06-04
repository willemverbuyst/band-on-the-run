import { ShowType } from "@prisma/client";

export const showTypes = [
  ShowType.CLUB,
  ShowType.FESTIVAL,
  ShowType.RADIO,
  ShowType.TV,
] as const;

export function getRandomShowType(): ShowType {
  return showTypes[Math.floor(Math.random() * showTypes.length)]!;
}
