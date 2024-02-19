import type {GridType} from '../types/data.type';
import {storage} from './storage';

type SolvedGridType = {
  solvedGrid: GridType;
  solved: boolean;
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
            }
          }
        }
      }
    }
    // storage.set('@solvedLineword', JSON.stringify(duplicatemainGrid));
    // return duplicatemainGrid;
    // return wordFound ? duplicatemainGrid : null;
    // return wordFound ? true : false;
    return {solved: wordFound, solvedGrid: duplicatemainGrid};
  }

  // Открыть одну случайную букву
  export function markSolvedLetter(
    mainGrid: GridType,
    duplicatemainGrid: GridType,
  ) {
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
    }

    storage.set('@solvedLineword', JSON.stringify(duplicatemainGrid));
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
}
