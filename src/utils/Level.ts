import {LevelsType} from '../types/data.type';
import {storage} from './storage';

const minChapter = 0;

export namespace Level {
  export function clearLevel() {
    storage.set('@chapter', 0);
    storage.set('@level', 0);
    storage.set('@levelCount', 0);
  }

  export function getLevel(): LevelsType {
    const minLevel = minChapter === 0 ? 0 : 1;
    storage.contains('@chapter') ? null : storage.set('@chapter', minChapter);
    storage.contains('@level') ? null : storage.set('@level', minLevel);
    storage.contains('@levelCount') ? null : storage.set('@levelCount', 0);

    let currentLevel = storage.getNumber('@level')!;
    let currentChapter = storage.getNumber('@chapter')!;
    let levelsСompleted = storage.getNumber('@levelCount')!;
    let maxLevels = 0;

    //Число уровней для количества букв
    switch (currentChapter) {
      // 3 буквы
      case 0:
        maxLevels = 3;
        break;
      // 4 буквы
      case 1:
        maxLevels = 50;
        break;
      // 5 букв
      case 2:
        maxLevels = 50;
        break;
      // 6 букв
      case 3:
        maxLevels = 50;
    }

    return {
      currentLevel: currentLevel,
      currentChapter: currentChapter,
      levelsСompleted: levelsСompleted,
      maxLevels: maxLevels,
    };
  }

  export function setLevel() {
    const levels: LevelsType = getLevel();
    const minLevel = minChapter === 0 ? 0 : 1;

    // три буквы
    if (levels.currentChapter === 0) {
      if (levels.currentLevel < levels.maxLevels - 1) {
        storage.set('@level', levels.currentLevel + 1);
      } else {
        storage.set('@level', minLevel);
        storage.set('@chapter', levels.currentChapter + 1);
        storage.set('@mainWords', JSON.stringify([]));
      }
    }

    //четыре буквы
    else if (levels.currentChapter === 1) {
      if (levels.currentLevel < levels.maxLevels) {
        storage.set('@level', levels.currentLevel + 1);
      } else {
        storage.set('@level', minLevel);
        storage.set('@chapter', levels.currentChapter + 1);
        storage.set('@mainWords', JSON.stringify([]));
      }
    }

    //пять букв
    else if (levels.currentChapter === 2) {
      if (levels.currentLevel < levels.maxLevels) {
        storage.set('@level', levels.currentLevel + 1);
      } else {
        storage.set('@level', minLevel);
        storage.set('@chapter', levels.currentChapter + 1);
        storage.set('@mainWords', JSON.stringify([]));
      }
    }

    //шесть букв
    else if (levels.currentChapter === 3) {
      if (levels.currentLevel < levels.maxLevels) {
        storage.set('@level', levels.currentLevel + 1);
      } else {
        storage.set('@level', minLevel);
        storage.set('@chapter', levels.currentChapter + 1);
        storage.set('@mainWords', JSON.stringify([]));
      }
    }

    storage.set('@levelCount', levels.levelsСompleted + 1);
    if (levels.currentChapter > 3) {
      clearLevel();
    }
  }
}
