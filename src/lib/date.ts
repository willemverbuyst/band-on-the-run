export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function getYearsForSelect() {
  const years = [];
  const currentYear = new Date().getFullYear();

  for (let i = 1950; i <= currentYear; i++) {
    years.push(i);
  }

  return years;
}

export function getRandomYear() {
  const currentYear = new Date().getFullYear();
  return Math.floor(Math.random() * (currentYear - 1950 + 1)) + 1950;
}
