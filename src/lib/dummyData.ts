import { faker } from "@faker-js/faker";
import { capitalizeEachWord } from "./string";

export function getBandName() {
  const animal = faker.animal.type();
  const color = faker.color.human();

  if (Math.random() > 0.5) {
    return capitalizeEachWord(animal);
  }

  return capitalizeEachWord(`${color} ${animal}`);
}

export function getShowName() {
  const fuel = faker.vehicle.fuel();
  const productMaterial = faker.commerce.productMaterial();

  if (Math.random() > 0.5) {
    return capitalizeEachWord(productMaterial);
  }

  return capitalizeEachWord(`${fuel} ${productMaterial}`);
}
