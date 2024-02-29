import {GRIDSIZE} from '../types/constants';
import {CrosswordDensity, GridType} from '../types/data.type';
import {LinewordTools} from './LinewordTools';
import {attemptToPlaceWordOnGrid} from './generateGridTools';
import {getWordsForLetters} from './getWordsForLetters';

export namespace prepareTheGrid {
  //  ----------------------------------------------------------------------------------------------

  // Получить центральное слово длиной NUMBER_BUTTON и список слов для сетки из букв центрального слова
  export function getWordListForGrid(
    words: string[],
    NUMBER_BUTTON: number,
  ): [string, string[]] {
    let workWords: string[] = [];
    let randomWord: string = '';
    let letterButtons: string[] = [];

    // Фильтруем массив - длина слова = числу букв
    const filterByNumberOfLetters = words.filter(
      word => word.length === NUMBER_BUTTON,
    );

    while (workWords.length === 0) {
      // получим индекс случайного слова из отфильтрованного массива
      const randomIndex = Math.floor(
        Math.random() * filterByNumberOfLetters.length,
      );

      // случайное центральное слово
      randomWord = filterByNumberOfLetters[randomIndex];
      // randomWord = 'ПОСОХ';

      letterButtons = randomWord.split('');
      // уберем центральное слово из полного массива слов, чтобы не участвовало в выборе слов для кроссворда
      const filteredWords = words.filter(word => word !== randomWord);

      workWords = getWordsForLetters(letterButtons, filteredWords);
      // Сортируем слова по убыванию длины
      workWords = workWords.sort((a, b) => b.length - a.length);
    }
    return [randomWord, workWords];
  }
  //  ----------------------------------------------------------------------------------------------

  // ф-я размещает слово в середине сетки
  export function placeWordToGrid(grid: GridType, mainWord: string): GridType {
    // Размещаем слово посередине по горизонтали и вертикали
    let gridSize = Math.floor(GRIDSIZE / 2);
    let startIndex = gridSize - Math.floor(mainWord.length / 2);

    for (let i = 0; i < mainWord.length; i++) {
      grid[gridSize - 1][startIndex + i] = mainWord[i];
    }
    return grid;
  }
  //  ----------------------------------------------------------------------------------------------

  // Строим варианты сеток
  export function buildingGrids(
    grid: GridType,
    workWords: string[],
  ): CrosswordDensity[] {
    let placedWords: string[] = [];
    const grids: CrosswordDensity[] = [];

    for (let i = 0; i < 10; i++) {
      const newGrid = grid.map(innerArray => innerArray.slice());
      // Копируем и перемешиваем массив workWords
      placedWords = LinewordTools.shuffleArray(workWords.slice());

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
      let density = LinewordTools.calculateDensity(newGrid); // плотность сетки

      // Формируем массив сеток
      grids.push({
        maxWords: wordCount, //число слов в сетке
        words: wordUsed,
        density: density, // плотность сетки
        gridVariant: newGrid.map(innerArray => innerArray.slice()), // сама сетка
      });
    }

    return grids;
  }
  //  ----------------------------------------------------------------------------------------------

  // выбираем лучшую сетку
  export function takeTheBestGrid(grids: CrosswordDensity[]): CrosswordDensity {
    // Находим элемент массива с максимальными значениями maxWords и density
    return grids.reduce((max, current) => {
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
  }
}
