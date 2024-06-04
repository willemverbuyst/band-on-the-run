import { ShowType } from "@prisma/client";

export const showTypes = [
  ShowType.CLUB,
  ShowType.FESTIVAL,
  ShowType.RADIO,
  ShowType.TV,
] as const;
