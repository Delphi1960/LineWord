// import {storage} from './storage';
// import {WordsList} from '../assets/data/combinedArray';

// export default function prepareWords(): string[] {
//   // массив центральных слов
//   const mainWords: string[] = JSON.parse(storage.getString('@mainWords')!);
//   // отделяем слова от подсказок
//   const newWords: string[] = WordsList.map(item => item.word);
//   // Удаление повторов и перевод в верхний регистр
//   //   `const wordsSet = [...new Set(newWords.map(word => word.toUpperCase()))];
//   //уберем использованные центральные слова из обработки, чтобы не повторить кроссворд
//   // при переходе к новоку количеству букв список очищаем
//   //   return wordsSet.filter(word => !mainWords.includes(word));
//   return newWords.filter(word => !mainWords.includes(word));
// }
