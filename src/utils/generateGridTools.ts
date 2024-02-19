import {EMPTYCELL, GRIDSIZE} from '../types/constants';
import {GridType, WordStatus} from '../types/data.type';

// пытаемся разместить слово в сетке ===================
export function attemptToPlaceWordOnGrid(
  grid: GridType,
  wordForPlacement: string,
): boolean {
  // инициализируем placedWord
  let placedWord: WordStatus = {
    word: wordForPlacement,
    char: '',
    posChar: 0,
    posX: 0,
    posY: 0,
    direction: 'vertical',
  };
  // -----------------------------------

  function isEmptyCell(y: number, x: number) {
    return !isLetter(y, x);
  }

  //   определяет, соответствует ли определенная позиция строки/столбца концу слова
  function endOfWord(y: number, x: number) {
    if (placedWord.direction === 'vertical') {
      return placedWord.posY + placedWord.word.length - 1 === y;
    } else {
      return placedWord.posX + placedWord.word.length - 1 === x;
    }
  }

  //   определяет, существует ли символ в определенной позиции
  function doesCharacterExist(y: number, x: number) {
    return isValidPosition(y, x) && isLetter(y, x);
  }

  //   проверяет, является ли позиция строки/столбца допустимой для сетки
  function isValidPosition(y: number, x: number) {
    return y >= 0 && y < GRIDSIZE && x >= 0 && x < GRIDSIZE;
  }

  //проверяет, помещается ли слово в пределах сетки
  function fitsOnGrid() {
    if (placedWord.direction === 'vertical') {
      return (
        placedWord.posY + placedWord.word.length <= GRIDSIZE ||
        placedWord.posY - placedWord.word.length >= 0
      );
    } else {
      return (
        placedWord.posX + placedWord.word.length <= GRIDSIZE ||
        placedWord.posX - placedWord.word.length >= 0
      );
    }
  }

  //    проверяет наличие пересечений в наборе позиций строки/столбца
  function isInterference(Y: number, X: number, nextY: number, nextX: number) {
    return (
      isValidPosition(Y, X) &&
      isValidPosition(nextY, nextX) &&
      isLetter(Y, X) &&
      isLetter(nextY, nextX)
    );
  }

  //   определяет, будет ли размещение символа в определенной строке/столбце перезаписывать вертикальное слово
  function overwritingVerticalWord(y: number, x: number) {
    let yAbove = y - 1;
    return isValidPosition(yAbove, x) && isLetter(y, x) && isLetter(yAbove, x);
  }
  //   определяет, будет ли размещение символа в определенной строке/столбце перезаписывать горизонтальное слово
  function overwritingHorizontalWord(Y: number, X: number) {
    let leftX = X - 1;
    return isValidPosition(Y, leftX) && isLetter(Y, X) && isLetter(Y, leftX);
  }

  //   определяет, будет ли слово вторгаться на территорию другого слова в определенной позиции
  function invadingTerritory(y: number, x: number) {
    let invading = false;
    let empty = isEmptyCell(y, x);
    if (placedWord.direction === 'vertical') {
      let weHaveNeighbors =
        doesCharacterExist(y, x - 1) ||
        doesCharacterExist(y, x + 1) ||
        (endOfWord(y, x) && doesCharacterExist(y + 1, x));

      invading = empty && weHaveNeighbors;
    } else {
      let weHaveNeighbors =
        doesCharacterExist(y - 1, x) ||
        doesCharacterExist(y + 1, x) ||
        (endOfWord(y, x) && doesCharacterExist(y, x + 1));

      invading = empty && weHaveNeighbors;
    }
    return invading;
  }

  //   определяет, что перед и после слова пусто или нет
  // вернет true если перед и после слова EMPTYCELL - можно ставить слово
  function isThereSpaceBeforeAndAfterWord(y: number, x: number) {
    if (placedWord.direction === 'vertical') {
      let yEnd = y + placedWord.word.length;
      if (isValidPosition(yEnd, x) && isValidPosition(y - 1, x)) {
        return grid[yEnd][x] === EMPTYCELL && grid[y - 1][x] === EMPTYCELL;
      }
    } else {
      let xEnd = x + placedWord.word.length;
      if (isValidPosition(y, xEnd) && isValidPosition(y, x - 1)) {
        return grid[y][xEnd] === EMPTYCELL && grid[y][x - 1] === EMPTYCELL;
      }
    }
    return false;
  }

  // Законно разместить слово в определенной позиции строки/столбца
  function placementLegal(y: number, x: number) {
    let illegal = false;
    if (placedWord.direction === 'vertical') {
      illegal =
        isInterference(y, x + 1, y + 1, x) || //вправо и вниз
        isInterference(y, x - 1, y + 1, x) || //влево и вниз
        isInterference(y, x + 1, y - 1, x) || //вправо и вверх
        isInterference(y, x - 1, y - 1, x) || //влево и вверх
        overwritingVerticalWord(y, x) ||
        invadingTerritory(y, x);
    } else {
      illegal =
        isInterference(y + 1, x, y, x + 1) || //вниз и вправо
        isInterference(y - 1, x, y, x + 1) || //вверх и вправо
        isInterference(y + 1, x, y, x - 1) || //вниз и влево
        isInterference(y - 1, x, y, x - 1) || //вверх и влево
        overwritingHorizontalWord(y, x) ||
        invadingTerritory(y, x);
    }
    return !illegal;
  }

  // проверяет, можно ли добавить слово в сетку
  function canBePlaced() {
    let canBePlace = true;
    let posY =
      placedWord.direction === 'vertical' ? placedWord.posY : placedWord.posY;

    let posX =
      placedWord.direction === 'horizontal' ? placedWord.posX : placedWord.posX;

    if (isValidPosition(posY, posX) && fitsOnGrid()) {
      let index = 0;
      while (index < placedWord.word.length) {
        let currentY =
          placedWord.direction === 'vertical'
            ? placedWord.posY + index
            : placedWord.posY;

        let currentX =
          placedWord.direction === 'horizontal'
            ? placedWord.posX + index
            : placedWord.posX;

        if (
          currentY >= GRIDSIZE ||
          currentY < 0 ||
          currentY >= GRIDSIZE ||
          currentY < 0
        ) {
          return false;
        }
        if (
          (placedWord.word.charAt(index) === grid[currentY][currentX] ||
            EMPTYCELL === grid[currentY][currentX]) &&
          placementLegal(currentY, currentX) &&
          isThereSpaceBeforeAndAfterWord(posY, posX)
        ) {
          // console.log(placedWord);
          // можно добавлять слово
        } else {
          canBePlace = false;
        }
        index++;
      }
    } else {
      canBePlace = false;
    }

    return canBePlace;
  }

  //   добавляет слово в сетку
  function addWord() {
    for (let letterInd = 0; letterInd < placedWord.word.length; ++letterInd) {
      let y = placedWord.posY;
      let x = placedWord.posX;

      if (placedWord.direction === 'vertical') {
        y += letterInd;
      } else {
        x += letterInd;
      }

      grid[y][x] = placedWord.word.substring(letterInd, letterInd + 1);
    }
  }

  // добавить слово в сетку
  function updateGrid(): boolean {
    let updated = false;
    if (canBePlaced()) {
      addWord();
      updated = true;
    }

    return updated;
  }

  //   проверяет, есть ли буква в позиции строки/столбца
  function isLetter(y: number, x: number) {
    return grid[y][x] !== EMPTYCELL;
  }

  // пытаемся разместить слово в сетке ===================

  // проходим по каждой букве в слове
  let charPosition = 0;
  for (let letter of wordForPlacement) {
    // проходим по строкам кроссворда
    for (let y = 0; y < grid.length; y++) {
      // проходим по столбцам кроссворда
      for (let x = 0; x < grid[0].length; x++) {
        if (grid[y][x] === letter) {
          // если буква на текущей позиции в кроссворде совпадает с текущей буквой слова

          let dir: 'horizontal' | 'vertical' =
            Math.random() >= 0.5 ? 'vertical' : 'horizontal';

          placedWord = {
            word: wordForPlacement,
            char: letter,
            posChar: charPosition,
            posX: x,
            posY: y,
            direction: dir,
          };

          placedWord.posY =
            placedWord.direction === 'vertical'
              ? placedWord.posY - placedWord.posChar
              : placedWord.posY;
          placedWord.posX =
            placedWord.direction === 'horizontal'
              ? placedWord.posX - placedWord.posChar
              : placedWord.posX;

          if (isLetter(y, x)) {
            // if (isLetter(placedWord.posY, placedWord.posX)) {
            if (updateGrid()) {
              return true;
            }
          }
        }
      }
    }
    charPosition++;
  }

  return false;
}
