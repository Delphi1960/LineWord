export function getWordsForLetters(
  letters: string[],
  arrayWords: string[],
): string[] {
  const filteredWords = arrayWords.filter(word => {
    // Проверяем, все ли буквы в слове содержатся в массиве letters
    return [...word].every(letter => letters.includes(letter));
    // &&      word.length <= letters.length
    //   word.length <= NUMBER_BUTTON
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
