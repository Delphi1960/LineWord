// import {WordsList} from '../assets/data/words';
// import {WordsList} from '../assets/data/russian_nouns';
import {WordsList} from '../assets/data/cleaned_nouns_ru';

import {EMPTYCELL, GRIDSIZE} from '../types/constants';
import {GridType} from '../types/data.type';
import {LinewordTools} from './LinewordTools';
import {attemptToPlaceWordOnGrid} from './generateGridTools';
import {storage} from './storage';

interface CrosswordDensity {
  maxWords: number;
  words: string[];
  density: number;
  gridVariant: GridType;
}

export function generateGrid() {
  const chapter = storage.getString('@chapter');
  // число кнопок
  const NUMBER_BUTTON = Number(chapter) + 3;

  //Берем слова состоящие только из letters букв кнопок
  function getWordsForLetters(
    letters: string[],
    arrayWords: string[],
  ): string[] {
    const filteredWords = arrayWords.filter(word => {
      // Проверяем, все ли буквы в слове содержатся в массиве letters
      return (
        [...word].every(letter => letters.includes(letter)) &&
        word.length <= NUMBER_BUTTON
      );
    });

    // частота букв в главном слове
    // ОГОНЬ  {"Г": 1, "Н": 1, "О": 2, "Ь": 1}
    const mainWordFrequency: {[key: string]: number} = {};
    // Определение частоты встречаемости букв в mainWord
    for (const char of letters) {
      if (mainWordFrequency[char]) {
        mainWordFrequency[char]++;
      } else {
        mainWordFrequency[char] = 1;
      }
    }

    // Функция для проверки, является ли слово допустимым
    function isValidWord(word: string): boolean {
      const wordFrequency: {[key: string]: number} = {};

      // Определение частоты встречаемости букв в текущем слове
      for (const char of word) {
        if (wordFrequency[char]) {
          wordFrequency[char]++;
        } else {
          wordFrequency[char] = 1;
        }
      }
      // Проверка, что частота букв в текущем слове соответствует mainWord
      for (const char in mainWordFrequency) {
        // если в текущем слове число букв char больше, чем в главном слове
        if (wordFrequency[char] > mainWordFrequency[char]) {
          return false;
        }
      }
      return true;
    }

    const validFilteredWords = filteredWords.filter(word => isValidWord(word));
    return validFilteredWords;
  }

  // Выбор случайного слова с указанным количеством букв
  function getRandomWordWithUniqueLetters(arrayWords: string[]): string {
    const filteredWords = arrayWords.filter(
      word => word.length === NUMBER_BUTTON,
    );
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    return filteredWords[randomIndex];
  }

  // =========================================================================================
  const grid = Array(GRIDSIZE)
    .fill(0)
    .map(() => Array(GRIDSIZE).fill('#'));

  // const grid = [
  //   ['#', '#', '#', '#', '#', '#', '#', '#'],
  //   ['#', '#', '#', '#', '#', '#', '#', '#'],
  //   ['#', '#', '#', '#', '#', '#', '#', '#'],
  //   ['#', '#', '#', '#', '#', '#', '#', '#'],
  //   ['#', '#', '#', '#', '#', '#', '#', '#'],
  //   ['#', '#', '#', '#', '#', '#', '#', '#'],
  //   ['#', '#', '#', '#', '#', '#', '#', '#'],
  //   ['#', '#', '#', '#', '#', '#', '#', '#'],
  // ];

  // Удаление повторов и перевод в верхний регистр
  const newWords: string[] = WordsList.map(item => item.word);
  const words = [...new Set(newWords.map(word => word.toUpperCase()))];
  console.log(words.length);

  let randomWord: string = '';
  let workWords: string[] = [];
  let letterButtons: string[] = [];

  while (workWords.length === 0) {
    randomWord = getRandomWordWithUniqueLetters(words);
    letterButtons = randomWord.split('');
    // удалим центральное слово, чтобы не повторялось
    const filteredWords = words.filter(word => word !== randomWord);
    workWords = getWordsForLetters(letterButtons, filteredWords);
    // Сортируем слова по убыванию длины
    workWords = workWords.sort((a, b) => b.length - a.length);
    console.log(workWords);
  }

  // Размещаем слово посередине по горизонтали и вертикали
  let startIndex = GRIDSIZE / 2 - Math.floor(randomWord.length / 2);

  for (let i = 0; i < randomWord.length; i++) {
    grid[GRIDSIZE / 2 - 1][startIndex + i] = randomWord[i];
  }

  let placedWords: string[] = [];
  const grids: CrosswordDensity[] = [];

  for (let i = 0; i < 10; i++) {
    const newGrid = grid.map(innerArray => innerArray.slice());
    // Копируем и перемешиваем массив workWords
    placedWords = LinewordTools.shuffleArray(workWords.slice());
    // console.log(placedWords);

    let wordCount: number = 0; //число слов вошедших в сетку
    let wordUsed: string[] = []; //слова использованные в кроссворде
    while (placedWords.length > 0) {
      let word: string | undefined = placedWords.pop(); // извлекаем и удаляем последнее слово из списка
      if (word) {
        if (attemptToPlaceWordOnGrid(newGrid, word)) {
          wordCount++;
          wordUsed.push(word);
        }
      }
    }
    // Формируем массив сеток
    grids.push({
      maxWords: wordCount, //число слов в сетке
      words: wordUsed,
      density: LinewordTools.calculateDensity(newGrid), // плотность сетки
      gridVariant: newGrid.map(innerArray => innerArray.slice()), // сама сетка
    });
  }
  // -----------------------------------------------------------------------------
  // Находим элемент массива с максимальными значениями maxWords и density
  const maxDensityElement: CrosswordDensity = grids.reduce((max, current) => {
    // Сравниваем текущий элемент с максимальным
    if (
      current.maxWords > max.maxWords ||
      (current.maxWords === max.maxWords && current.density > max.density)
    ) {
      return current; // Обновляем максимальное значение
    } else {
      return max; // Оставляем текущее максимальное значение
    }
  }, grids[0]); // Начинаем с первого элемента мас
  console.log(maxDensityElement.maxWords, maxDensityElement.density);
  console.log(maxDensityElement.words);
  console.log('====================');

  const unusedWords = [];

  // Проходим по каждому слову в workWords
  for (let i = 0; i < workWords.length; i++) {
    // Проверяем, входит ли текущее слово в maxDensityElement.words
    if (!maxDensityElement.words.includes(workWords[i])) {
      // Если текущее слово не входит в maxWordUsed, добавляем его в unusedWords
      unusedWords.push(workWords[i]);
    }
  }
  console.log(unusedWords);

  // SAVE ============================================================================

  storage.set('@wordUsed', JSON.stringify(maxDensityElement.words));
  storage.set('@wordUnused', JSON.stringify(unusedWords));
  storage.set('@wordBonus', JSON.stringify([]));
  storage.set('@currentWord', '');

  storage.set('@lineword', JSON.stringify(maxDensityElement.gridVariant));
  // storage.set('@lineword', JSON.stringify(bestGrid));

  // заменим буквы нулями, чтобы потом понимать, что разгадано. "1"-разгадано
  const solvedGrid: string[][] = maxDensityElement.gridVariant.map(row =>
    row.map(cell => (cell === EMPTYCELL ? EMPTYCELL : '0')),
  );

  storage.set('@solvedLineword', JSON.stringify(solvedGrid));

  storage.set('@lineButtonText', '');

  storage.set(
    '@circleButton',
    JSON.stringify(LinewordTools.shuffleArray(letterButtons)),
  );

  storage.set('@buttonsState', JSON.stringify([]));

  storage.set('@arrayLetter', JSON.stringify([]));
  storage.set('@arrayOrder', JSON.stringify([]));
  storage.set('@lastWordPos', JSON.stringify([]));
}
