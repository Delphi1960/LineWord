// import {WordsList} from '../assets/data/words';
import {WordsList} from '../assets/data/russian_nouns';
// import {WordsList} from '../assets/data/refined_crossword_words';

import {EMPTYCELL, GRIDSIZE} from '../types/constants';
import {GridType} from '../types/data.type';
import {attemptToPlaceWordOnGrid} from './generateGridTools';
import {storage} from './storage';

export function generateGrid() {
  const chapter = storage.getString('@chapter');
  console.log({chapter});
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

  // Функция сравнения для перемешивания массива
  function shuffleArray(array: string[]): string[] {
    // Копируем массив, чтобы не изменять исходный
    let shuffledArray = array.slice();

    // Функция для генерации случайного числа от 0 до 1
    function getRandomNumber() {
      return Math.random() - 0.5;
    }

    // Перемешиваем массив
    shuffledArray.sort(getRandomNumber);

    return shuffledArray;
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
  const words = [...new Set(WordsList.map(word => word.toUpperCase()))];

  let randomWord: string = '';
  let workWords: string[] = [];
  let letterButtons: string[] = [];

  // randomWord = 'ГРОЗА';
  // randomWord = 'ЗВЕЗДА';
  while (workWords.length === 0) {
    randomWord = getRandomWordWithUniqueLetters(words);
    letterButtons = randomWord.split('');
    // удалим центральное слово, чтобы не повторялось
    const filteredWords = words.filter(word => word !== randomWord);
    workWords = getWordsForLetters(letterButtons, filteredWords);
    console.log(workWords);
  }

  // Размещаем слово посередине по горизонтали и вертикали
  let startIndex = GRIDSIZE / 2 - Math.floor(randomWord.length / 2);

  for (let i = 0; i < randomWord.length; i++) {
    grid[GRIDSIZE / 2 - 1][startIndex + i] = randomWord[i];
  }

  let bestGrid: GridType = [];
  let maxCount = 0;
  let wordUsed: string[] = [];
  let maxWordUsed: string[] = []; //слова использованные в кроссворде
  let shuffledWords: string[] = [];

  for (let i = 0; i < 20; i++) {
    const newGrid = grid.map(innerArray => innerArray.slice());
    shuffledWords = shuffleArray(workWords);
    wordUsed = [];
    let count: number = 0;
    while (shuffledWords.length > 0) {
      let word: string | undefined = shuffledWords.pop(); // извлекаем и удаляем последнее слово из списка
      if (word) {
        if (attemptToPlaceWordOnGrid(newGrid, word)) {
          count++;
          wordUsed.push(word);
          continue;
        }
      }
    }
    // console.log(`${wordUsed.length}слов из ${workWords.length}`);
    if (count > maxCount) {
      maxCount = count;
      bestGrid = newGrid.map(innerArray => innerArray.slice());
      maxWordUsed = wordUsed.map(innerArray => innerArray.slice());
      maxWordUsed.push(randomWord); //первое слово кроссворда
    }
  }
  // console.log(workWords);

  const unusedWords = [];

  // Проходим по каждому слову в workWords
  for (let i = 0; i < workWords.length; i++) {
    // Проверяем, входит ли текущее слово в maxWordUsed
    if (!maxWordUsed.includes(workWords[i])) {
      // Если текущее слово не входит в maxWordUsed, добавляем его в unusedWords
      unusedWords.push(workWords[i]);
    }
  }
  console.log(randomWord, workWords);
  console.log(
    `${maxWordUsed.length - 1} из ${
      workWords.length
    } Не вошли ${unusedWords} из ${workWords}`,
  );

  // SAVE ============================================================================

  storage.set('@wordUsed', JSON.stringify(maxWordUsed));

  storage.set('@lineword', JSON.stringify(bestGrid));

  const solvedGrid = Array.from({length: GRIDSIZE}, () =>
    Array(GRIDSIZE).fill(EMPTYCELL),
  );

  storage.set('@solvedLineword', JSON.stringify(solvedGrid));

  storage.set('@lineButtonText', '');
  storage.set('@circleButton', JSON.stringify(letterButtons));

  storage.set('@buttonsState', JSON.stringify([]));

  storage.set('@arrayLetter', JSON.stringify([]));
  storage.set('@arrayOrder', JSON.stringify([]));
}
