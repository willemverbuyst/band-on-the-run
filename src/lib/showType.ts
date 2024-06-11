import { ShowType } from "@prisma/client";

export const showTypes = [
  ShowType.CLUB,
  ShowType.FESTIVAL,
  ShowType.RADIO,
  ShowType.TV,
] as const;

export function getRandomShowType() {
  const randomNumber = Math.random();

  switch (true) {
    case randomNumber < 0.5:
      return ShowType.CLUB;
    case randomNumber < 0.9:
      return ShowType.FESTIVAL;
    case randomNumber < 0.95:
      return ShowType.RADIO;
    default:
      return ShowType.TV;
  }
}
