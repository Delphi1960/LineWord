export interface CrosswordData {
  answer: string;
  hint: string;
  startX: number;
  startY: number;
  orientation: string;
}

export interface CoordCell {
  x: number;
  y: number;
}

export interface CrosswordDimensions {
  horizontally: number;
  vertically: number;
}

export interface WordType {
  text: string;
  row: number;
  column: number;
  vertical: boolean;
}

export type GridType = string[][];

export interface CircleButtonType {
  button: string;
  position: {
    x: number;
    y: number;
  };
  index: number;
}

export interface Placement {
  x: number;
  y: number;
  direction: 'horizontal' | 'vertical';
  ok: boolean;
}

export interface WordStatus {
  word: string;
  char: string;
  posChar: number;
  posX: number;
  posY: number;
  direction: 'horizontal' | 'vertical';
}

export interface LetterPos {
  y: number;
  x: number;
}

export interface CrosswordDensity {
  maxWords: number;
  words: string[];
  density: number;
  gridVariant: GridType;
}

export interface LevelsType {
  currentLevel: number;
  currentChapter: number;
  levelsСompleted: number;
  maxLevels: number;
}
