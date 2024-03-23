import {WordsList} from '../assets/data/combinedArray';

import {EMPTYCELL, GRIDSIZE} from '../types/constants';
import {CrosswordDensity} from '../types/data.type';
// import {Level} from './Level';
import {LinewordTools} from './LinewordTools';
import {prepareTheGrid} from './prepareTheGrid';
import {storage} from './storage';

export function generateGrid(letterCount: number) {
  // const chapter = Level.getLevel();
  // // число кнопок
  // const letterCount = chapter.currentChapter + 3;

  // =========================================================================================
  const grid = Array(GRIDSIZE)
    .fill(0)
    .map(() => Array(GRIDSIZE).fill('#'));

  // const gridTest = [
  //   ['#', '#', '#', '#', '#', '#', '#', '#'],
  //   ['#', '#', '#', '#', '#', '#', '#', '#'],
  //   ['#', '#', '#', '#', '#', '#', '#', '#'],
  //   ['Л', 'Е', 'С', '#', 'С', 'Т', 'О', 'Л'],
  //   ['#', '#', '#', '#', '#', '#', '#', '#'],
  //   ['#', '#', '#', '#', '#', '#', '#', '#'],
  //   ['#', '#', '#', '#', '#', '#', '#', '#'],
  //   ['#', '#', '#', '#', '#', '#', '#', '#'],
  // ];

  // const words = prepareWords();
  // массив центральных слов
  const mainWords: string[] = JSON.parse(storage.getString('@mainWords')!);

  // отделяем слова от подсказок
  const newWords: string[] = WordsList.map(item => item.word);

  // Удаление повторов и перевод в верхний регистр
  //   const wordsSet = [...new Set(newWords.map(word => word.toUpperCase()))];

  //уберем использованные центральные слова из обработки, чтобы не повторить кроссворд
  // при переходе к новоку количеству букв список очищаем
  //   return wordsSet.filter(word => !mainWords.includes(word));
  const words = newWords.filter(word => !mainWords.includes(word));

  // Получить центральное слово длиной letterCount и список слов для сетки из букв центрального слова
  const [randomWord, workWords] = prepareTheGrid.getWordListForGrid(
    words,
    letterCount,
  );

  let letterButtons: string[] = randomWord.split(''); //массив букв кнопок

  // ф-я размещает слово в середине сетки
  prepareTheGrid.placeWordToGrid(grid, randomWord);

  // Строим варианты сеток
  const grids: CrosswordDensity[] = prepareTheGrid.buildingGrids(
    grid,
    workWords,
  );

  // выбираем лучшую сетку
  const bestGrid = prepareTheGrid.takeTheBestGrid(grids);
  // console.log(bestGrid.words);
  // Выделим слова не вошедшие в сетку
  const unusedWords = [];
  // Проходим по каждому слову в workWords(слова выбранные для сетки)
  for (let i = 0; i < workWords.length; i++) {
    // Проверяем, входит ли текущее слово в bestGrid.words
    if (!bestGrid.words.includes(workWords[i])) {
      // Если текущее слово не входит в сетку, добавляем его в unusedWords
      unusedWords.push(workWords[i]);
    }
  }
  // console.log(unusedWords);

  // SAVE ============================================================================

  // Список центральных слов уже построенных кроссвордов. Нужен, чтобы кроссворды не повторялись
  if (!mainWords.includes(randomWord)) {
    mainWords.push(randomWord);
    storage.set('@mainWords', JSON.stringify(mainWords));
  }

  // storage.set('@wordUsed', JSON.stringify(bestGrid.words));
  storage.set('@wordUnused', JSON.stringify(unusedWords));
  storage.set('@wordBonus', JSON.stringify([]));

  storage.set('@currentWord', '');

  storage.set('@lineword', JSON.stringify(bestGrid.gridVariant));

  // заменим буквы нулями, чтобы потом понимать, что разгадано. "1"-разгадано
  const solvedGrid: string[][] = bestGrid.gridVariant.map(row =>
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
