import {LevelsType} from '../types/data.type';
import {storage} from './storage';

const minLevel = 1;

export namespace Level {
  export function clearLevel() {
    storage.set('@chapter', 0);
    storage.set('@level', 0);
    storage.set('@levelCount', 0);
  }

  export function getLevel(): LevelsType {
    storage.contains('@chapter') ? null : storage.set('@chapter', 0);
    storage.contains('@level') ? null : storage.set('@level', minLevel);
    storage.contains('@levelCount') ? null : storage.set('@levelCount', 0);

    let currentLevel = storage.getNumber('@level')!;
    let currentChapter = storage.getNumber('@chapter')!;
    let levelsСompleted = storage.getNumber('@levelCount')!;
    let maxLevels = 0;

    switch (currentChapter) {
      case 0:
        maxLevels = 2;
        break;
      case 1:
        maxLevels = 3;
        break;
      case 2:
        maxLevels = 4;
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
    console.log('@', levels);
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

    storage.set('@levelCount', levels.levelsСompleted + 1);
    if (levels.currentChapter > 2) {
      clearLevel();
    }
    const levels1: LevelsType = getLevel();
    console.log('@', levels1);
  }
}
