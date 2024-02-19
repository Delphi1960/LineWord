// /* eslint-disable @typescript-eslint/no-unused-vars */
// // function Word(text, row, column, vertical) {
// //   return {text: text, row: row, column: column, vertical: vertical};
// // }

// function CrosswordPuzzle() {
//   const emptyCell = '_';
//   let grid = Array.from(Array(gridSize), () => new Array(gridSize));
//   for (let row = 0; row < gridSize; row++) {
//     for (let column = 0; column < gridSize; column++) {
//       grid[row][column] = emptyCell;
//     }
//   }

//   // добавить слово в сетку
//   let update = function (word) {
//     let updated = false;
//     if (canBePlaced(word)) {
//       addWord(word);
//       updated = true;
//     }

//     return updated;
//   };

//   // проверяет, можно ли добавить слово в сетку
//   let canBePlaced = function (word) {
//     let canBePlaced = true;
//     if (isValidPosition(word.row, word.column) && fitsOnGrid(word)) {
//       let index = 0;
//       while (index < word.text.length) {
//         let currentRow = word.vertical ? word.row + index : word.row;
//         let currentColumn = !word.vertical ? word.column + index : word.column;

//         if (
//           (word.text.charAt(index) === grid[currentRow][currentColumn] ||
//             emptyCell === grid[currentRow][currentColumn]) &&
//           placementLegal(word, currentRow, currentColumn)
//         ) {
//           //We can place a word!
//         } else {
//           canBePlaced = false;
//         }
//         index++;
//       }
//     } else {
//       canBePlaced = false;
//     }

//     return canBePlaced;
//   };

//   // Возвращает количество пересечений слов в сетке
//   let getIntersections = function () {
//     let intersections = 0;
//     for (let row = 0; row < gridSize; row++) {
//       for (let column = 0; column < gridSize; column++) {
//         if (isLetter(row, column)) {
//           if (
//             isValidPosition(row - 1, column) &&
//             isValidPosition(row + 1, column) &&
//             isValidPosition(row, column - 1) &&
//             isValidPosition(row, column + 1) &&
//             isLetter(row - 1, column) &&
//             isLetter(row + 1, column) &&
//             isLetter(row, column - 1) &&
//             isLetter(row, column + 1)
//           ) {
//             ++intersections;
//           }
//         }
//       }
//     }
//     return intersections;
//   };

//   //   определяет, можно ли з//   проверяет, помещается ли слово в пределах сетки
//   let fitsOnGrid = function (word) {
//     if (word.vertical) {
//       return word.row + word.text.length <= gridSize;
//     } else {
//       return word.column + word.text.length <= gridSize;
//     }
//   };

//   // Законно разместить слово в определенной позиции строки/столбца
//   let placementLegal = function (word, row, column) {
//     let illegal = false;
//     if (word.vertical) {
//       illegal =
//         isInterference(row, column + 1, row + 1, column) ||
//         isInterference(row, column - 1, row + 1, column) ||
//         overwritingVerticalWord(row, column) ||
//         invadingTerritory(word, row, column);
//     } else {
//       illegal =
//         isInterference(row + 1, column, row, column + 1) ||
//         isInterference(row - 1, column, row, column + 1) ||
//         overwritingHorizontalWord(row, column) ||
//         invadingTerritory(word, row, column);
//     }
//     return !illegal;
//   };

//   //   определяет, будет ли слово вторгаться на территорию другого слова в определенной позиции
//   let invadingTerritory = function (word, row, column) {
//     let invading = false;
//     let empty = isEmptyCell(row, column);
//     if (word.vertical) {
//       let weHaveNeighbors =
//         doesCharacterExist(row, column - 1) ||
//         doesCharacterExist(row, column + 1) ||
//         (endOfWord(word, row, column) && doesCharacterExist(row + 1, column));

//       invading = empty && weHaveNeighbors;
//     } else {
//       let weHaveNeighbors =
//         doesCharacterExist(row - 1, column) ||
//         doesCharacterExist(row + 1, column) ||
//         (endOfWord(word, row, column) && doesCharacterExist(row, column + 1));

//       invading = empty && weHaveNeighbors;
//     }
//     return invading;
//   };

//   //   определяет, соответствует ли определенная позиция строки/столбца концу слова
//   let endOfWord = function (word, row, column) {
//     if (word.vertical) {
//       return word.row + word.text.length - 1 === row;
//     } else {
//       return word.column + word.text.length - 1 === column;
//     }
//   };

//   //   определяет, существует ли символ в определенной позиции
//   let doesCharacterExist = function (row, column) {
//     return isValidPosition(row, column) && isLetter(row, column);
//   };

//   //   определяет, будет ли размещение символа в определенной строке/столбце перезаписывать горизонтальное слово
//   let overwritingHorizontalWord = function (row, column) {
//     let leftColumn = column - 1;
//     return (
//       isValidPosition(row, leftColumn) &&
//       isLetter(row, column) &&
//       isLetter(row, leftColumn)
//     );
//   };

//   //   определяет, будет ли размещение символа в определенной строке/столбце перезаписывать вертикальное слово
//   let overwritingVerticalWord = function (row, column) {
//     let rowAbove = row - 1;
//     return (
//       isValidPosition(rowAbove, column) &&
//       isLetter(row, column) &&
//       isLetter(rowAbove, column)
//     );
//   };

//   //    проверяет наличие пересечений в наборе позиций строки/столбца
//   let isInterference = function (row, column, nextRow, nextColumn) {
//     return (
//       isValidPosition(row, column) &&
//       isValidPosition(nextRow, nextColumn) &&
//       isLetter(row, column) &&
//       isLetter(nextRow, nextColumn)
//     );
//   };

//   //   проверяет, есть ли буква в позиции строки/столбца
//   let isLetter = function (row, column) {
//     return grid[row][column] !== emptyCell;
//   };

//   let isEmptyCell = function (row, column) {
//     return !isLetter(row, column);
//   };

//   //   добавляет слово в сетку
//   let addWord = function (word) {
//     for (let letterIndex = 0; letterIndex < word.text.length; ++letterIndex) {
//       let row = word.row;
//       let column = word.column;
//       if (word.vertical) {
//         row += letterIndex;
//       } else {
//         column += letterIndex;
//       }

//       grid[row][column] = word.text.substring(letterIndex, letterIndex + 1);
//     }
//   };

//   //   проверяет, помещается ли слово в пределах сетки
//   let fitsOnGrid = function (word) {
//     if (word.vertical) {
//       return word.row + word.text.length <= gridSize;
//     } else {
//       return word.column + word.text.length <= gridSize;
//     }
//   };

//   //   проверяет, является ли позиция строки/столбца допустимой для сетки
//   let isValidPosition = function (row, column) {
//     return row >= 0 && row < gridSize && column >= 0 && column < gridSize;
//   };

//   return {
//     grid: grid,
//     update: update,
//     isLetter: isLetter,
//     getIntersections: getIntersections,
//   };
// }
