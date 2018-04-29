import { byConfig, inRange } from '../utils/random';

const types = ['ball', 'wall', 'player'];

const filterByBitmap = (array, bitMap) => 
  array.filter((elem, i) => +bitMap[i]);

const getRandomBitmap = max => 
  inRange(0, 2 ** max)
    .toString(2)
    .padStart(max, 0)

const randomFilter = array => 
  filterByBitmap(array, getRandomBitmap(array.length));

const exclude = (array, excludes) => 
  array.filter(element => 
    !excludes.includes(element));

const excludeRandomOne = array => {
  const copy = array.concat();
  copy.splice(inRange(0, array.length), 1);
  return copy;
}

const defaultTypeSelect = () => 
  randomFilter(excludeRandomOne(types))

export default [
  { // Замена интервала тикера на время действия. После возврат назад
    value: "freeze",
    arguments: [
      // Кто может активировать
      () => randomFilter(exclude(types, ['wall'])),
      // Основное значение
      () => 0,
      // Время действия(секунды)
      () => inRange(1, 6)
    ]
  },
  {
    value: "health",
    arguments: [
      defaultTypeSelect,
      () => byConfig([
        [1, .50],
        [2, .35],
        [3, .15]
      ])
    ]
  },
  {
    value: "power",
    arguments: [
      defaultTypeSelect,
      () => inRange(0, 2) || -1
    ]
  },
  {
    value: "speed",
    arguments: [
      () => randomFilter(exclude(types, ['wall'])),
      () => inRange(0, 2) || -1
    ]
  },
  {
    value: "storm",
    arguments: [
      defaultTypeSelect,
      () => 0,
      () => inRange(5, 10)
    ]
  },
  {
    value: "vertigo",
    arguments: [
      defaultTypeSelect,
      () => 0,
      () => inRange(5, 10)
    ]
  }
] 
// Потом если нужно добавить вероятности