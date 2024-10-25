const BASE_DIMENSION = 320;
const HORIZONTAL_MARGIN = 26;
const VERTICAL_MARGIN = 30;

export const SVG_TEXT_BOX = {
  height: BASE_DIMENSION / 2,
  width: BASE_DIMENSION,
  margin: {
    top: VERTICAL_MARGIN,
    bottom: VERTICAL_MARGIN,
    left: HORIZONTAL_MARGIN,
    right: HORIZONTAL_MARGIN,
  },
};

export const SVG_CHART = {
  height: BASE_DIMENSION,
  width: BASE_DIMENSION,
  margin: {
    top: VERTICAL_MARGIN,
    bottom: VERTICAL_MARGIN,
    left: HORIZONTAL_MARGIN,
    right: HORIZONTAL_MARGIN,
  },
};

export const VIEWBOX = {
  minX: 0,
  minY: 0,
  height: SVG_TEXT_BOX.height + SVG_CHART.height,
  width: BASE_DIMENSION,
};

const SQUARE_DIMENSIONS = 259;
const VIEWBOX_SQUARE = 259;

export const SVG_WIDTH = SQUARE_DIMENSIONS;
export const SVG_HEIGHT = SQUARE_DIMENSIONS;
export const SVG_MARGIN_TOP = VERTICAL_MARGIN;
export const SVG_MARGIN_RIGHT = HORIZONTAL_MARGIN;
export const SVG_MARGIN_BOTTOM = VERTICAL_MARGIN;
export const SVG_MARGIN_LEFT = HORIZONTAL_MARGIN;
export const VIEWBOX_WIDTH = VIEWBOX_SQUARE;
export const VIEWBOX_HEIGHT = VIEWBOX_SQUARE * 1.618;

/**
 * takes a number[] and returns [0, max]
 */
export function createDomain(sets: number[]): [number, number] {
  const min: number = 0;
  let max: number = 0;
  if (sets.length > 0) {
    max = Math.max(...sets);
  }
  return [min, max];
}

export function setTotalRepsMinMax(sets: number[]): [number, number] {
  const min = 0;
  let max = 0;
  if (sets.length > 0) {
    max = sets.reduce((a, b) => a + b);
  }
  return [min, max];
}

export function createCumulativeTotals(sets: number[]): number[] {
  const result: number[] = [];
  for (let i = 0; i < sets.length; i++) {
    if (i === 0) {
      result.push(sets[i]);
    } else {
      result.push(result[i - 1] + sets[i]);
    }
  }
  return result;
}

export const RADIUS = Math.min(VIEWBOX_HEIGHT, VIEWBOX_WIDTH) / 2;

export const totalRepsXValueOffset = (reps: number): number => {
  if (reps === 0) return 0;
  if (reps < 100) return 8;
  return 16;
};
