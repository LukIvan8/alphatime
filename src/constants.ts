import { classesI } from "./types";

export const weekdays = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

export const emptyClass: classesI = {
  subject: "",
  timeStart: "",
  timeEnd: "",
  split: false,
  type: "",
  variable: 0,
  auditory1: "",
  teacher1: "",
  auditory2: "",
  teacher2: "",
};

export const numToHuman = {
  1: "пара",
  2: "пары",
  3: "пары",
  4: "пары",
};
