import {GRIDSIZE} from '../types/constants';
import type {GridType, LetterPos} from '../types/data.type';
import {storage} from './storage';

type SolvedGridType = {
  solvedGrid: GridType;
  solved: boolean;
  wordCoord: LetterPos[];
};
export namespace LinewordTools {
  // Пометить слово, как разгаданное

  export function markSolvedWord(
    mainGrid: GridType,
    duplicatemainGrid: GridType,
    word: string,
  ): SolvedGridType {
    const numRows = mainGrid.length;
    const numCols = mainGrid[0].length;
    let wordFound = false;
    // координаты помечаемого слова. Нужны для анимации буквы
    let wordCoord: LetterPos[] = [];

    // Поиск слова по горизонтали
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col <= numCols - word.length; col++) {
        if (col === 0 || mainGrid[row][col - 1] === '#') {
          let found = true;
          for (let i = 0; i < word.length; i++) {
            if (
              mainGrid[row][col + i] !== word[i] ||
              mainGrid[row][col + i] === '#'
            ) {
              found = false;
              break;
            }
          }
          if (
            found &&
            (col + word.length === numCols ||
              mainGrid[row][col + word.length] === '#')
          ) {
            wordFound = true;
            for (let i = 0; i < word.length; i++) {
              duplicatemainGrid[row][col + i] = '1';
              wordCoord.push({y: row, x: col + i});
            }
          }
        }
      }
    }

    // Поиск слова по вертикали
    for (let col = 0; col < numCols; col++) {
      for (let row = 0; row <= numRows - word.length; row++) {
        if (row === 0 || mainGrid[row - 1][col] === '#') {
          let found = true;
          for (let i = 0; i < word.length; i++) {
            if (
              mainGrid[row + i][col] !== word[i] ||
              mainGrid[row + i][col] === '#'
            ) {
              found = false;
              break;
            }
          }
          if (
            found &&
            (row + word.length === numRows ||
              mainGrid[row + word.length][col] === '#')
          ) {
            wordFound = true;
            for (let i = 0; i < word.length; i++) {
              duplicatemainGrid[row + i][col] = '1';
              wordCoord.push({y: row + i, x: col});
            }
          }
        }
      }
    }
    // storage.set('@solvedLineword', JSON.stringify(duplicatemainGrid));
    // return duplicatemainGrid;
    // return wordFound ? duplicatemainGrid : null;
    // return wordFound ? true : false;
    return {solved: wordFound, solvedGrid: duplicatemainGrid, wordCoord};
  }

  // Открыть одну случайную букву
  export function markSolvedLetter(
    mainGrid: GridType,
    duplicatemainGrid: GridType,
  ): LetterPos[] | undefined {
    let result: LetterPos[] = [];
    // Функция для нахождения всех позиций букв в сетке, которые еще не открыты
    function findUnopenedLetterPositions(): [number, number][] {
      const positions: [number, number][] = [];
      mainGrid.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
          if (
            cell !== '#' &&
            duplicatemainGrid[rowIndex][columnIndex] !== '1'
          ) {
            positions.push([rowIndex, columnIndex]);
          }
        });
      });
      return positions;
    }

    // Найти все позиции букв в grid, которые еще не открыты
    const unopenedLetterPositions = findUnopenedLetterPositions();

    if (unopenedLetterPositions.length > 0) {
      // Выбрать случайную позицию из найденных
      const randomPosition =
        unopenedLetterPositions[
          Math.floor(Math.random() * unopenedLetterPositions.length)
        ];
      const [row, col] = randomPosition;

      // Установить значение "1" в solvedGrid на выбранной позиции
      duplicatemainGrid[row][col] = '1';
      result.push({y: row, x: col});
    }

    storage.set('@solvedLineword', JSON.stringify(duplicatemainGrid));
    return result;
  }

  export function openLetter(
    row: number,
    col: number,
    duplicatemainGrid: GridType,
  ) {
    // Установить значение "1" в solvedGrid на выбранной позиции
    duplicatemainGrid[row][col] = '1';

    storage.set('@solvedLineword', JSON.stringify(duplicatemainGrid));
  }

  // максимальная длина слова в массиве слов
  export function findMaxWord(wordList: string[]): string {
    let maxWord: string = '';
    wordList.forEach(word => {
      if (word.length > maxWord.length) {
        maxWord = word;
      }
    });
    return maxWord;
  }

  export function calculateDensity(grid: GridType): number {
    let filled = 0;

    // Проходимся по каждой ячейке в сетке
    for (let i = 0; i < GRIDSIZE; i++) {
      for (let j = 0; j < GRIDSIZE; j++) {
        // Если ячейка не равна '#', считаем ее заполненной
        if (grid[i][j] !== '#') {
          filled++;
        }
      }
    }

    // Общее количество ячеек в сетке
    const totalCells = GRIDSIZE * GRIDSIZE;

    // Подсчет плотности
    const filledRatio = filled / totalCells;
    return filledRatio;
  }

  // Функция сравнения для перемешивания массива
  export function shuffleArray(array: string[]): string[] {
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

  // export function findWordCoordinates(
  //   grid: GridType,
  //   word: string,
  // ): LetterPos[] | null {
  //   const wordLength: number = word.length;
  //   const numRows: number = grid.length;
  //   const numCols: number = grid[0].length;
  //   let coordinates: LetterPos[] = [];

  //   // Проходим по всем элементам массива
  //   for (let row: number = 0; row < numRows; row++) {
  //     for (let col: number = 0; col < numCols; col++) {
  //       // Если текущий элемент соответствует первой букве искомого слова
  //       if (grid[row][col] === word[0]) {
  //         // Проверяем, есть ли слово вправо
  //         if (col + wordLength <= numCols) {
  //           let found: boolean = true;
  //           // Проверяем, совпадает ли каждая буква слова с элементами массива вправо
  //           coordinates = [{y: row, x: col}];
  //           for (let i: number = 1; i < wordLength; i++) {
  //             if (grid[row][col + i] !== word[i]) {
  //               found = false;
  //               break;
  //             }
  //             coordinates.push({y: row, x: col + i});
  //           }
  //           if (found) {
  //             return coordinates;
  //           }
  //         }

  //         // Проверяем, есть ли слово вниз
  //         if (row + wordLength <= numRows) {
  //           let found: boolean = true;
  //           // Проверяем, совпадает ли каждая буква слова с элементами массива вниз
  //           coordinates = [{y: row, x: col}];
  //           for (let i: number = 1; i < wordLength; i++) {
  //             if (grid[row + i][col] !== word[i]) {
  //               found = false;
  //               break;
  //             }
  //             coordinates.push({y: row + i, x: col});
  //           }
  //           if (found) {
  //             return coordinates;
  //           }
  //         }

  //         // Проверяем, есть ли слово по диагонали вниз и вправо
  //         if (col + wordLength <= numCols && row + wordLength <= numRows) {
  //           let found: boolean = true;
  //           // Проверяем, совпадает ли каждая буква слова с элементами массива по диагонали вниз и вправо
  //           coordinates = [{y: row, x: col}];
  //           for (let i: number = 1; i < wordLength; i++) {
  //             if (grid[row + i][col + i] !== word[i]) {
  //               found = false;
  //               break;
  //             }
  //             coordinates.push({y: row + i, x: col + i});
  //           }
  //           if (found) {
  //             return coordinates;
  //           }
  //         }
  //       }
  //     }
  //   }

  //   // Если слово не найдено
  //   return null;
  // }
}
