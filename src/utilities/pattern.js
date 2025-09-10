// src/pattern.js

export function createEmptyGrid(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0)
  );
}

// fixed green X pattern
function drawFixedGreenX(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  for (let i = 0; i < Math.min(rows, cols); i++) {
    if (grid[i][i] === 0) grid[i][i] = 2; // ↘ diagonal
    if (grid[i][cols - 1 - i] === 0) grid[i][cols - 1 - i] = 2; // ↙ diagonal
  }
}

// "N" pattern draw
function drawNAt(grid, startRow) {
  const rows = grid.length;
  const cols = grid[0].length;

  // Ensure at least 3 cols for "N"
  if (cols < 3) return;

  for (let r = 0; r < rows; r++) {
    const row = startRow + r;
    if (row < 0 || row >= rows) continue;

    // Left vertical line
    grid[row][0] = 1;

    // Right vertical line
    grid[row][cols - 1] = 1;

    // Diagonal line
    const c = Math.floor((r * (cols - 1)) / (rows - 1));
    grid[row][c] = 1;
  }
}

// ✅ Infinite moving N's
function drawMovingInfiniteN(grid, step) {
  const rows = grid.length;
  const size = rows; // Full height "N"

  for (let offset = -size; offset < rows + size; offset += size) {
    drawNAt(grid, (offset + step) % rows);
  }
}

export function getNextPatternGrid(rows, cols, step) {
  const grid = createEmptyGrid(rows, cols);

  // Red moving N
  drawMovingInfiniteN(grid, step);

  // Green fixed X
  drawFixedGreenX(grid);

  return grid;
}
