import {CircleButtonType} from '../types/data.type';

// Перемешать буквы на кнопках
export function shuffleLetters(arr: CircleButtonType[]): CircleButtonType[] {
  // Извлекаем буквы из объектов в массив
  const letters = arr.map(obj => obj.button);
  // Перемешиваем буквы
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }

  // Заменяем буквы в исходном массиве на перетасованные
  return arr.map((obj, index) => ({...obj, button: letters[index]}));
}
